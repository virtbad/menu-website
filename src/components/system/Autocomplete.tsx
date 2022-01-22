import { Autocomplete as MuiAutocomplete, TextFieldProps as MuiInputProps } from "@mui/material";
import React, { forwardRef } from "react";
import style from "../../styles/modules/system/Autocomplete.module.scss";
import Input from "./Input";

interface AutocompleteProps extends Omit<MuiInputProps, "variant"> {
  options: Array<string>;
  onAutocomplete?: () => void;
  noOptionsText?: string;
}

/**
 * Autocomplete component based of @mui/material autocomplete
 */

const Autocomplete: React.FC<AutocompleteProps> = forwardRef(({ label = "Suche", noOptionsText = "Keine Ergebnisse", onAutocomplete, options, ...props }, ref): JSX.Element => {
  return (
    <MuiAutocomplete
      ref={ref}
      clearOnBlur={false}
      onInputChange={onAutocomplete}
      size={"small"}
      noOptionsText={noOptionsText}
      renderInput={(params) => {
        // could add filter functionality
        return <Input label={label} {...props} {...params} />;
      }}
      options={[...new Set(options)]}
      disableCloseOnSelect
      ListboxProps={{ className: style["list-root"] }}
      classes={{
        option: style["option-root"],
        noOptions: style["list-root"],
        clearIndicator: style["autocomplete-icon"],
        popupIndicator: style["autocomplete-icon"],
        popper: style["popper-root"],
        paper: style["paper-root"],
      }}
    />
  );
});

export default Autocomplete;
