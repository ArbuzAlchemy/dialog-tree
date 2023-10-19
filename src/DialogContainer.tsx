import React from "react";
import { XYCoord, useDrop } from "react-dnd";
import { observer } from "mobx-react-lite";
import { Scrollbars } from "rc-scrollbars";

import { dialogStore } from "./state";
import { DialogNode, DialogNodeProps } from "./DialogNode";
import { DialogLine } from "./DialogLine";
import { DialogOption } from "./DialogOption";
import { DialogEditForm } from "./DialogEditForm";

export const DialogContainer = observer(() => {
  const [, drop] = useDrop(() => ({
    accept: "dialog-node",
    drop(item: DialogNodeProps, monitor) {
      const coords = monitor.getSourceClientOffset() as XYCoord;
      dialogStore.updateNodeCoords(item.id, { left: coords.x, top: coords.y });
      return undefined;
    },
  }));
  const nodes = dialogStore.nodes;

  return (
    <>
      <Scrollbars style={{ width: "100vw", height: "100vh" }}>
        <div
          ref={drop}
          style={{
            width: dialogStore.canvasWidth,
            height: dialogStore.canvasHeight,
          }}
        >
          <svg
            style={{
              width: dialogStore.canvasWidth,
              height: dialogStore.canvasHeight,
              zIndex: -1,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="triangle"
                viewBox="0 0 10 10"
                refX="1"
                refY="5"
                markerUnits="strokeWidth"
                markerWidth="10"
                markerHeight="10"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f00" />
              </marker>
            </defs>
            {nodes.map((node) => {
              const res: React.ReactNode[] = [];
              const from = node;
              const { next } = node;
              for (let i = 0, l = next.length; i < l; i++) {
                const to = dialogStore.getNode(next[i].to);
                if (!to) {
                  continue;
                }
                res.push(
                  <DialogLine
                    key={`${from.id}-${to.id}`}
                    from={from}
                    to={to}
                  />,
                );
              }

              return res;
            })}
          </svg>
          {nodes.map((node) => (
            <DialogNode
              key={node.id}
              top={node.top}
              left={node.left}
              id={node.id}
              text={node.text}
              editNode={() => dialogStore.setEditingNode(node)}
            />
          ))}
          {nodes.map((node) => {
            const { next } = node;
            const res: React.ReactNode[] = [];

            for (let i = 0, l = next.length; i < l; i++) {
              const to = dialogStore.getNode(next[i].to);
              if (!to) {
                continue;
              }
              res.push(
                <DialogOption
                  key={`${node.id}-${to.id}`}
                  from={node}
                  to={to}
                  text={next[i].value}
                />,
              );
            }

            return res;
          })}
        </div>
      </Scrollbars>
      {dialogStore.editingNode && <DialogEditForm />}
    </>
  );
});
