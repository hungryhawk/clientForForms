import { Box, InputAdornment, Typography, Button } from '@mui/material';
import { individualCourse } from '../utils/data';
import { schema } from '../utils/schema2';
import { courseNames, countryNames } from '../utils/data';
import TextFields from '../components/TextFields';
import SelectFields from '../components/SelectFields';
import CheckboxFields from '../components/CheckboxFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, useParams } from 'react-router-dom';
import CoursesFinder from '../api/CoursesFinder';

const UpdatePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: async () => {
      const response = await CoursesFinder.get(`/${id}`);
      return {
        name: response.data.name,
        surname: response.data.surname,
        email: response.data.email,
        mobile: response.data.mobile,
        courses: '',
        region: '',
      };
    },
    resolver: yupResolver(schema),
  });

  const individual = watch('individual');

  const handleForm = async (data) => {
    try {
      const updatedRestaurant = await CoursesFinder.put(`/${id}`, {
        name: data.name,
        surname: data.surname,
        email: data.email,
        region: data.region,
        mobile: data.mobile,
        courses: data.courses || data.oneperson,
        privacy: data.privacy,
        privacy2: data.privacy2,
      });
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
      <Typography component="h1" sx={{ fontWeight: 'bold' }}>
        Обновить информацию
      </Typography>
      <Box
        noValidate
        component="form"
        onSubmit={handleSubmit(handleForm)}
        sx={{ width: '100%', mt: '2rem' }}
      >
        <TextFields errors={errors} control={control} name="name" />
        <TextFields errors={errors} control={control} name="surname" />
        <TextFields errors={errors} control={control} name="email" />
        <TextFields
          errors={errors}
          control={control}
          name="mobile"
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
          label="Region"
        />
        <SelectFields
          data={courseNames}
          errors={errors}
          control={control}
          name="courses"
          label="Courses"
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
        <br />

        <CheckboxFields
          errors={errors}
          control={control}
          name="privacy"
          label="Принять условия пользовательского соглашения"
        />
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
          Обновить
        </Button>
      </Box>
    </Box>
  );
};

export default UpdatePage;
