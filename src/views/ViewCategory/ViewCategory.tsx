import { Button, TextField } from '@material-ui/core';
import { Formik } from 'formik';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../store/reducer';
import { Category, ChannelAction, Question } from '../../types';
import { createQuestion } from '../../utils/api';
import useChannel from '../../utils/hooks/useChannel';
import validationSchema from './validationSchema';
import styles from './ViewCategory.module.scss';

interface ViewCategoryForm {
  questions: Question[];
  category: Category;
}

const initialState: ViewCategoryForm = {
  questions: [],
  category: {
    id: '',
    name: '',
    gameId: '',
  },
};

export interface CreateQuestionForm {
  question: {
    text: string;
    answer: string;
    category_id: string;
  };
}

type ViewCategoryProps = {
  apiToken: string;
}

const ViewCategory: FunctionComponent<ViewCategoryProps> = ({ apiToken }) => {
  const { gameId, categoryId } =
    useParams<{ gameId: string; categoryId: string }>();
  const [isAddQuestion, setIsAddQuestion] = useState(false);

  function gameReducer(
    state: ViewCategoryForm,
    { type, payload }: ChannelAction
  ): ViewCategoryForm {
    switch (type) {
      case 'category_details':
        const category = payload?.response?.category || initialState.category;
        const questions =
          payload?.response?.questions || initialState.questions;
        return { ...state, category, questions };
      case 'new_question':
        const { question } = payload;
        if (question.id) {
          return {...state, questions: [question, ...state.questions]}
        }

        return state;
      default:
        return state;
    }
  }

  const [{ questions = [] }, channel] =
    useChannel(`game:${gameId}`, gameReducer, initialState);

  useEffect(() => {
    channel.sendMessage('category_details', { categoryId });
  }, [categoryId, channel]);

  const toggleAddQuestion = () => setIsAddQuestion(!isAddQuestion);

  const onSubmit = async (values: CreateQuestionForm) => {
    const response = await createQuestion(gameId, values, apiToken);
    console.log('response', response);
  };

  const initialFormValues: CreateQuestionForm = {
    question: {
      text: '',
      answer: '',
      category_id: categoryId,
    },
  };

  return (
    <div className={styles.container}>
      <h2>Category</h2>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialFormValues}
        validationSchema={validationSchema}
      >
        {({ errors, handleChange, handleSubmit, touched, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div className={styles.infoBlock}>
                <div className={styles.categories}>
                  {questions.map((question: Question) => {
                    return (
                      <div key={question.id}>
                        <div>ID: {question.id}</div>
                        <div>text: {question.text}</div>
                        <div>answer: {question.answer}</div>
                      </div>
                    );
                  })}
                </div>

                <Button onClick={toggleAddQuestion}>
                  {isAddQuestion ? 'Close' : 'Add question'}
                </Button>

                {isAddQuestion && (
                  <>
                    <TextField
                      error={
                        Boolean(touched.question?.text) &&
                        Boolean(errors.question?.text)
                      }
                      fullWidth
                      helperText={
                        Boolean(errors.question?.text) && errors.question?.text
                      }
                      id="question[text]"
                      label="Question Text"
                      name="question[text]"
                      onChange={handleChange}
                      value={values.question?.text}
                    />

                    <TextField
                      error={
                        Boolean(touched.question?.answer) &&
                        Boolean(errors.question?.answer)
                      }
                      fullWidth
                      helperText={
                        Boolean(errors.question?.answer) &&
                        errors.question?.answer
                      }
                      id="question[answer]"
                      label="Name"
                      name="question[answer]"
                      onChange={handleChange}
                      value={values.question.answer}
                    />

                    <Button type="submit">Create Question</Button>
                  </>
                )}
              </div>
            </form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
  }
}

export default connect(mapStateToProps)(ViewCategory);
