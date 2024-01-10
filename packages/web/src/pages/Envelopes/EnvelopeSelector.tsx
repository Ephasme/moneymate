import { EnvelopeView } from "@moneymate/shared";
import { Autocomplete, AutocompleteProps } from "@mui/joy";
import { formatCurrency } from "../../helpers/formatCurrency";
import { useEnvelopes } from "../../hooks/queries";

export type EnvelopeSelectorProps = Omit<
  AutocompleteProps<EnvelopeView, false, true, false>,
  | "renderInput"
  | "options"
  | "onChange"
  | "isOptionEqualToValue"
  | "getOptionLabel"
  | "value"
> & {
  value: EnvelopeView;
  onChange?: (value: EnvelopeView | null) => void;
  notDefault?: boolean;
  notIn?: string[];
};

export const EnvelopeSelector = ({
  value,
  onChange = () => {},
  notDefault = false,
  notIn = [],
  ...props
}: EnvelopeSelectorProps) => {
  const { data: envelopes = [] } = useEnvelopes();
  if (!envelopes) return <div>Loading envelopes...</div>;
  if (envelopes.length === 0) return <div>No envelopes</div>;

  return (
    <Autocomplete
      {...props}
      options={envelopes.filter((env) => {
        if (notIn.includes(env.id)) return false;
        if (notDefault && env.isDefault) return false;
        return true;
      })}
      onChange={(_, value) => {
        onChange(value);
      }}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      disableClearable
      value={value}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <div className="flex gap-1 min-w-full items-center justify-between">
              <div className="flex-grow whitespace-nowrap overflow-x-hidden text-ellipsis">
                {option.name}
              </div>
              <div>{formatCurrency(option.balance)}</div>
            </div>
          </li>
        );
      }}
    />
  );
};
