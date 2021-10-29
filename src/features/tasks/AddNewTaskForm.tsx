import React, {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  FormEvent,
  useCallback,
} from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectAddTaskForm, TaskSliceActions } from './tasksSlice';
import { AddTaskForm } from './models/AddTaskForm';
import { TasksSagaActions } from './sagaActions';

const TaskForm = styled('form')(({ theme }) => ({
  paddingTop: '35px',
  paddingBottom: theme.spacing(2),
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: theme.spacing(1),
}));

const FormActions = styled(Box)(() => ({
  gridColumn: '1 / 3',
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
}));

const AddNewTaskForm: FC = () => {
  const dispatch = useAppDispatch();
  const form = useAppSelector(selectAddTaskForm);

  const handleCancel = () => {
    dispatch(TaskSliceActions.setVisibleForm(false));
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(
      TaskSliceActions.setFormField({
        field: e.target.name as keyof AddTaskForm,
        value: e.target.value,
        error: e.target.validationMessage,
      })
    );
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    dispatch(
      TaskSliceActions.setFieldTouched({
        field: e.target.name as keyof AddTaskForm,
        error: e.target.validationMessage,
      })
    );
  };

  const handleAddTask = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(TasksSagaActions.addTask());
    },
    [dispatch]
  );

  return (
    <TaskForm onSubmit={handleAddTask}>
      <FormControl fullWidth>
        <TextField
          required
          type={'text'}
          name={'username'}
          label={'Name'}
          value={form.username.value}
          error={!!form.username.error}
          helperText={form.username.error}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          required
          type={'email'}
          name={'email'}
          label={'Email'}
          value={form.email.value}
          error={!!form.email.error}
          helperText={form.email.error}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>
      <FormControl sx={{ gridColumn: '1 / 3' }} fullWidth>
        <TextField
          required
          type={'text'}
          name={'text'}
          label={'Text'}
          value={form.text.value}
          error={!!form.text.error}
          helperText={form.text.error}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </FormControl>
      <FormActions>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          disabled={Object.values(form).some((field) => !!field.error)}
        >
          Add Task
        </Button>
        <Button variant={'text'} color={'error'} onClick={handleCancel}>
          Cancel
        </Button>
      </FormActions>
    </TaskForm>
  );
};

export default AddNewTaskForm;
