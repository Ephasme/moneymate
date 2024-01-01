export const TextField = ({ placeholder }: { placeholder?: string } = {}) => {
  return (
    <input
      type="text"
      id="large-input"
      className="pb-2 focus:outline-none border-b border-slate-400 focus:border-b-black focus:placeholder:text-black"
      placeholder={placeholder}
    />
  );
};
