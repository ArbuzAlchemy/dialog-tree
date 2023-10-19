import React from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { Box, DeleteButton } from "@arbuzalchemy/common-ui";

import { dialogStore } from "./state";

export const DialogEditLinks = observer(() => {
  const dialog = dialogStore.editingNode;

  if (dialog === null) {
    return null;
  }

  return (
    <>
      <Box>
        <Typography variant="h6">Links</Typography>
      </Box>

      {dialog.next.map(({ to, value }, index) => (
        <div key={index} style={{ position: "relative" }}>
          <Box>
            <FormControl fullWidth>
              <InputLabel id={`label-to-${index}`}>To</InputLabel>
              <Select
                labelId={`label-to-${index}`}
                id={`select-to-${index}`}
                value={to}
                label="To"
                onChange={(evt) => {
                  dialogStore.patchNodeNext(dialog.id, index, {
                    to: +evt.target.value,
                  });
                }}
              >
                {dialogStore.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box>
            <TextField
              id={`input-value-${index}`}
              label="Text"
              variant="outlined"
              value={value}
              onChange={(evt) => {
                dialogStore.patchNodeNext(dialog.id, index, {
                  value: evt.target.value,
                });
              }}
            />
          </Box>
          <DeleteButton
            onClick={() => {
              dialogStore.deleteNodeNext(dialog.id, index);
            }}
          >
            <DeleteIcon />
          </DeleteButton>
        </div>
      ))}
      <Box>
        <Button
          variant="contained"
          onClick={() => dialogStore.addNodeNext(dialog.id)}
        >
          Add Link
        </Button>
      </Box>
    </>
  );
});
