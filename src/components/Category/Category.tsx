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
import React, {
  CSSProperties,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router';
import { ICategory } from '../../types';
import { deleteCategory } from '../../utils/api';
import { goToViewCategory } from '../../utils/navigation';
import Button from '../Button';
import styles from './Category.module.scss';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Channel } from '../../utils/channel';

type CategoryProps = {
  category: ICategory;
  gameChannel: Channel;
  style?: CSSProperties;
};

const Category: FunctionComponent<CategoryProps> = ({
  category,
  gameChannel,
  style = {},
}) => {
  const history = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const { id, questions } = category;

  useEffect(() => {
    if (!questions) {
      gameChannel.sendMessage('category_details', { categoryId: id });
    }
  }, [id, questions, gameChannel]);

  const onClickDelete = async () => {
    await deleteCategory(category.gameId, category.id);
  };

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Card variant="outlined" style={style}>
      <CardHeader title={category.name} avatar={<Avatar>C</Avatar>} />
      <CardContent>
        {category.questions?.length
          ? category.questions.map((question) => {
              return (
                <div className={styles.question} key={question.id}>
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
  );
};;

export default Category;
