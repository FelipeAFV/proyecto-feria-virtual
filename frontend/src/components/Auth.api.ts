import axios, { AxiosRequestConfig } from 'axios'
export interface Credentials {
    username: string;
    password: string;
}

interface LoginResponse {
    created: string;
    id: string;
    token: string;
    username: string;
}

interface PasswordResponse {
    token: string,
    password: string,
    repeatPassword: string
}

export interface Mail {
    email: string;
}
const PORT = process.env.PORT || 3000;

export interface Password {
    token: string,
    password: string,
    repeatPassword: string
}

export const onLogin = async (data: Credentials) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: '/auth/signIn',
        //url: process.send.apibaseurl + '/login',
        data
    }
    console.log('Loggeando al server en puerto', PORT);
    return axios.request<LoginResponse>(requestConfig);



}


/*
export funcion loginAction(username, password, history) {
    return(dispatch) =>{
        login(username,password)
            .then((response)=>{
                saveTokenLocalStorage(response.data);
                runLogoutTimer(dispatch, response.data.expiresIn * 1000);
                dispatch(loginConfirmedAction(response.data));
                history.push('/');
            })
            .catch((error)=>{
                const errorMessage = formatError(error.response.data);
                dispatch(loginFailedAction(error.message));
            });
    };
}

export function loginFailedAction(data){
    return
}

export funcion loginConfirmedAction(){
    
}
*/

export const onRegister = async (data: any) => {

    console.log('Data', data);
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: '/auth/signUp',
        data: data
    }

    try {
        const response = await axios.request(requestConfig);
        console.log(response);
        return response;
    } catch (e: any) {
        console.log(e.response);
        return e;
    }


}

export const onPassword = async (data: Mail) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: '/auth/reset-password',
        data: data
    }
    try {
        const response = await axios.request(requestConfig);
        console.log(response);
    } catch (e: any) {
        return e;
    }
}

export const onPasswordChange = async (data: any) => {

    const requestConfig: AxiosRequestConfig = {
        method: 'post',
        url: 'http://localhost:3000/auth/change-password',
        data: data,
        headers:{
            "content-type": "application/json",
        }
    }
    try {
        const response = await axios.request(requestConfig);
        console.log(response);
    } catch (e: any) {
        return e;
    }
    return axios.request<PasswordResponse>(requestConfig);
}

export const isLogged = async (): Promise<boolean> => {
    const requestConfig: AxiosRequestConfig = {
        method: 'get',
        url: '/auth/isLogged',
    }
    try {
        const response = await axios.request(requestConfig);
        console.log('El status de la respuesta es',response.status);
        return true;
    } catch (e: any) {
        return false;
    }
    
}


//store token in localstorage
// sss
