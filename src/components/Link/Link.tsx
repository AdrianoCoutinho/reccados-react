import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LinkStyled } from './StyledLink';

interface ComponetLinkProps {
  to: string;
  name: string;
}

const Link: React.FC<ComponetLinkProps> = ({ to, name }) => {
  const navigate = useNavigate();
  return (
    <>
      <LinkStyled
        onClick={() => {
          navigate(to);
        }}
      >
        {name}
      </LinkStyled>
    </>
  );
};

export default Link;
