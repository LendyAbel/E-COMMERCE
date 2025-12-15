import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

type OptionValue = string | number;

interface SimpleSelectProps<T extends OptionValue> {
  label: string;
  name: string;
  value: T | '' | undefined;
  options: T[];
  allowEmpty?: boolean;
  onChange: (value: T | undefined) => void;
}

const SimpleSelect = <T extends OptionValue>({
  label,
  name,
  value,
  options,
  allowEmpty = true,
  onChange,
}: SimpleSelectProps<T>) => {
  const labelId = `${name}-label-id`;
  const selectId = `${name}-select-id`;

  const handleChange = (event: SelectChangeEvent<string>) => {
    const val = event.target.value;
    if (val === '') {
      onChange(undefined);
      return;
    }
    const parsedValue: T =
      typeof value === 'number' ? (Number(val) as T) : (val as T);

    onChange(parsedValue);
  };

  return (
    <FormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<string>
        labelId={labelId}
        id={selectId}
        name={name}
        value={value === undefined ? '' : String(value)}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
      >
        {allowEmpty && (
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
        )}
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SimpleSelect;
