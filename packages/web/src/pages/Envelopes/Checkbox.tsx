import { CheckboxProps, Checkbox as JoyCheckbox } from "@mui/joy";
import { CheckboxCheckedIcon } from "../../icons/CheckboxCheckedIcon";
import { CheckboxUncheckedIcon } from "../../icons/CheckboxUncheckedIcon";

export const Checkbox = (props: CheckboxProps) => {
  return (
    <JoyCheckbox
      uncheckedIcon={<CheckboxUncheckedIcon />}
      checkedIcon={<CheckboxCheckedIcon />}
      size="sm"
      {...props}
    />
  );
};
