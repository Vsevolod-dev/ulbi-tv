import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../../../context";
import MyButton from "../button/MyButton";
import classes from './Navbar.module.css'

const Navbar = () => {
    const auth = useContext(AuthContext);
    const logout = () => {
        auth.logout()
    }

    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__links}>
                <Link to="/about">About</Link>
                <Link to="/posts">Posts</Link>
            </div>
            <MyButton to="/login" onClick={logout}>Logout</MyButton>
        </div>
    );
};

export default Navbar;
