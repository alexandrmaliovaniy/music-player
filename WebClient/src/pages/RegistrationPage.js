import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";

import './RegistrationPage.css';
import './AuthForm.css';
const RegistrationPage = () => {


    const [passwordView, setPasswordView] = useState(false);
    const [formInput, setFormInput] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        dayField: "",
        monthField: "",
        yearField: "", 
    });


    const Input = (e) => {
        console.log({...formInput, [e.target.name]: e.target.value});
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }




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
                            name="email"
                            type="text"
                            autoComplete="off"
                            placeholder="example@mail.com"
                            onChange={Input}
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
                    <label htmlFor="username">Username</label>
                    <div className="inputLine">
                        <input 
                            name="username"
                            type="text"
                            autoComplete="off"
                            placeholder="user name"
                            onChange={Input}
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
                            name="password"
                            type={passwordViewMode}
                            onChange={Input}
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
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <div className="inputLine">
                        <input 
                            name="confirmPassword"
                            type={passwordViewMode}
                            onChange={Input}
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
                                    name="dayField"
                                    type="text"
                                    placeholder="DD"
                                    maxLength="2"
                                    pattern="[0-9]"
                                    autoComplete="off"
                                    onChange={Input}
                                    required
                                />
                            </div>
                            <div className="column month">
                                <label htmlFor="monthField">Month</label>
                                <select name="monthField" onChange={Input}>
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
                                    name="yearField"
                                    type="text"
                                    placeholder="YYYY"
                                    maxLength="4"
                                    pattern="[0-9]{4}"
                                    autoComplete="off"
                                    onChange={Input}
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