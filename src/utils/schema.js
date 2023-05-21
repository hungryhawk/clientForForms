import { phoneRegExp } from '../utils/utils';
import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Напишите свое имя'),
  surname: yup.string().required('Напишите свою фамилию'),
  email: yup.string().email(),
  mobile: yup
    .string()
    .required('Введите мобильный телефон')
    .matches(phoneRegExp, 'Phone number is not valid'),
  region: yup.string().required('Выберите область проживания'),
  courses: yup.string(),
  isBelarusian: yup.string().required('Необходимо выбрать'),
  privacy: yup.bool().oneOf([true], 'Обязательное поле для подтверждения'),
  privacy2: yup.bool().oneOf([true], 'Обязательное поле для подтверждения'),
});
