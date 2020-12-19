import React from 'react';
import Tilt from 'react-tilt';
import brain from './Brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br-2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 250, width: 250 }}
      >
        <div className="Tilt-inner pa3">
          <img src={brain} alt="" />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
