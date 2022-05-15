import React, {useContext, useEffect, useState} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";
import AuthService from "../API/AuthService";
import {useFetching} from "../hooks/useFetching";
import Toast from '../components/toasts/toast'

const Login = () => {
    const auth = useContext(AuthContext);
    const [tab, setTab] = useState('login');
    const [form, setForm] = useState({
        login: "",
        password: "",
        passwordConfirm: ""
    })

    const [login, isLoginLoading, loginError] = useFetching(async () => {
        const data = await AuthService.login({...form})
        auth.login(data.token, data.userId)
    })

    const [register, isRegisterLoading, registerError] = useFetching(async () => {
        try {
            const data = await AuthService.register({...form})
            if (data.message) {
                new Toast({
                    title: false,
                    text: data.message,
                    theme: 'success',
                    autohide: true,
                    interval: 3000
                });
                setForm({
                    login: "",
                    password: "",
                    passwordConfirm: ""
                })
                setTab('login')
            }
        } catch (e) {
        }
    })

    const loginHandler = async (event) => {
        event.preventDefault()
        login()
    }

    const registerHandler = async (event) => {
        event.preventDefault()
        register()
    }

    useEffect(() => {
        if (loginError || registerError) {
            new Toast({
                title: false,
                text: loginError ?? loginError,
                theme: 'danger',
                autohide: true,
                interval: 3000
            });
        }
    }, [loginError, registerError]);

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <div className={'auth-tabs'}>
                <span
                    className={tab === 'login' ? "active" : ""}
                    onClick={() => setTab('login')}
                >
                    Login
                </span>
                <span
                    className={tab === 'register' ? "active" : ""}
                    onClick={() => setTab('register')}
                >
                    Registration
                </span>
            </div>
            <form className={'auth_form'}>
                <MyInput
                    value={form.login}
                    name={'login'}
                    type={'text'}
                    placeholder={'Enter login'}
                    onChange={changeHandler}
                />
                <MyInput
                    value={form.password}
                    name={'password'}
                    type={'password'}
                    placeholder={'Enter password'}
                    onChange={changeHandler}
                />
                {tab === 'register' &&
                <MyInput
                    value={form.passwordConfirm}
                    name={'passwordConfirm'}
                    type={'password'}
                    placeholder={'Confirm password'}
                    onChange={changeHandler}
                />}
                {tab === 'register'
                    ? <MyButton onClick={registerHandler}>Register</MyButton>
                    : <MyButton onClick={loginHandler}>Log in</MyButton>}
            </form>
        </div>
    );
};

export default Login;
