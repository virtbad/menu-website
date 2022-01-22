import { TextFieldProps as MuiInputProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import style from "../../styles/modules/system/Select.module.scss";
import Input from "./Input";
import { MenuItem } from "./Menu";

interface SelectProps extends Omit<MuiInputProps, "variant" | "value" | "onSelect"> {
  multiple?: boolean;
  values: Array<{ value: string; label: string; disabled?: boolean }>;
  value?: string | Array<string>;
  readonly?: boolean;
  onSelect?: (result: { value: string; label: string; disabled: boolean }, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onMultipleSelect?: (result: Array<{ value: string; label: string; disabled: boolean }>, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

/**
 * Select component
 */

const Select: React.FC<SelectProps> = ({ multiple = false, SelectProps = {}, onSelect, onMultipleSelect, values = [], value, ...props }): JSX.Element => {
  const [selected, setSelected] = useState<string | number | Array<string | number>>(multiple && Array.isArray(value) ? value : multiple ? [] : "");

  useEffect(() => {
    setSelected(multiple && Array.isArray(value) ? value : multiple ? [] : "");
  }, [value]);

  return (
    <Input
      select={true}
      SelectProps={{
        classes: {
          select: style["select-root"],
          icon: props.disabled || props.readonly ? style["select-icon-disabled"] : style["select-icon"],
        },
        MenuProps: {
          classes: {
            list: style["menu-list"],
            paper: style["menu-paper"],
            root: style["menu-root"],
          },
        },
        multiple: multiple,
        ...SelectProps,
      }}
      onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!multiple) {
          const { value = "", label = "", disabled = false } = values.find(({ value }) => value === event.target.value) || {};
          const result = { value: value, label: label, disabled: disabled };
          if (onSelect) onSelect(result, event);
          setSelected(value);
        } else {
          const result: any = event.target.value;
          if (onMultipleSelect) onMultipleSelect(result, event);
          setSelected(result);
        }
      }}
      value={multiple ? (Array.isArray(selected) ? selected : []) : selected}
      {...props}
    >
      {values.map(({ label, value, disabled = false }) => (
        <MenuItem key={value} disabled={disabled} value={value} children={label} />
      ))}
    </Input>
  );
};

export default Select;
