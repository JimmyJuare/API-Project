// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className='navBar'>
      <li>
        <NavLink exact to="/"><img className='logo' src='https://png-files-for-api.s3.us-east-2.amazonaws.com/png/logo1.png' alt='logo'></img></NavLink>
      </li>
      {isLoaded && (
        <>
        {sessionUser ? (
          <>
          <div className='navBar-right'>
            <Link to='/spots'>Create a spot</Link>
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          </div>
          </>
        ) :(
            <li>
              <ProfileButton user={sessionUser} />
            </li>
        )}
        </>
      )}
    </ul>
  );
}

export default Navigation;
