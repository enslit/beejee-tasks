import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

const ListHead = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'base-line',
}));

export default ListHead;
