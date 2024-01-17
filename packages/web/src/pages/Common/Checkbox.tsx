import { CheckboxProps, Checkbox as MuiCheckbox } from "@mui/material";

const CheckboxUncheckedIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="0.75"
        width="14.5"
        height="14.5"
        rx="2.25"
        stroke="#CDD0E1"
        strokeWidth="1.5"
      />
    </svg>
  );
};

const CheckboxCheckedIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="16" height="16" rx="3" fill="black" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6957 4.70495C12.8269 4.83622 12.9006 5.01424 12.9006 5.19985C12.9006 5.38547 12.8269 5.56348 12.6957 5.69475L7.09567 11.2948C6.9644 11.426 6.78639 11.4997 6.60077 11.4997C6.41516 11.4997 6.23714 11.426 6.10587 11.2948L3.30587 8.49475C3.17836 8.36273 3.10781 8.18591 3.1094 8.00237C3.111 7.81883 3.18461 7.64326 3.3144 7.51348C3.44419 7.38369 3.61975 7.31007 3.80329 7.30848C3.98683 7.30688 4.16365 7.37744 4.29567 7.50495L6.60077 9.81005L11.7059 4.70495C11.8371 4.57372 12.0152 4.5 12.2008 4.5C12.3864 4.5 12.5644 4.57372 12.6957 4.70495Z"
        fill="white"
      />
    </svg>
  );
};

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
