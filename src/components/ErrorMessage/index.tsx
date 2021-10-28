import React from 'react';
import { Typography } from '@mui/material';

interface Props {
  massage: string;
}

const ErrorMessage = (props: Props): JSX.Element => {
  return (
    <Typography component={'p'} variant={'body1'} color={'error'}>
      {props.massage}
    </Typography>
  );
};

export default ErrorMessage;
