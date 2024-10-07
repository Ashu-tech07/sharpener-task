import React from 'react';
import mealsImage from '../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton';
import classes from './Header.module.css';

const Header = (props) => {
    return (
        <>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton showCartHandler={props.showCartHandler}/>
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="meals image" />
            </div>
        </>
    )
}

export default Header
