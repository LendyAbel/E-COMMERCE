import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  type SelectChangeEvent,
} from '@mui/material';

interface MultipleSelectProps {
  label: string;
  name: string;
  value: string[] | undefined;
  options: string[];
  onChange: (value: string[] | undefined) => void;
}

const MultipleSelect = ({
  label,
  name,
  value,
  options,
  onChange,
}: MultipleSelectProps) => {
  const labelId = `${name}-label-id`;
  const selectId = `${name}-select-id`;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const val = event.target.value;
    if (val === undefined) {
      onChange(undefined);
      return;
    }
    const parseValue = typeof val === 'string' ? val.split(',') : val;
    onChange(parseValue);
  };

  return (
    <FormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<string[]>
        labelId={labelId}
        id={selectId}
        name={name}
        multiple
        value={value === undefined ? [] : value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
