import { styled } from '@mui/material/styles';
import { List } from '@mui/material';

const StyledList = styled(List, {
  shouldForwardProp: (prop) => prop !== 'isLoading',
})<{ isLoading: boolean }>(({ theme, isLoading }) => ({
  filter: isLoading ? 'blur(4px)' : 'none',
  transition: theme.transitions.create(['filter', 'height'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

export default StyledList;
