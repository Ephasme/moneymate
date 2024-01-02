import { CheckboxProps, Checkbox as MuiCheckbox } from "@mui/material";
import { CheckboxCheckedIcon } from "../../icons/CheckboxCheckedIcon";
import { CheckboxUncheckedIcon } from "../../icons/CheckboxUncheckedIcon";

export const Checkbox = (props: CheckboxProps) => {
  return (
    <MuiCheckbox
      icon={<CheckboxUncheckedIcon />}
      checkedIcon={<CheckboxCheckedIcon />}
      size="small"
      {...props}
    />
  );
};
