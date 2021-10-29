import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Task } from './models/Task';
import {
  Box,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Cancel, Done, Edit, Save } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../auth/authSlice';
import { styled, CSSObject } from '@mui/material/styles';
import { TaskStatus } from './models/TaskStatus';
import { selectEditedText, TaskSliceActions } from './tasksSlice';

type Props = {
  task: Task;
  isEditing: boolean;
  onComplete: (id: number) => void;
  onEdit: (id: number) => void;
  onSave: (id: number) => void;
  onCancel: () => void;
};

const completedMixin: CSSObject = {
  textDecoration: 'line-through',
  opacity: 0.5,
};

const TaskContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'completed',
})<{ completed: boolean }>(({ theme, completed }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    width: '100%',
    ...(completed && { ...completedMixin }),
  };
});

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
    return [TaskStatus.Completed, TaskStatus.CompletedAdmin].some(
      (s) => s === props.task.status
    );
  }, [props]);

  return (
    <TaskContainer completed={isCompleted}>
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
        <Typography variant={'body1'} component={'p'}>
          {props.task.text}
        </Typography>
      )}
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
