import { Outlet, useNavigate } from 'react-router-dom';

// TODO: remove this component just for testing
export const RootComponent = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/kyc-lvl2')}>BRM Level 1</button>;
};

export const Level2Component = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/kyc-lvl3')}>BRM Level 2</button>;
};

export const Level3Component = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/')}>BRM Level 3</button>;
};

export const routes = [
  {
    path: '/',
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <RootComponent />,
      },
      {
        path: 'kyc-lvl2',
        element: <Level2Component />,
      },
      {
        path: 'kyc-lvl3',
        element: <Level3Component />,
      },
    ],
  },
];
