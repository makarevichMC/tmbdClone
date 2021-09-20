import React, {FC} from 'react';
import Button from "../Common/Button/Button";
import {useForm} from "react-hook-form";
import {LoginData} from "../../Types/Types";
import styles from './Login.module.css';
import {Redirect} from 'react-router-dom';


type LoginFormProps = {
    authorized: boolean
    submitAuthData: (data: LoginData) => Promise<string | undefined>
}

const LoginForm: FC<LoginFormProps> = (props) => {

    const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginData>({mode: 'onBlur'});

    const onSubmit = handleSubmit(async (data) => {
        const response = await props.submitAuthData(data);
        setError('password', {type: 'string', message: response});
    })

    return (
        props.authorized
            ?
            <Redirect to={'/main'}/>
            :
            <form onSubmit={onSubmit}>
                <div>
                    <div>
                        <label htmlFor="username">Имя пользователя</label>
                    </div>
                    <input className={styles.loginInput} type="text"
                           {...register('username', {required: 'Username is required!'})}/>

                    {errors.username && <div className={styles.error}> {errors.username.message}</div>}
                </div>

                <div>
                    <div>
                        <label htmlFor="password"> Пароль</label>
                    </div>
                    <input className={styles.loginInput} type="password"
                           {...register('password', {required: 'Password is required!'})}/>

                    {errors.password && <div className={styles.error}> {errors.password.message}</div>}
                </div>
                <Button text={'Войти'}/>
            </form>
    );
};

export default LoginForm;