import { phoneRegExp } from './utils';
import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Введите имя'),
  surname: yup.string().required('Введите фамилию'),
  email: yup.string().email(),
  mobile: yup
    .string()
    .required('Введите мобильный телефон')
    .matches(phoneRegExp, 'Номер введен неверно'),
  region: yup.string().required('Выберите область проживания'),
  courses: yup.string(),
  privacy: yup.bool().oneOf([true], 'Обязательное поле для подтверждения'),
  privacy2: yup.bool().oneOf([true], 'Обязательное поле для подтверждения'),
});
