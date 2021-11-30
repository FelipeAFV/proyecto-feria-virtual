import React from 'react'
import { Link, useHistory} from 'react-router-dom';

export default function Menu() {

    const standNames: string[] = ['creatividad', 'bienestar', 'medioambiental','socioemocional','class', 'kids', 'books'];

    const history = useHistory();

    const navigateParkView = () => {
        console.log('Navegando a park view');
        history.push('/homepage');
    }


    return (
        <>
        <div className={'menu-background'}>


            <div className={'tablet-background'}>

                        <div className={'close-menu'} onClick={navigateParkView}></div>
                        <div className={'close-menu-responsive'}></div>
                <div className={'responsive-container'}>
                        <div className={'lienzo-bandera'}>

                        </div>


                        <div className={'logo-container'}>

                            <div className="first-logo-container">
                                {
                                    (() => {
                                        let firstStands = [];
                                        for (let i = 0; i < 3; i++) {
                                            firstStands.push(<Link to={`/homepage/${i}`}>
                                            <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i]}.png`} alt="" />
                                        </Link>)
                                        }
                                        return firstStands;
                                    })()
                                }
                            </div>
                            <div className="second-logo-container">
                            {
                                    (() => {
                                        let firstStands = [];
                                        for (let i = 3; i < standNames.length; i++) {
                                            firstStands.push(<Link to={`/homepage/${i}`}>
                                            <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i]}.png`} alt="" />
                                        </Link>)
                                        }
                                        return firstStands;
                                    })()
                                }
                            </div>
                            {/* {
                                standNames.map( (standName, index) => {
                                    return (
                                        <Link to={`/homepage/${index}`}>
                                            <img className={'stand-logo'} src={`assets/images/menu/logos/${standName}.png`} alt="" />
                                        </Link>
                                    );
                                })
                            } */}
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}
