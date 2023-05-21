import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import ErrorMessage from './ErrorMessage';

const RadioButtonsFields = ({ name, errors, control }) => {
  return (
    <>
      <FormControl component="fieldset" id="row">
        <FormLabel id="demo-row-radio-buttons-group-label">
          Гражданство
        </FormLabel>
        <Controller
          rules={{ required: true }}
          control={control}
          defaultValue=""
          name={name}
          render={({ field }) => (
            <RadioGroup
              {...field}
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="isBelarusian"
                control={<Radio />}
                label="Гражданин РБ"
              />
              <FormControlLabel
                value="isNotBelarusian"
                control={<Radio />}
                label="Не Гражданин РБ"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      {errors[name] ? <ErrorMessage message={errors[name].message} /> : null}
    </>
  );
};

export default RadioButtonsFields;
