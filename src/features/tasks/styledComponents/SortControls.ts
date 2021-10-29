import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const SortControls = styled(Box)(() => ({
  width: '250px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '10px',
}));

export default SortControls;
