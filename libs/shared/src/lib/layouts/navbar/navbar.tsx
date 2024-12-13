import { Button, LinkButton } from '@kamona/components';
import { NavBar, NavBarItem, NavBarSection } from '@kamona/components';
import { useAuth } from '../../providers';

import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
  const { isAuthenticated, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleBoAppClick = () => {
    if (isAuthenticated) {
      navigate('./bo');
    } else {
      navigate('/');
    }
  };

  return (
    <NavBar className='min-w-[640px]'>
      <NavBarSection>
        <NavBarItem>
          <LinkButton
            appearance='primary'
            size='large'
            onClick={handleBoAppClick}
          >
            Open Bo App
          </LinkButton>
        </NavBarItem>
      </NavBarSection>
      <NavBarSection>
        <NavBarItem>
          <Button appearance='primary' variant='filled' onClick={login}>
            Login
          </Button>
        </NavBarItem>
        <NavBarItem>
          <Button appearance='primary' variant='filled' onClick={logout}>
            Logout
          </Button>
        </NavBarItem>
      </NavBarSection>
    </NavBar>
  );
};
