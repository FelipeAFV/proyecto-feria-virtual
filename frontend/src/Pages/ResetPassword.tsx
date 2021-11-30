import React, { useState } from 'react'
import { onPasswordChange } from '../components/Auth.api';
import { useHistory, useParams } from 'react-router';
import swal from 'sweetalert';

export default function ResetPassword() {
    const history = useHistory();

    const [error, setError] = useState('');
    const [showPost, setShow] = useState(false);
    const toggleHandler = (event: React.FormEvent) => {
        event.preventDefault();
        setShow(!showPost)
    }

    const [{ password, newPassword }, setNewpass] = useState({
        password: '',
        newPassword: ''
    });
    const { token } = useParams<{ token?: string }>();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        try {
            const response = onPasswordChange({
                password,
                newPassword,
                token

            });
            swal({
                title: "Contraseña cambiada",
                icon: "success",
                timer: 3000
            });
            history.push('/auth/login');

        } catch (error: any) {
            console.log(error);
            setError(error);
        }
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
                                    <div className="container-formb">
                                        <div className="container-logo">
                                            <img src="./assets/images/recursos-didaxia/didaxialogo2.png" alt="Didaxia Logos" className="didaxia-logo" />
                                        </div>
                                        <div className="primero segundo tercero cuarto quinto">
                                            <h2 className="logo-d septimo">Cambiar contraseña</h2>
                                        </div>
                                        <form className="form" id="loginForm" method="POST">
                                            <div className="primero segundo tercero cuarto quinto">

                                                <div className="first-layer">
                                                    <div className="user-container">
                                                        <label className="label-user inputd">
                                                            <span className="user-input">Contraseña</span>
                                                            <input aria-label="Contraseña" aria-required="true"
                                                                autoCapitalize="off" autoCorrect="off" name="password"
                                                                type={showPost ? 'text' : 'password'} className="input first second focus-visible" value={password} onChange={(event) => setNewpass({
                                                                    password: event.target.value,
                                                                    newPassword
                                                                })} />
                                                        </label>

                                                    </div>
                                                </div>
                                                
                                                <div className="fix">
                                                    <div className="primero segundo tercero cuarto sexto septimoa">
                                                        <button className="btn btn-show btn-btn"
                                                            type="button" onClick={toggleHandler}>{showPost ? 'Ocultar' : 'Mostrar'}</button>
                                                    </div>
                                                </div>
                                                <div className="primero segundo tercero cuarto septimo octavo noveno decimo">

                                                    <button className="btn btn-init btn-sub" type="submit" onClick={handleSubmit}>
                                                        <div className="primero segundo tercero cuarto">Confirmar</div>
                                                    </button>
                                                    {error.length > 0 && <p>{error}</p>}

                                                </div>

                                                <div></div>
                                            </div>



                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </article>

                </main>





            </section>
        </div>
    )
}
