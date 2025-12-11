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
  const handleChange = (event: SelectChangeEvent<string>) => {
    const rawValue = event.target.value as string;

    if (rawValue === '') {
      onChange(undefined);
      return;
    }

    // Si el value actual es number, parsea a number; si es string, deja string
    const parsedValue: T =
      typeof value === 'number' ? (Number(rawValue) as T) : (rawValue as T);

    onChange(parsedValue);
  };

  const labelId = `${name}-label-id`;
  const selectId = `${name}-select-id`;

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
