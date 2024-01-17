import { offset, useFloating } from "@floating-ui/react";
import { Box, ClickAwayListener } from "@mui/material";
import _ from "lodash";
import { HTMLProps, useEffect, useState } from "react";

export function useAutocomplete<T>({
  options,
  getItemLabel,
}: {
  options: T[];
  getItemLabel: (item: T) => string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<T | null>(null);

  const { refs, floatingStyles } = useFloating({
    open: isEditing,
    middleware: [offset(10)],
    onOpenChange: (value) => {
      setIsEditing(value);
    },
  });

  const closeMe = () => {
    setIsEditing(false);
    setInputValue(value ? getItemLabel(value) : "");
  };

  useEffect(() => {
    if (refs.floating.current && refs.reference.current) {
      const width = refs.reference.current.getBoundingClientRect().width + "px";
      console.log({
        floatingWidth: refs.floating.current.style.width,
        refWidth: width,
      });
      refs.floating.current.style.width = width;
    }
  }, [refs, isEditing]);

  const filteredOptions = () => {
    const [match, unmatch] = _(options)
      .partition((x) => getItemLabel(x).includes(inputValue))
      .value();
    return match.concat(unmatch);
  };

  return {
    refs,
    floatingStyles,
    isEditing,
    setIsEditing,
    inputValue,
    setInputValue,
    value,
    setValue,
    closeMe,
    filteredOptions,
  };
}

export function AutoCompleteCell<T>({
  value,
  onChange,
  options,
  getItemLabel,
  inputProps,
  renderOption: CustomOption,
  viewProps,
}: {
  value: T | null;
  onChange: (value: T | null | string) => void;
  options: T[];
  getItemLabel: (item: T) => string;
  inputProps?: HTMLProps<HTMLInputElement>;
  viewProps?: HTMLProps<HTMLDivElement>;
  renderOption?: ({
    option,
  }: HTMLProps<HTMLElement> & { option: T }) => React.ReactNode;
}) {
  const {
    refs,
    floatingStyles,
    isEditing,
    setIsEditing,
    inputValue,
    setInputValue,
    closeMe,
    filteredOptions,
  } = useAutocomplete<T>({ getItemLabel, options });

  const {
    className: classNameCustom,
    ref: _ref,
    ...restProps
  } = inputProps ?? {};

  const props: HTMLProps<HTMLInputElement> = {
    ref: refs.setReference,
    autoFocus: true,
    className: `shadow-md rounded-md h-full ${classNameCustom}`,
    style: {
      outline: "none",
      zIndex: 100,
      borderBottom: "1px solid #E5E7EB",
    },
    value: inputValue,
    onChange: (ev: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(ev.target.value);
    },
    onKeyDown: (ev) => {
      if (ev.key === "Escape") {
        closeMe();
      } else if (ev.key === "Enter") {
        onChange(inputValue);
        closeMe();
      }
    },
  };

  const Option =
    CustomOption ??
    (({ option }: { option: T }) => (
      <Box
        className="cursor-pointer hover:bg-slate-50 px-4 py-2"
        onClick={() => {
          onChange(option);
          closeMe();
        }}
      >
        {getItemLabel(option)}
      </Box>
    ));

  if (isEditing) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setIsEditing(false);
        }}
      >
        <Box className="contents">
          <input {...props} {...restProps} />
          {isEditing && (
            <Box
              className="bg-white shadow-md rounded-md max-h-[200px] overflow-auto"
              style={floatingStyles}
              ref={refs.setFloating}
            >
              {filteredOptions().map((option, index) => (
                <Option key={index} option={option} />
              ))}
            </Box>
          )}
        </Box>
      </ClickAwayListener>
    );
  }

  return (
    <div
      onClick={() => {
        setIsEditing(true);
      }}
      {...viewProps}
    >
      {value ? getItemLabel(value) : ""}
    </div>
  );
}
