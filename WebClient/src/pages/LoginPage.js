import React, {useState} from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye } from "@fortawesome/free-solid-svg-icons";

import './LoginPage.css';
import './AuthForm.css';
const LoginPage = () => {


    const [passwordView, setPasswordView] = useState(false);


    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });


    const Input = (e) => {
        setFormInput({...formInput, [e.target.name]: e.target.value})
    }

    const passwordViewMode = passwordView ? "text" : "password";

    const SubmitForm = (e) => {
        e.preventDefault();
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