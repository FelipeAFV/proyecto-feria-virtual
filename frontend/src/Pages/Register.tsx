import React, { ChangeEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import GRADES from "../model/grades/grades";
import SUBJECTS, { SubjectValue } from "../model/subjects/subjects";
import { onRegister } from "../components/Auth.api";
import swal from 'sweetalert';
import Footer from '../components/Footer';


interface RegisterValues {
    firstName: string,
    lastName: string,
    age: string,
    phone: string,
    email: string,
    address: '',
    condominium: '',
    username: string,
    password: string,
    role: string,
    grade?: number,
    school?: string,
    childrenNumber?: number,
    professorSchool?: string,
    professorSubject?: string
}

const initialValues: RegisterValues = {

    firstName: '',
    lastName: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    condominium: '',
    username: '',
    password: '',
    role: 'ALUMNO',
    grade: 9,
    school: '',
    childrenNumber: 1,
    professorSchool: '',
    professorSubject: SubjectValue.MAT
}



const professorFields = ['firstName', 'lastName', 'age', 'phone', 'email', 'address', 'condominium', 'username', 'password',
    'role', 'professorSchool', 'professorSubject'];
const studentFields = ['firstName', 'lastName', 'age', 'phone', 'email', 'address', 'condominium', 'username', 'password',
    'role', 'grade', 'school'];
const representativeFields = ['firstName', 'lastName', 'age', 'phone', 'email', 'address', 'condominium', 'username', 'password',
    'role', 'childrenNumber'];



export default function Register() {


    const history = useHistory();

    let initStatus = {
        firstName: false,
        lastName: false,
        age: false,
        phone: false,
        email: false,
        address: false,
        condominium: false,
        username: false,
        password: false,
        role: true,
        grade: true,
        school: false,
        childrenNumber: true,
        professorSchool: false,
        // professorSchool: registerValues.role == 'PROFESOR' ? false : true,
        professorSubject: true
    }

    const [registerValues, setRegisterValues] = useState(initialValues);
    const [formFieldsStatus, setFormFieldsStatus] = useState(initStatus);

    // setFormFieldsStatus(initStatus);

    const isFormValid = (formStatus: any) => {


        if (registerValues.role == 'PROFESOR') {
            for (let field of professorFields) {
                if (formStatus[field] == false) {
                    return false;
                }
            }

            return true;

        } else if (registerValues.role == 'ALUMNO') {

            for (let field of studentFields) {
                if (formStatus[field] == false) {
                    return false;
                }
            }

            return true;

        } else if (registerValues.role == 'APODERADO') {
            for (let field of representativeFields) {
                if (formStatus[field] == false) {
                    return false;
                }
            }

            return true;

        }

    }



    const handleInputChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {

        const { name, value } = event.target;
        setRegisterValues({
            ...registerValues,
            [name]: value
        })
        if (value == '') {
            setFormFieldsStatus({
                ...formFieldsStatus,
                [name]: false
            })
        } else {
            setFormFieldsStatus({
                ...formFieldsStatus,
                [name]: true
            })

        }
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        console.log(registerValues);
        console.log(formFieldsStatus);
        console.log(isFormValid(formFieldsStatus));
        if (isFormValid(formFieldsStatus)) {
            await onRegister(registerValues);
            console.log('Redirigiendo a totem');
            history.push('/menu');


            swal({
                title: "Registro exitoso",
                icon: "success",
                timer: 2000
            });
        } else {
            alert('Rellena todos los campos el formulario');
        }
    }

    const [showPost, setShow] = useState(false);
    const toggleHandler = (e: React.FormEvent) => {
        e.preventDefault();
        setShow(!showPost)
    }


    return (

        <div className='login-background'>


            <div className="flex-col min-h-[100%]   flex ">

                <div className='relative min-h-[100%] w-[100%]'>
                    {/* <img className='absolute object-cover -z-10 h-[100%] w-full ' src={'assets/images/Background.jpg'} alt="" /> */}


                    <div className=" bg-[#f3f3f3cc] max-w-[900px] z-[999999] rounded-xl mt-20 px-10 w-[90%] md:w-[50%] mx-auto flex flex-col mb-10 ">
                        <div className="container-logo mb-4">
                            <img src="./assets/images/recursos-didaxia/didaxialogo2.png" alt="Didaxia Logos" className="didaxia-logo" />
                        </div>
                        <form className="w-[90%] sm:w-[50%] mx-auto " id="loginForm" >

                            <div className="user-container">
                                <label className="label-user inputd">
                                    <span className="user-input">Nombre</span>
                                    <input name="firstName"
                                        type="text"
                                        className="input first second focus-visible" value={registerValues.firstName} onChange={handleInputChange} />
                                </label>

                            </div>

                            <div className="user-container">
                                <label className="label-user inputd">
                                    <span className="user-input">Apellido</span>
                                    <input name="lastName"
                                        type="text"
                                        className="input first second focus-visible" value={registerValues.lastName} onChange={handleInputChange} />
                                </label>

                            </div>

                            <div className="user-container">
                                <label className="label-user inputd">
                                    <span className="user-input">Edad</span>
                                    <input name="age"
                                        type="text"
                                        className="input first second focus-visible" value={registerValues.age} onChange={handleInputChange} />
                                </label>
                            </div>


                            <div className="user-container">
                                <label className="label-user inputd">
                                    <span className="user-input">Correo electr??nico</span>
                                    <input name="email"
                                        type="text"
                                        className="input first second focus-visible" value={registerValues.email} onChange={handleInputChange} />
                                </label>
                            </div>
                            <div className="user-container">
                                <label className="label-user inputd">
                                    <span className="user-input">Tel??fono</span>
                                    <input name="phone"
                                        type="text"
                                        className="input first second focus-visible" value={registerValues.phone} onChange={handleInputChange} />
                                </label>
                            </div>


                            <div className="flex flex-col">
                                <label className="label-user inputd">
                                    <span className="user-input">Direcci??n</span>
                                    <input name="address"
                                        type="text"
                                        className="input first second focus-visible" value={registerValues.address} onChange={handleInputChange} />
                                </label>

                                <div className="user-container">
                                    <label className="label-user inputd">
                                        <span className="user-input">Condominio</span>
                                        <input name="condominium"
                                            type="text"
                                            className="input first second focus-visible" value={registerValues.condominium} onChange={handleInputChange} />
                                    </label>
                                </div>
                                <div className="user-container">
                                    <label className="label-user inputd">
                                        <span className="user-input">Usuario o correo electr??nico</span>
                                        <input aria-label="Usuario o correo electr??nico" name="username"
                                            aria-required="true" autoCapitalize="off" autoCorrect="off"
                                            type="text"
                                            className="input first second focus-visible" value={registerValues.username} onChange={handleInputChange} />
                                    </label>

                                </div>
                                <div className="user-container">
                                    <label className="label-user inputd">
                                        <span className="user-input">Contrase??a</span>
                                        <input aria-label="Contrase??a" aria-required="true"
                                            autoCapitalize="off" autoCorrect="off" name="password"
                                            type={showPost ? 'text' : 'password'} className="input first second focus-visible" value={registerValues.password} onChange={handleInputChange} />
                                    </label>
                                    <div className="fix">
                                        <div className="primero segundo tercero cuarto sexto">
                                            <button className="btn btn-show btn-btn"
                                                type="button" onClick={toggleHandler}>{showPost ? 'Ocultar' : 'Mostrar'}</button>
                                        </div>
                                    </div>

                                </div>
                                <div className="user-container">
                                    <div className="label-user inputd">
                                        <span className="user-input">Rol</span>
                                        <select className="input first second focus-visible" name="role" value={registerValues.role} onChange={handleInputChange} >
                                            <option value="ALUMNO">Estudiante</option>
                                            <option value="APODERADO">Apoderado</option>
                                            <option value="PROFESOR">Profesor</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col'>

                                    {
                                        (() => {

                                            switch (registerValues.role) {
                                                case 'ALUMNO':
                                                    return (
                                                        <>

                                                            <div className="user-container">
                                                                <div className="label-user inputd">
                                                                    <span className="user-input">Curso</span>
                                                                    <select className="input first second focus-visible" name="grade" value={registerValues.grade} onChange={handleInputChange} >
                                                                        {
                                                                            (() => {
                                                                                let options = [];
                                                                                for (let course of GRADES) {
                                                                                    options.push(<option key={course.value} value={course.value}>{course.name}</option>)
                                                                                }
                                                                                return options;
                                                                            })()
                                                                        }
                                                                    </select>
                                                                </div>
                                                            </div>


                                                            <div className="user-container">
                                                                <label className="label-user inputd">
                                                                    <span className="user-input">Colegio</span>
                                                                    <input type="text" name="school" className="input first second focus-visible" value={registerValues.school} onChange={handleInputChange} />
                                                                </label>
                                                            </div>

                                                        </>
                                                    );
                                                    break;
                                                case 'APODERADO':
                                                    return (
                                                        <div className="first-layer">
                                                            <div className="user-container">
                                                                <label className="label-user inputd">
                                                                    <span className="user-input">N??mero de hijos</span>
                                                                    <select className="input first second focus-visible" name="childrenNumber" value={registerValues.childrenNumber} onChange={handleInputChange} >
                                                                        {
                                                                            (() => {
                                                                                let options = [];
                                                                                for (let i = 1; i <= 10; i++) {
                                                                                    options.push(<option key={i} value={i}>{i + ' Hijo/as'}</option>)
                                                                                }
                                                                                return options;
                                                                            })()
                                                                        }
                                                                    </select>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )
                                                    break;
                                                case 'PROFESOR':
                                                    return (
                                                        <>
                                                            <div className="first-layer">
                                                                <div className="user-container">
                                                                    <div className="label-user inputd">
                                                                        <span className="user-input">Asignatura impartida</span>
                                                                        <select className="input first second focus-visible" name="professorSubjec" value={registerValues.professorSubject} onChange={handleInputChange} >
                                                                            {
                                                                                (() => {
                                                                                    let options = [];
                                                                                    for (let subject of SUBJECTS) {
                                                                                        options.push(<option key={subject.value} value={subject.value}>{subject.name}</option>)
                                                                                    }
                                                                                    return options;
                                                                                })()
                                                                            }
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="first-layer">
                                                                <div className="user-container">
                                                                    <label className="label-user inputd">
                                                                        <span className="user-input">Colegio donde trabaja</span>
                                                                        <input type="text" name="professorSchool" className="input first second focus-visible" value={registerValues.professorSchool} onChange={handleInputChange} />
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                    break;

                                            }
                                        })()
                                    }

                                </div>
                                <div className="mx-auto flex justify-center flex-col items-center mb-8">
                                    {
                                        isFormValid(formFieldsStatus) ? <span></span> : <div className="text-danger invalid-field mb-3">Debes rellenar todos los campos</div>
                                    }
                                    <button className="btn btn-init btn-sub mx-auto" onClick={handleSubmit}>
                                        <div className="primero segundo tercero cuarto">Registrarse</div>
                                    </button>
                                    <div>
                                        <Link to="login" className="text-[#4c81b3] text-center" type="submit">
                                            Volver
                                        </Link>

                                    </div>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>

            </div>
            <Footer />
        </div>
    )
}
