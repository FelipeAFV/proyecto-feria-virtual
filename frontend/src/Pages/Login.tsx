import { render } from '@testing-library/react'
import React, { Component, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { onLogin } from '../components/Auth.api';
import swal from 'sweetalert';
import bg from "../../public/assets/images/Background.jpg";
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

            history.push('/menu');


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
            <div className='absolute z-[-10] h-[100vh] sm:w-[100%] md:h-[100%] 2xl:h-[100vh]'>
                <img className='object-cover h-[100vh] sm:w-[100%] md:h-[100%]' src={'assets/images/Background.jpg'} alt="" />
            </div>
            <section>
                <main className="" role="main">
                    <article className="login-form">
                        <div className="">
                            <div className="head-form">
                                <div className="pt-0 flex items-center">
                                    <div className=' w-full mb-4'>

                                    <img src="./assets/images/recursos-didaxia/Lienzo bandera.png" alt="Didaxia Logo" className="object-cover object-bottom  w-[100%] sm:h-[60px] md:h-[80px] lg:h-[100px] xl:h-[200px]" />
                                    </div>
                                    <div className="container-form">
                                        <div className="container-logo">
                                            <img src="./assets/images/recursos-didaxia/didaxialogo2.png" alt="Didaxia Logos" className="didaxia-logo" />
                                        </div>
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
            <nav className="logo-containerb pt-0 pb-4">
                <ul>
                    <li><Link to="https://www.facebook.com/DidaxiaGrupoEducativo/"><i className="fab fa-facebook-square"></i></Link></li>
                    <li><Link to="https://www.instagram.com/grupoeducativodidaxia/?hl=es"><i className="fab fa-instagram-square"></i></Link></li>
                    <li><Link to="#"><i className="fab fa-whatsapp-square"></i></Link></li>
                    <li><Link to="https://www.youtube.com/channel/UCZxegbGc6r697zu7Y5EjNGw"><i className="fab fa-youtube"></i></Link></li>
                </ul>




            </nav>
            <footer>
                <div className=" flex justify-center items-center">
                    <div className="flex justify-center items-center w-[100px]">
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

