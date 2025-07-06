import { NavLink } from "react-router-dom";
import css from './AuthNav.module.css'

const AuthNav = () => {
    return (
        <div style={{ display: 'flex', gap: '20px' }}>
  <NavLink
    to="/register"
    className={({ isActive }) => (isActive ? css.active : css.inactiveSignIn)}
  >
    Sign Up
  </NavLink>

  <NavLink
    to="/login"
    className={({ isActive }) => (isActive ? css.active : css.inactiveLogIn)}
  >
    Sign In
  </NavLink>
</div>

    )
}

export default AuthNav;