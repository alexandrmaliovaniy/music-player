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
                            autocomplete="off"
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
                <div className="inputField">
                    <label htmlFor="password">What's your birthday?</label>
                    <div className="inputLine no-border">
                        <div className="inputDate">
                            <div className="column day">
                                <label htmlFor="dayField">Day</label>
                                <input
                                    id="dayField"
                                    type="text"
                                    placeholder="DD"
                                    maxLength="2"
                                    pattern="[0-9]"
                                    autocomplete="off"
                                    required
                                />
                            </div>
                            <div className="column month">
                                <label htmlFor="monthField">Month</label>
                                <select id="monthField">
                                    <option value="0">January</option>
                                    <option value="1">February</option>
                                    <option value="2">March</option>
                                    <option value="3">April</option>
                                    <option value="4">May</option>
                                    <option value="5">June</option>
                                    <option value="6">July</option>
                                    <option value="7">August</option>
                                    <option value="8">September</option>
                                    <option value="9">October</option>
                                    <option value="10">November</option>
                                    <option value="11">December</option>
                                </select>
                            </div>
                            <div className="column year">
                                <label htmlFor="yearField">Year</label>
                                <input
                                    id="yearField"
                                    type="text"
                                    placeholder="YYYY"
                                    maxLength="4"
                                    pattern="[0-9]{4}"
                                    autocomplete="off"
                                    required
                                />
                            </div>
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