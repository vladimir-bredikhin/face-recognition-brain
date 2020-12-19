import React from 'react';
import { REGISTER_ROUTE, SIGN_IN_ROUTE } from '../../constants';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isSignedIn ? (
        <p
          onClick={() => onRouteChange(SIGN_IN_ROUTE)}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      ) : (
        <>
          <p
            onClick={() => onRouteChange(SIGN_IN_ROUTE)}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign In
          </p>
          <p
            onClick={() => onRouteChange(REGISTER_ROUTE)}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </>
      )}
    </nav>
  );
};

export default Navigation;
