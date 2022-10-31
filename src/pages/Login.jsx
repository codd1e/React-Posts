import React, {useContext} from "react";
import Input from "../components/UI/input/Input";
import Button from "../components/UI/button/Button";
import {AuthContext} from "../context/context";

const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = event => {
        event.preventDefault()
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return(
            <div>
                <h1>Страница для логина</h1>
                <form>
                    <Input type='text' placeholder='Введите логин'/>
                    <Input type='password' placeholder='Введите пароль'/>
                    <Button onClick={login}>Войти</Button>
                </form>
            </div>
    )
}

export default Login;