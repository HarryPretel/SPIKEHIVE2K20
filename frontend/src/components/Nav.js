import React from 'react';
import PropTypes from 'prop-types';
import styles from '../App.css';

function Nav(props) {
  const logged_out_nav = (
    <ul>
      <try onClick={() => props.display_form('login')}>login</try>
      <try onClick={() => props.display_form('signup')}>signup</try>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      
      <li onClick={props.handle_logout}>logout</li>
      <li onClick={() => props.display_form('profile')}>profile</li>
      <li onClick={() => props.display_form('hives')}>hive</li>
      <li onClick={() => props.display_form('inspection')}>inspection</li>
      <li onClick={() => props.display_form('equipment')}>equipment</li>
    
    </ul>

  );

  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};