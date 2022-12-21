import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';

const LinkStyled = styled(Link)({
  cursor: 'pointer',
  color: '#009BCD',
  textDecoration: 'none',
  '&:hover': {
    color: '#00D4FF'
  }
});

export { LinkStyled };
