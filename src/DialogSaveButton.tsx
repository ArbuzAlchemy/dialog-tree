import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { dialogStore } from "./state";

const Wrapper = styled.div`
  position: fixed;
  right: 10px;
  bottom: 10px;
`;

const downloadFile = (content: string, fileName: string) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const DialogSaveButton = ({ className }: { className?: string; }) => {
  const save = useCallback(() => {
    const lexicon = JSON.stringify(dialogStore.lexicon, null, 2);
    downloadFile(lexicon, "dialog.json");
    const json = JSON.stringify(dialogStore.json, null, 2);
    downloadFile(json, "data.json");
  }, []);
  return (
    <Wrapper className={className}>
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </Wrapper>
  );
};
