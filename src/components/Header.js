import React from 'react';
import './Header.css'

const Header = (props) => {
  const {roverDetails, title} = props;
  return (
    <header className="header">
      <h1>
        {title}
      </h1>
      <div>
        Launched: {roverDetails.launch_date} | 
        Landed: {roverDetails.landing_date} |
        Max Sol : {roverDetails.max_sol}
      </div>
    </header>
  )
}

export default Header;