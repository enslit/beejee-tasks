import React, {
  ChangeEventHandler,
  FocusEventHandler,
  FormEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectLoadingState, selectErrorMessage } from './authSlice';
import ErrorMessage from '../../components/ErrorMessage';
import { AuthSagaActions } from './sagaActions';
import { LoginForm } from './models/LoginForm';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../app/constants/routes';
import { RootLogin } from './styledComponents/RootLoginForm';
import { LoginFormActions } from './styledComponents/LoginFormActions';

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

const Login = forwardRef<HTMLDivElement, never>(function Login(): JSX.Element {
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
    <RootLogin>
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
        <LoginFormActions>
          <Button
            type={'submit'}
            variant={'contained'}
            disabled={checkButtonDisabled()}
          >
            Login
          </Button>
          <Button component={Link} to={ROUTES.home}>
            Go back
          </Button>
        </LoginFormActions>
      </form>
    </RootLogin>
  );
});

export default Login;
