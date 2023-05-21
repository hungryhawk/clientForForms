import { FormControl, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { addErrorIntoField } from '../utils/utils';
import ErrorMessage from './ErrorMessage';

const TextFields = ({ label, inputProps, control, name, errors }) => {
  return (
    <FormControl fullWidth sx={{ mb: '1rem' }}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            required
            {...field}
            {...addErrorIntoField(errors[name])}
            label={label}
            variant="filled"
            InputProps={inputProps}
          />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </FormControl>
  );
};

export default TextFields;
