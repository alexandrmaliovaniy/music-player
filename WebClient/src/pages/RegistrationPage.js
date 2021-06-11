import React, {useState, useContext} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFormError } from '../hooks/formError.hook';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

import './RegistrationPage.css';
import './AuthForm.css';
const RegistrationPage = () => {

    const {loading, request} = useHttp();
    const {login} = useContext(AuthContext);
    const [formInput, setFormInput] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });


    const {Validate, fieldStatus, setFieldStatus, IsComplete, GetError} = useFormError({
        email: {},
        username: {},
        password: {},
        confirmPassword: {},
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
            "Error: make sure you use A-zА-я 0-9 - symbols"
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

    const Input = (e) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const errorIcons = {
        email: fieldStatus.email?.status === undefined ? "" : 
        fieldStatus.email.status ? 
        <FontAwesomeIcon icon={faCheck} className="successIcon" /> : 
        <FontAwesomeIcon icon={faTimes} className="errorIcon" />,

        username: fieldStatus.username?.status === undefined ? "" : 
        fieldStatus.username.status ? 
        <FontAwesomeIcon icon={faCheck} className="successIcon" /> : 
        <FontAwesomeIcon icon={faTimes} className="errorIcon" />,

        password: fieldStatus.password?.status === undefined ? "" :
        fieldStatus.password.status ? 
        <FontAwesomeIcon icon={faCheck} className="successIcon" /> :
        <FontAwesomeIcon icon={faTimes} className="errorIcon" />,

        confirmPassword: fieldStatus.confirmPassword?.status === undefined ? "":
        fieldStatus.confirmPassword.status ?
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
            })
            login(loginData.token, loginData.id, loginData.username);
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
                            type="password"
                            onChange={Input}
                            onBlur={ValidatePassword}
                        />
                        <div className="indecator">
                            {errorIcons.password}
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
                            type="password"
                            onChange={Input}
                            onBlur={ValidateConfirmPassword}
                        />
                        <div className="indecator">
                            {errorIcons.confirmPassword}
                        </div>
                    </div>
                    <div className="fieldStatus">
                        {GetError("confirmPassword")}
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