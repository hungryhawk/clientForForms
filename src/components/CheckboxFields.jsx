import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

const CheckboxFields = ({ name, errors, control, label }) => {
  return (
    <>
      <Controller
        defaultValue=""
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} />} label={label} />
        )}
      />
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </>
  );
};

export default CheckboxFields;
