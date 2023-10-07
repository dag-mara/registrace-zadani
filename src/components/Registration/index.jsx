import React from "react";
import { useState, useEffect } from "react";
import './style.css';

export const Registration = () => {
    const [userName, setUsername] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [message, setMessage] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(
        {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
        }
    )

    const handleEmailChange = (e) => {
        const enteredEmail = e.target.value;

        const emailRegex = /\S+@\S+\.\S+/;
        const isValid = emailRegex.test(enteredEmail);
        setValidEmail(isValid);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validEmail ? '' : alert('nevložili jste platný e-mail');
        password == '' ? alert('prosím, vložte heslo') : '';
        password === e.target.passwordconfirm.value ? '' : alert('vaše hesla se heshodují');
        const onSubmitFunctions = () => {
            setMessage('děkujeme za registraci');
            setUser({
                ...user,
                email: e.target.email?.value,
                username: e.target.username.value,
                password: e.target.password.value,
                passwordConfirm: e.target.passwordconfirm.value
            })
        }

        validEmail && password !== '' && password == e.target.passwordconfirm.value ? onSubmitFunctions() : '';
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        console.log(user);
    }, [user]);


    return (
        <>
            <h1>Registrace</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    onChange={handleEmailChange}
                    onBlur={(e) => {
                        const email = e.target.value;
                        if (userName === '' && validEmail) {
                            setUsername(email.slice(0, email?.indexOf('@')));
                        }
                    }}
                />
                <input
                    type="text"
                    id="username"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                />
                <input
                    type="password"
                    id="passwordconfirm"
                    placeholder="Confirm Password"
                    onBlur={(e) => { e.target.value === password ? setMessage('') : setMessage('hesla se od sebe liší, prosím, překontrolujte si je') }}
                />
                {message && <p>{message}</p>}
                <button type="submit">
                    Registrovat
                </button>
            </form>
        </>
    )
}