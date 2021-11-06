import { render } from '@testing-library/react'
import React, { Component, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { onLogin } from '../components/Auth.api';
import swal from 'sweetalert';
export default function Login() {


    const history = useHistory();

    const [{ username, password}, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState('');

    const login = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Loggeando uuario');
        try {
            const response = await onLogin({
                username,
                password
            });
            console.log(response);
            swal({
                title:"Inicio de sesión exitoso",
                icon: "success",
                timer: 2000
            });

            history.push('/totem');


        } catch(e: any) {
            setError(e);
        }
    }

    const [showPost, setShow] = useState(false);
    const toggleHandler = (e:React.FormEvent) =>{
        e.preventDefault();
        setShow(!showPost)
    }

    return (
        <div>
            <section>
                <main className="main-main" role="main">
                    <article className="login-form">
                        <div className="form-container">
                            <div className="head-form">
                                <div className="container-full">
                                    <img src="./assets/images/recursos-didaxia/Lienzo bandera.png" alt="Didaxia Logo" className="didaxia-lienzo" />
                                    <div className="container-form">
                                        <img src="./assets/images/recursos-didaxia/didaxia-logo.png" alt="Didaxia Logos" className="didaxia-logo" />
                                        <form onSubmit={login} className="form" id="loginForm" method="POST">
                                            <div className="primero segundo tercero cuarto quinto">
                                                <div className="first-layer">
                                                    <div className="user-container">
                                                        <label className="label-user inputd">
                                                            <span className="user-input">Usuario</span>
                                                            <input aria-label="Usuario o correo electrónico"
                                                                aria-required="true" autoCapitalize="off" autoCorrect="off"
                                                                type="text"
                                                                className="input first second focus-visible" value={username} onChange={(event) => setCredentials({
                                                                    username: event.target.value,
                                                                    password
                                                                })} />
                                                        </label>
                                                        <div className="fix"></div>
                                                    </div>
                                                </div>
                                                <div className="first-layer">
                                                    <div className="user-container">
                                                        <label className="label-user inputd">
                                                            <span className="user-input">Contraseña</span>
                                                            <input aria-label="Contraseña" aria-required="true"
                                                                autoCapitalize="off" autoCorrect="off" name="password"
                                                                type={showPost ? 'text': 'password'} className="input first second focus-visible" value={password} onChange={(event) => setCredentials({
                                                                    username,
                                                                    password: event.target.value
                                                                })} />
                                                        </label>
                                                        <div className="fix">
                                                            <div className="primero segundo tercero cuarto sexto">
                                                                <button className="btn btn-show btn-btn"
                                                                    type="button" onClick={toggleHandler}>{showPost ? 'Ocultar' : 'Mostrar'}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="primero segundo tercero cuarto septimo octavo noveno decimo">      
                                                    <button className="btn btn-init btn-sub" type="submit">
                                                        <div className="primero segundo tercero cuarto">Iniciar Sesión</div>
                                                    </button>
                                                    {error.length > 0 && <p>{error}</p>}
                                                </div>
                                                <div></div>
                                            </div>

                                            <Link className="reset-pass"to="passwordReset">¿No recuerdas la
                                                contraseña?</Link>

                                        </form>
                                    </div>

                                </div>
                            </div>
                            <div className="head-form">
                                <div className="not account not-not account-set urus">
                                    <p className="no-account">¿No tienes cuenta?
                                        <Link to="/auth/register" >
                                            <span className="not-account  account register regreg noregis">Regístrate</span>
                                        </Link>
                                    </p>
                                </div>
                            </div>


                        </div>
                    </article>

                </main>





            </section>
            <nav className="logo-container">
                <ul>
                    <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-whatsapp-square"></i></a></li>
                    <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                </ul>




            </nav>
            <footer>
                <div className="primero segundo tercero cuarto quinto">
                    <div className="primero segundo ">
                        <div className="pie pag">Español</div>
                        <div>
                            <div className="year">
                                © 2021
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
}

