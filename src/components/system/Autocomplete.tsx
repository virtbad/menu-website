import { Autocomplete as MuiAutocomplete, AutocompleteInputChangeReason, TextFieldProps as MuiInputProps } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import style from "../../styles/modules/system/Autocomplete.module.scss";
import Input from "./Input";

interface AutocompleteProps extends Omit<MuiInputProps, "variant"> {
  options: Array<string>;
  onAutocomplete?: (event: React.SyntheticEvent<Element, Event>, value: string, reason: AutocompleteInputChangeReason) => void;
  noOptionsText?: string;
  themedBackground?: boolean;
  disablePopper?: boolean;
  onTextChange?: (text: string) => void;
}

/**
 * Autocomplete component based of @mui/material autocomplete
 */

const Autocomplete: React.FC<AutocompleteProps> = forwardRef(({ label = "Suche", onTextChange, disablePopper = false, themedBackground = false, noOptionsText, onAutocomplete, options, onChange, value, ...props }, ref): JSX.Element => {
  const [text, setText] = useState<string>((value as any) || "");

  useEffect(() => {
    if (value) setText(value as any);
  }, [value]);

  console.log(text);
  console.log(options);

  return (
    <MuiAutocomplete
      clearOnBlur={false}
      PopperComponent={disablePopper ? () => <span /> : undefined}
      onInputChange={(...args) => {
        onAutocomplete && onAutocomplete(...args);
      }}
      size={"small"}
      noOptionsText={noOptionsText || "Keine Ergebnisse"}
      renderInput={(params) => {
        // could add filter functionality
        return (
          <Input
            ref={ref}
            label={label}
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              onChange && onChange(event);
              onTextChange && onTextChange(event.target.value);
            }}
            {...props}
            {...params}
          />
        );
      }}
      options={[...new Set(options)]}
      popupIcon={disablePopper ? <span /> : undefined}
      ListboxProps={{ className: style["list-root"] }}
      classes={{
        root: style["autocomplete-root"],
        option: style["option-root"],
        noOptions: style["list-root"],
        clearIndicator: style["autocomplete-icon"],
        popupIndicator: style["autocomplete-icon"],
        popper: style["popper-root"],
        paper: style["paper-root"],
      }}
      componentsProps={{ clearIndicator: { disableRipple: true } }}
      data-background={themedBackground}
    />
  );
});

export default Autocomplete;
