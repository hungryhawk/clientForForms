import {
  Box,
  InputAdornment,
  Typography,
  Button,
  Grid,
  Autocomplete,
  TextField,
  MenuItem,
  Select,
} from '@mui/material';
import { schema } from '../utils/schema';
import {
  courseNames,
  countryNames,
  individualCourse,
  days,
} from '../utils/data';
import TextFields from '../components/TextFields';
import SelectFields from '../components/SelectFields';
import CheckboxFields from '../components/CheckboxFields';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { CourseContext } from '../context/CourseContext';
import { useNavigate } from 'react-router-dom';
import RadioButtonsFields from '../components/RadioButtonsFields';
import CoursesFinder from '../api/CoursesFinder';

const CreatePage = () => {
  const { addCourse } = useContext(CourseContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      region: '',
      mobile: '',
      courses: '',
      privacy: false,
      privacy2: false,
      isBelarusian: '',
      members: [],
      days: [],
    },
    resolver: yupResolver(schema),
  });

  const individual = watch('individual');
  const experience = watch('experience');

  const addNewMemeber = () =>
    appendMemberRow({ text: '', level: 'elementary' });

  const {
    fields: members,
    append: appendMemberRow,
    remove: removeMemberRow,
  } = useFieldArray({
    control,
    name: 'level',
  });

  const sendForm = async (data) => {
    const {
      name,
      surname,
      email,
      region,
      mobile,
      courses,
      oneperson,
      members,
      days,
      isBelarusian,
      privacy,
      privacy2,
    } = data;
    console.log(data);
    try {
      const response = await CoursesFinder.post('/', {
        name,
        surname,
        email,
        region,
        mobile,
        courses,
        oneperson,
        members,
        days,
        isBelarusian,
        privacy,
        privacy2,
      });
      addCourse(response.data);
      navigate('/');
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mt: '4rem',
        alignItems: 'center',
      }}
    >
      <Typography
        component="h1"
        sx={{ fontWeight: 'bold', fontSize: '25px', color: 'rgb(86, 95, 209)' }}
      >
        Заполните поля ниже и наш менеджер с Вами свяжется
      </Typography>
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit(sendForm)}
        sx={{ width: '100%', mt: '2rem' }}
      >
        <TextFields errors={errors} control={control} name="name" label="Имя" />
        <TextFields
          errors={errors}
          control={control}
          name="surname"
          label="Фамилия"
        />
        <TextFields
          errors={errors}
          control={control}
          name="email"
          label="Электронная почта"
        />
        <TextFields
          errors={errors}
          control={control}
          name="mobile"
          label="Мобильный телефон"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">+375</InputAdornment>
            ),
            type: 'number',
          }}
        />
        <SelectFields
          data={countryNames}
          errors={errors}
          control={control}
          name="region"
          label="Регион"
        />
        <SelectFields
          data={courseNames}
          errors={errors}
          control={control}
          name="courses"
          label="Выберите курс"
        />
        <CheckboxFields
          errors={errors}
          control={control}
          name="individual"
          label="Курсы по индивидуальной программе:"
        />
        {individual && (
          <SelectFields
            data={individualCourse}
            errors={errors}
            control={control}
            name="oneperson"
            label="Выберите курс"
          />
        )}
        <Grid item xs={6}>
          <Controller
            control={control}
            name="days"
            defaultValue={[]}
            render={({ field: { ref, onChange, ...field } }) => (
              <Autocomplete
                multiple
                options={days}
                defaultValue={[]}
                getOptionLabel={(option) => option.label}
                onChange={(_, data) => onChange(data)}
                renderInput={(params) => (
                  <TextField
                    {...field}
                    {...params}
                    fullWidth
                    inputRef={ref}
                    variant="filled"
                    label="Выберите дни, когда Вам удобно заниматься"
                  />
                )}
              />
            )}
          />
        </Grid>
        <br />
        <CheckboxFields
          errors={errors}
          control={control}
          name="experience"
          label="Есть ли опыт изучения языка?"
        />
        {experience && (
          <Grid item xs={12}>
            {members.map((field, index) => (
              <Grid container key={field.id} spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Controller
                    control={control}
                    name={`members.${index}.experience`}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type="text"
                        fullWidth
                        label="Что было для Вас сложным при изучении языка?"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    control={control}
                    name={`members.${index}.level`}
                    defaultValue="user"
                    render={({ field }) => (
                      <Select {...field} fullWidth>
                        <MenuItem value="elementary">Elementary</MenuItem>
                        <MenuItem value="preintermediate">
                          Pre-intermediate
                        </MenuItem>
                        <MenuItem value="intermediate">Intermediate</MenuItem>
                        <MenuItem value="advanced">Advanced</MenuItem>
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    color="error"
                    variant="text"
                    onClick={() => removeMemberRow(index)}
                  >
                    Удалить
                  </Button>
                </Grid>
              </Grid>
            ))}
            <br />
            <Button variant="contained" onClick={addNewMemeber}>
              Расскажите о своем опыте
            </Button>
          </Grid>
        )}
        <br />
        <RadioButtonsFields
          errors={errors}
          control={control}
          name="isBelarusian"
        />
        <br />
        <CheckboxFields
          errors={errors}
          control={control}
          name="privacy"
          label="Принять условия пользовательского соглашения"
        />
        <br />
        <CheckboxFields
          errors={errors}
          control={control}
          name="privacy2"
          label="Согласен на обработку персональных данных"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Отправить
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePage;

// https://github.com/react-hook-form/react-hook-form/tree/master/examples/V7
