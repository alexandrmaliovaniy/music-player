import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFormError } from '../hooks/formError.hook';
import { useHttp } from '../hooks/http.hook';

import './RegistrationPage.css';
import './AuthForm.css';
const RegistrationPage = () => {

    const {loading, request} = useHttp();

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


    const {Validate, fieldStatus, setFieldStatus, IsComplete, GetError} = useFormError({
        email: {},
        username: {},
        password: {},
        confirmPassword: {},
        date: {}
    });

    const ValidateEmail = (e) => {
        Validate.Email(e.target.name, e.target.value, (valid) => {
            return valid ? "Perfect!" : "Wrong email format!"
        });
    }
    const ValidateUsername = (e) => {
        Validate.Username(e.target.name, e.target.value, (valid) => {
            return valid ? 
            "Well, at least you can remember that" : 
            "Error: make sure you use A-z 0-9 - symbols"
        });
    }
    const ValidatePassword = (e) => {
        Validate.Password(e.target.name, e.target.value, (valid) => {
            return valid ? "Done!" :
            "Error: make sure your password contains at leas one capital letter and digit"
        });
    }
    const ValidateConfirmPassword = (e) => {
        Validate.ConfirmPassword(e.target.name, e.target.value, formInput.password, (valid) => {
            return valid ? 
            "Matched!" :
            "Error: passwords are different!"
        });
    }
    const ValidateDate = () => {
        Validate.Date("date", formInput.dayField, formInput.monthField, formInput.yearField, (valid) => {
            return valid ?
            "OK!" :
            "Error: input all fields!"
        });
    }

    const Input = (e) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const passwordViewMode = passwordView ? "text" : "password";

    const errorIcons = {
        email: fieldStatus.email?.status === undefined ? "" : 
        fieldStatus.email.status ? 
        <FontAwesomeIcon icon={faCheck} className="successIcon" /> : 
        <FontAwesomeIcon icon={faTimes} className="errorIcon" />,

        username: fieldStatus.username?.status === undefined ? "" : 
        fieldStatus.username.status ? 
        <FontAwesomeIcon icon={faCheck} className="successIcon" /> : 
        <FontAwesomeIcon icon={faTimes} className="errorIcon" />
    }
    const SubmitForm = async(e) => {
        e.preventDefault();
        try {
            if (!IsComplete()) return;

            const loginData = await request('/api/auth/registration', 'POST', {
                email: formInput.email,
                username: formInput.username,
                password: formInput.password,
                birthday: (new Date(Number(formInput.yearField), Number(formInput.monthField), Number(formInput.dayField))).getTime()
            })



        } catch(e) {
            setFieldStatus({...fieldStatus, ...e})            
        }
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
                            onBlur={ValidateEmail}
                        />
                        <div className="indecator">
                            {errorIcons.email}
                        </div>
                    </div>
                    <div className="fieldStatus">
                        {GetError("email")}
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
                            minLength="3"
                            maxLength="36"
                            onChange={Input}
                            onBlur={ValidateUsername}
                        />
                        <div className="indecator">
                            {errorIcons.username}
                        </div>
                    </div>
                    <div className="fieldStatus">
                        {GetError("username")}
                    </div>
                </div>
                <div className="inputField">
                    <label htmlFor="password">Password</label>
                    <div className="inputLine">
                        <input 
                            name="password"
                            type={passwordViewMode}
                            onChange={Input}
                            onBlur={ValidatePassword}
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
                        {GetError("password")}
                    </div>
                </div>
                <div className="inputField">
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <div className="inputLine">
                        <input 
                            name="confirmPassword"
                            type={passwordViewMode}
                            onChange={Input}
                            onBlur={ValidateConfirmPassword}
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
                        {GetError("confirmPassword")}
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
                                    pattern="[0-9].{0,2}"
                                    autoComplete="off"
                                    onChange={Input}
                                    onBlur={ValidateDate}
                                    required
                                />
                            </div>
                            <div className="column month">
                                <label htmlFor="monthField">Month</label>
                                <select name="monthField" onChange={Input} onBlur={ValidateDate} defaultValue="-1">
                                    <option value="-1" disabled>Month</option>
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
                                    onBlur={ValidateDate}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="fieldStatus">
                        {GetError("date")}
                    </div>
                </div>
                <input 
                    type="submit"
                    className="submit"
                    value={loading ? "Processing..." : "Sign up"}
                    disabled={loading}
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