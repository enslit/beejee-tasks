import { styled } from '@mui/material/styles';
import { Fab } from '@mui/material';

const AddTaskButton = styled(Fab)(() => ({
  position: 'absolute',
  bottom: -20,
  left: '50%',
  zIndex: 100,
}));

export default AddTaskButton;
