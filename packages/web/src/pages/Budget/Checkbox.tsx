import { Checkbox as MuiCheckbox } from "@mui/material";
import { CheckboxCheckedIcon } from "../../icons/CheckboxCheckedIcon";
import { CheckboxUncheckedIcon } from "../../icons/CheckboxUncheckedIcon";

export const Checkbox = () => {
  return (
    <MuiCheckbox
      icon={<CheckboxUncheckedIcon />}
      checkedIcon={<CheckboxCheckedIcon />}
      size="small"
    />
  );
};
