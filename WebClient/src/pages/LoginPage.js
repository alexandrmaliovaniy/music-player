import React from 'react';
import './LoginPage.css';
const LoginPage = () => {

    return (
        <div className="LoginPage">
            <form className="loginForm">
                <div className="inputField">
                    <label for="email">Email</label>
                    <div className="inputLine">
                        <input id="email" placeholder="example@mail.com"/>
                        <div className="indecator">ok</div>
                    </div>
                    <div className="fieldStatus"></div>
                </div>
                <div className="inputField">
                    <label for="password">Email</label>
                    <div className="inputLine">
                        <input id="password" />
                        <div className="indecator">v</div>
                    </div>
                    <div className="fieldStatus"></div>
                </div>
                <input type="submit" value="Sign in" />
            </form>
        </div>
    );
}

export default LoginPage;