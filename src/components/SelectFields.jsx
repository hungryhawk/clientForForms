import { FormControl, MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { addErrorIntoField } from '../utils/utils';
import ErrorMessage from './ErrorMessage';

const SelectFields = ({ label, name, control, errors, data }) => {
  return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            {...addErrorIntoField(errors[name])}
            select
            label={label}
            variant="filled"
          >
            <MenuItem value="">
              <em>Выберите курс</em>
            </MenuItem>
            {data.map((el) => (
              <MenuItem key={el.id} value={el.name}>
                {el.name}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default SelectFields;
