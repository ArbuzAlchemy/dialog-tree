import React from "react";
import { dialogStore } from "./state";

export const DialogLine = ({
  from,
  to,
}: {
  from: DialogNode;
  to: DialogNode;
}) => {
  // draw a line between the two nodes
  // use the from and to props to get the coordinates of the nodes
  // use svg path syntax to draw a line between the two nodes

  const fromMiddle = dialogStore.calculateNodeMiddle(from.id)!;
  const toMiddle = dialogStore.calculateNodeMiddle(to.id)!;

  // calculate middle of the future line
  const middle = {
    left: (fromMiddle.left + toMiddle.left) / 2,
    top: (fromMiddle.top + toMiddle.top) / 2,
  };

  const points = `${fromMiddle.left},${fromMiddle.top} ${middle.left},${middle.top} ${toMiddle.left},${toMiddle.top}`;

  return <polyline points={points} stroke="black" markerMid="url(#triangle)" />;
};
