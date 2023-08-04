import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import {useHistory} from 'react-router-dom'

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };
  const manageSpots = (e) => {
    e.preventDefault();
    history.push('/current')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <div className="outer-menu">
      <button className="user-menu" onClick={openMenu}>
      <div className="inner-menu">
      <div></div>
      <div></div>
      <div></div>
      </div>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="user-info">

            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <li>
              <div className="manageSpotDiv">
              <button className="manageSpot" onClick={manageSpots}>Manage Spots</button>
              </div>
            </li>
            <li>
              <div className="logOutDiv">
                
              <button className="logOut" onClick={logout}>Log Out</button>
              </div>
            </li>
          </div>
          </>
        ) : (
          
          <div className="login-and-signup">
            <OpenModalMenuItem
            className="signup-button"
              itemText="Sign Up"
              id='right-cursor'
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
    
            <OpenModalMenuItem
            className="login-button"
            id='login-cursor'
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            
            </div>
        )}
      </ul>
      </div>
    </>
  );
}

export default ProfileButton;
