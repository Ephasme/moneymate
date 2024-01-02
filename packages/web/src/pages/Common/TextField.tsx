import { ChangeEventHandler } from "react";

export const TextField = ({
  placeholder,
  onChange = () => {},
}: {
  placeholder?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} = {}) => {
  return (
    <input
      type="text"
      id="large-input"
      className="pb-2 focus:outline-none border-b border-slate-400 focus:border-b-black focus:placeholder:text-black"
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};
