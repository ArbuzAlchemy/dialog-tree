import React from "react";
import styled from "@emotion/styled";
import { dialogStore } from "./state";

type DialogOptionProps = {
  from: DialogNode;
  to: DialogNode;
  text: string;
};

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
  margin: 10px;
  font-size: 25;
  font-weight: bold;
  cursor: move;
  width: auto;
  display: inline-block;
  z-index: 1;
  background-color: pink;
`;

export const DialogOption = (props: DialogOptionProps) => {
  const { from, to, text } = props;

  const fromMiddle = dialogStore.calculateNodeMiddle(from.id)!;
  const toMiddle = dialogStore.calculateNodeMiddle(to.id)!;

  const middle = {
    left: (fromMiddle.left + toMiddle.left) / 2,
    top: (fromMiddle.top + toMiddle.top) / 2,
  };

  return (
    <Box top={middle.top} left={middle.left}>
      {text}
    </Box>
  );
};
