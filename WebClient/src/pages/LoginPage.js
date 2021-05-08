import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";

import './LoginPage.css';
const LoginPage = () => {


    const [passwordView, setPasswordView] = useState(false);

    const passwordViewMode = passwordView ? "text" : "password";

    const SubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className="LoginPage">
            <form className="loginForm" onSubmit={SubmitForm}>
                <div className="inputField">
                    <label for="email">Email</label>
                    <div className="inputLine">
                        <input 
                            id="email"
                            type="text"
                            autoComplete="false"
                            placeholder="example@mail.com"
                        />
                        <div className="indecator">
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    </div>
                    <div className="fieldStatus">
                        Perfect!
                    </div>
                </div>
                <div className="inputField">
                    <label for="password">Password</label>
                    <div className="inputLine">
                        <input 
                            id="password"
                            type={passwordViewMode}
                        />
                        <div className="indecator">
                            <FontAwesomeIcon
                            icon={faEye}
                            className="togglePassword"
                            onClick={()=>setPasswordView(!passwordView)}
                            />
                        </div>
                    </div>
                    <div className="fieldStatus">
                        Your password is strong!
                    </div>
                </div>
                <input 
                    type="submit"
                    className="submit"
                    value="Sign in"
                />
                <div className="otherOptions">
                    <div className="option">
                        <a href="/">Forgot password</a>
                    </div>
                    <div className="option">
                        <a href="/">Create account</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;