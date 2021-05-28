import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../store/reducer';
import { Category as CategoryType } from '../../types';
import { deleteCategory } from '../../utils/api';
import { goToViewCategory } from '../../utils/navigation';
import Button from '../Button';
import styles from './Category.module.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Channel } from '../../utils/channel';

type CategoryProps = {
  category: CategoryType;
  apiToken: string;
  gameChannel: Channel;
};

const Category: FunctionComponent<CategoryProps> = ({
  apiToken,
  category,
  gameChannel,
}) => {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const { id, questions } = category;

  useEffect(() => {
    if (!questions) {
      gameChannel.sendMessage('category_details', {categoryId: id});
    }
  }, [id, questions, gameChannel]);

  const onClickDelete = async () => {
    await deleteCategory(category.gameId, category.id, apiToken);
  };

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className={styles.container}>
      <Card variant="outlined">
        <CardHeader title={category.name} avatar={<Avatar>C</Avatar>} />
        <CardContent>
          {category.questions?.length
            ? category.questions.map((question, index) => {
                return (
                  <div className={styles.question} key={index}>
                    <Typography variant="subtitle1">{question.text}</Typography>
                  </div>
                );
              })
            : null}
        </CardContent>

        <CardActions>
          <IconButton
            onClick={toggleExpand}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </CardActions>

        <Collapse in={expanded} timeout="auto">
          <Button onClick={onClickDelete}>Delete</Button>
          <Button
            onClick={() =>
              goToViewCategory(category.gameId, category.id, history)
            }
          >
            View Details
          </Button>
        </Collapse>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    apiToken: state.auth.apiToken || '',
  };
};

export default connect(mapStateToProps)(Category);
