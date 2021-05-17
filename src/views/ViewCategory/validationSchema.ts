import * as yup from 'yup';

const validationSchema = yup.object({
  question: yup.object({
    text: yup.string().required(),
    answer: yup.string().required(),
    category_id: yup.string().required(),
  }),
});

export default validationSchema;