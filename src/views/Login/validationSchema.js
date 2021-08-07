import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export default validationSchema;