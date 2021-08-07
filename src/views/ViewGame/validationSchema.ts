import * as yup from 'yup';

const gameConfigSchema = yup.object({
  gameConfig: yup.object({
    qs_per_column: yup.number().required(),
    column_count: yup.number().required(),
  }),
});

export { gameConfigSchema };
