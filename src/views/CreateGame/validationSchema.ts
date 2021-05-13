import * as yup from 'yup';

const validationSchema = yup.object({
  game: yup.object({ name: yup.string().required() }),
});

export default validationSchema;