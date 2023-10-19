import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@mui/material";
import { Box, FormInputText } from "@arbuzalchemy/common-ui";

import { dialogStore } from "./state";

export const DialogForm = () => {
  const { handleSubmit, control } = useForm<DialogNode>({
    defaultValues: {
      text: "New Dialog",
    },
  });

  const onSubmit: SubmitHandler<DialogNode> = (data) =>
    dialogStore.addNode(data.text);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <FormInputText label="Text" name="text" control={control} multiline />
      </Box>

      <Box>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </Box>
    </form>
  );
};
