import React, { Component, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { onPassword } from '../components/Auth.api';
import swal from 'sweetalert';
import Button from '../components/Button/Button';

type FormElement = React.FormEvent<HTMLFormElement>;
interface EmailValues {
    email: string,
}
const initialValues: EmailValues = {
    email: '',
}

export default function ForgotPassword() {

    const [emailValues, setEmailValues] = useState(initialValues);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onPassword(emailValues);
        swal({
            title: "Correo enviado",
            text: "Por favor revisa tu correo",
            icon: "success",
            timer: 3000
        });
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
                                        <img src="./assets/images/recursos-didaxia/didaxia-logo.png" alt="Didaxia Logos" className="didaxia-logo" />
                                        <div className="primero segundo tercero cuarto quinto">
                                            <h2 className="logo-d septimo">¿Problemas para entrar?</h2>
                                            <p className="logo-d octavob ">Introduce tu correo electrónico y te enviaremos un enlace para que vuelvas a entrar en tu cuenta.</p>
                                        </div>
                                        <form className="form">
                                            <div className="primero segundo tercero cuarto">
                                                <div className="first-layer">
                                                    <div className="user-container">
                                                        <label className="label-user inputd">
                                                            <span className="user-input">Correo electrónico</span>
                                                            <input
                                                                onChange={(event) => setEmailValues({ email: event.target.value })}
                                                                value={emailValues.email}
                                                                aria-required="true" autoCapitalize="off" autoCorrect="off"
                                                                type="text"
                                                                className="input first second focus-visible" />
                                                        </label>
                                                        <div className="fix"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="primero segundo tercero cuarto septimo octavoa decimo">
                                                <Button children="Enviar enlace" type="submit" buttonStyle="btn--outline" buttonSize="btn--medium" onClick={handleSubmit} />

                                            </div>
                                            <div className="primero segundo tercero cuarto">


                                                <Link to="login" className="btn-subb" type="submit">
                                                    <div className="primero tercero cuarto">Volver</div>
                                                </Link>

                                            </div>


                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </article>

                </main>





            </section>
            <nav className="logo-container">

            </nav>

            {/* <Footer /> */}
        </div>
    );
}