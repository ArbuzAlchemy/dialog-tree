import React from "react";
import { Button } from "@mui/material";
import { useCallback } from "react";
import { dialogStore } from "./state";

const downloadFile = (content: string, fileName: string) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const DialogSaveButton = () => {
  const save = useCallback(() => {
    const lexicon = JSON.stringify(dialogStore.lexicon, null, 2);
    downloadFile(lexicon, "dialog.json");
    const json = JSON.stringify(dialogStore.json, null, 2);
    downloadFile(json, "data.json");
  }, []);
  return (
    <div style={{ position: "fixed", right: 10, bottom: 10 }}>
      <Button variant="contained" onClick={save}>
        Save
      </Button>
    </div>
  );
};
