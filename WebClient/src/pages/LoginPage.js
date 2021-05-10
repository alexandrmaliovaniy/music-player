import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useFormError } from '../hooks/formError.hook';

import './LoginPage.css';
import './AuthForm.css';
const LoginPage = () => {


    const [passwordView, setPasswordView] = useState(false);


    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });

    const {Validate, fieldStatus, IsComplete, GetError} = useFormError({
        email: {},
        password: {}
    });


    const ValidateEmail = (e) => {
        Validate.Email(e.target.name, e.target.value, (valid) => {
            return valid ? "Perfect!" : "Wrong email format!";
        });
    }
    const ValidatePassword = (e) => {
        Validate.Password(e.target.name, e.target.value, (valid) => {
            return valid ? "Done!":
            "Error: make sure your password contains at leas one capital letter and digit";
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
        <FontAwesomeIcon icon={faTimes} className="errorIcon" />
    }

    
    const SubmitForm = (e) => {
        e.preventDefault();
        console.log(IsComplete());
    }



    return (
        <div className="LoginPage">
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
                        <a href="/registration">Create account</a>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;