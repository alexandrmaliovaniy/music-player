import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";

import './RegistrationPage.css';
import './AuthForm.css';
const RegistrationPage = () => {


    const [passwordView, setPasswordView] = useState(false);

    const passwordViewMode = passwordView ? "text" : "password";

    const SubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className="RegistrationPage">
            <form className="authForm"
                onSubmit={SubmitForm}
            >
                <div className="inputField">
                    <label htmlFor="email">Email</label>
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
                    <label htmlFor="password">Password</label>
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
                <div className="inputField">
                    <label htmlFor="password">Confirm password</label>
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
                    value="Sign up"
                />
                <div className="otherOptions">
                    <div className="option">
                        <a href="/login">Login in</a>
                    </div>
                    <div className="option">
                        <a href="/">Help</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistrationPage;