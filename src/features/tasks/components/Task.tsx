import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';
import { Task } from '../models/Task';
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Cancel, Done, Edit, Save } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../auth/authSlice';
import { CSSObject, styled } from '@mui/material/styles';
import { TaskStatus } from '../models/TaskStatus';
import { selectEditedText, TaskSliceActions } from '../tasksSlice';

type Props = {
  task: Task;
  isEditing: boolean;
  onComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
};

const completedMixin: CSSObject = {
  opacity: 0.5,
};

const TaskContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'completed',
})<{ completed: boolean }>(({ theme, completed }) => {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100%',
    ...(completed && { ...completedMixin }),
  };
});

const TaskText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'completed',
})<{ completed: boolean }>(({ completed }) => ({
  textDecoration: completed ? 'line-through' : 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '15px',
}));

const TaskActions = styled(Box)`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const TaskItem: FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const editedText = useAppSelector(selectEditedText);

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      dispatch(TaskSliceActions.setEditedText(e.target.value));
    },
    [dispatch]
  );

  const handleSave: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    props.onSave(props.task.id);
  }, [props]);

  const handleEdit: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    props.onEdit(props.task.id);
  }, [props]);

  const handleDone: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    props.onComplete(props.task.id);
  }, [props]);

  const isCompleted = useMemo(() => {
    return [TaskStatus.Completed, TaskStatus.CompletedEdited].some(
      (s) => s === props.task.status
    );
  }, [props]);

  const isEdited = useMemo(() => {
    return [TaskStatus.Edited, TaskStatus.CompletedEdited].some(
      (s) => s === props.task.status
    );
  }, [props]);

  return (
    <TaskContainer completed={isCompleted}>
      {isEdited && (
        <Edit
          color={'secondary'}
          fontSize={'small'}
          sx={{ position: 'absolute', top: '25px', left: '-40px' }}
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        {props.isEditing ? (
          <FormControl fullWidth>
            <TextField
              required
              type={'text'}
              name={'task'}
              label={'Task: ' + props.task.id}
              value={editedText}
              onChange={handleChangeInput}
            />
          </FormControl>
        ) : (
          <>
            <Typography
              variant={'body2'}
              component={'em'}
              color={'text.secondary'}
            >
              {props.task.username} ({props.task.email})
            </Typography>
            <Typography variant={'body1'} component={'p'}>
              <TaskText completed={isCompleted}>{props.task.text}</TaskText>
            </Typography>
          </>
        )}
      </Box>
      {!isCompleted && user && user.isAdmin && (
        <TaskActions>
          <IconButton
            color="inherit"
            aria-label="edit task"
            edge="end"
            onClick={props.isEditing ? handleSave : handleEdit}
          >
            {props.isEditing ? <Save /> : <Edit />}
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="complete task"
            edge="end"
            onClick={props.isEditing ? props.onCancel : handleDone}
          >
            {props.isEditing ? <Cancel /> : <Done />}
          </IconButton>
        </TaskActions>
      )}
    </TaskContainer>
  );
};

export default TaskItem;
