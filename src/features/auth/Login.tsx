import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import styled from 'styled-components';
import { Close } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoadingState, selectErrorMessage } from './authSlice';
import ErrorMessage from '../../components/ErrorMessage';
import { AuthSagaActions } from './sagaActions';
import { LoginForm } from './models/LoginForm';

interface Props {
  onClose: () => void;
}

const RootModal = styled(Paper)`
  width: 100%;
  max-width: 500px;
  padding: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 15px;
`;

const initFormState = {
  username: {
    touched: false,
    error: '',
    value: '',
  },
  password: {
    touched: false,
    error: '',
    value: '',
  },
};

const Login = forwardRef<HTMLDivElement, Props>(function Login(
  props,
  ref
): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectLoadingState);
  const error = useAppSelector(selectErrorMessage);

  const [form, setForm] = useState<typeof initFormState>(initFormState);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const field = e.target.name as keyof typeof initFormState;

    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value: e.target.value,
        error: !e.target.validity.valid ? e.target.validationMessage : '',
      },
    }));
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const field = e.target.name as keyof typeof initFormState;

    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        touched: true,
        error: !e.target.validity.valid ? e.target.validationMessage : '',
      },
    }));
  };

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const formData: LoginForm = {
        username: form.username.value,
        password: form.password.value,
      };

      dispatch(AuthSagaActions.login(formData));
    },
    [dispatch, form]
  );

  const checkHasInputError = useCallback(
    (field: keyof typeof initFormState): boolean => {
      return (
        (form[field].touched && form[field].value.length < 1) ||
        !!form[field].error
      );
    },
    [form]
  );

  const checkButtonDisabled = useCallback((): boolean => {
    return (
      isLoading ||
      Object.values(form).some((field) => !!field.error || !field.value)
    );
  }, [form, isLoading]);

  useEffect(() => {
    if (typeof error === 'object') {
      setForm((prev) => {
        return Object.entries(error).reduce(
          (formWithErrors, [key, errorMessage]) => {
            if (initFormState.hasOwnProperty(key)) {
              formWithErrors[key as keyof typeof initFormState].error =
                errorMessage;
            }
            return formWithErrors;
          },
          { ...prev }
        );
      });
    }
  }, [error]);

  return (
    <RootModal>
      <CloseButton
        color="inherit"
        aria-label="close modal"
        edge="end"
        onClick={props.onClose}
      >
        <Close />
      </CloseButton>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        align={'center'}
      >
        Login
      </Typography>
      <form onSubmit={handleSubmit} name={'login'}>
        <Box sx={{ my: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            required={true}
            type={'text'}
            name={'username'}
            label={'Login'}
            value={form.username.value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            error={checkHasInputError('username')}
            helperText={form.username.error}
          />
          <TextField
            required={true}
            type={'password'}
            name={'password'}
            label={'Password'}
            value={form.password.value}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            error={checkHasInputError('password')}
            helperText={form.password.error}
          />
        </Box>
        {error && typeof error === 'string' && (
          <Box sx={{ my: 3 }}>
            <ErrorMessage massage={error} />
          </Box>
        )}
        <Button
          type={'submit'}
          variant={'contained'}
          disabled={checkButtonDisabled()}
        >
          Login
        </Button>
      </form>
    </RootModal>
  );
});

export default Login;
