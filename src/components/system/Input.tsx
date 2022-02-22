import { TextField, TextFieldProps as MuiInputProps } from "@mui/material";
import React, { forwardRef } from "react";
import style from "../../styles/modules/system/Input.module.scss";

interface InputProps extends Omit<MuiInputProps, "variant"> {
  readonly?: boolean;
}

/**
 * Base input component based of @mui/material textfield
 */

const Input: React.FC<InputProps> = forwardRef(({ onInvalid, inputProps = {}, InputProps = {}, InputLabelProps = {}, readonly = false, classes, value, ...props }, ref): JSX.Element => {
  const { endAdornment, ...InputPropsRest } = InputProps;

  return (
    <TextField
      ref={ref}
      spellCheck={false}
      variant={"outlined"}
      size={"small"}
      classes={{ root: style["input-label"], ...classes }}
      onInvalid={(event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (onInvalid) onInvalid(event);
      }}
      InputProps={{
        classes: {
          root: style["input-root"],
          input: style["input-root"],
          notchedOutline: style["input-outline"],
          error: style["input-error"],
        },
        readOnly: readonly,
        endAdornment: endAdornment && <span data-endadornment children={endAdornment} />,
        ...InputPropsRest,
        value: value,
      }}
      InputLabelProps={{
        classes: {
          root: style["input-label"],
          disabled: style["input-disabled"],
          focused: style["input-focused"],
          error: style["input-error"],
        },
        ...InputLabelProps,
      }}
      value={value}
      inputProps={
        {
          ...inputProps,
          value: value,
        } as any
      }
      {...props}
    />
  );
});

export default Input;
