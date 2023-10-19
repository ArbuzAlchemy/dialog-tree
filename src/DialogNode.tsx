import React from "react";
import { useDrag } from "react-dnd";
import styled from "@emotion/styled";
import EditIcon from "@mui/icons-material/Edit";

type BoxProps = {
  top: number;
  left: number;
};

const Box = styled.div`
  position: absolute;
  top: ${(props: BoxProps) => props.top}px;
  left: ${(props: BoxProps) => props.left}px;
  border: 1px solid black;
  padding: 10px;
  padding-right: 30px;
  margin: 10px;
  font-size: 25;
  font-weight: bold;
  cursor: move;
  width: auto;
  display: inline-block;
  z-index: 1;
  background-color: white;
`;

const $EditIcon = styled(EditIcon)`
  position: absolute;
  top: 5px;
  right: 0;
  cursor: pointer;
`;

export type DialogNodeProps = {
  top: number;
  left: number;
  id: number;
  text: string;
  editNode: () => void;
};

export const DialogNode = (props: DialogNodeProps) => {
  const { top, left, text, editNode } = props;
  const [, drag] = useDrag(() => ({
    type: "dialog-node",
    item: props,
  }));

  return (
    <Box ref={drag} top={top} left={left}>
      {text}
      <$EditIcon onClick={editNode} />
    </Box>
  );
};
