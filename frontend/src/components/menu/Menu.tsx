import React from 'react'
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory} from 'react-router-dom';

export default function Menu() {

    const standNames: any[] = [{name: 'kids', number: 4}, 
    {name: 'socioemocional', number: 3} ,{name: 'bienestar', number: 1},{name: 'creatividad', number: 0}, 
    {name: 'medioambiental', number: 2}
    ];

    const history = useHistory();

    const isMobile = useMediaQuery({ query: `(max-width: 1024px)` });

    const navigateParkView = () => {
        console.log('Navegando a park view');
        history.push('/homepage');
    }


    return (
        <>
        <div className={'menu-background'}>


            <div className={'tablet-background '}>

                        <div className={'close-menu '} onClick={navigateParkView}></div>
                        <div className={'close-menu-responsive'}></div>
                <div className={'responsive-container flex items-center justify-center'}>
                        <div className={'lienzo-bandera w-[50%] mx-auto'}>

                        </div>

                        {
                            (() => {
                                if (isMobile) {
                                    return <div className={'logo-container'}>

                                    <div className="first-logo-container">
                                        {
                                            (() => {
                                                let firstStands = [];
                                                for (let i = 0; i < 2; i++) {
                                                    firstStands.push(<Link to={`/homepage/${standNames[i].number}`}>
                                                    <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i].name}.png`} alt="" />
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
                                                for (let i = 2; i < 5; i++) {
                                                    firstStands.push(<Link to={`/homepage/${standNames[i].number}`}>
                                                    <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i].name}.png`} alt="" />
                                                </Link>)
                                                }
                                                return firstStands;
                                            })()
                                        }
                                    </div>
                                    {/* <div className="third-logo-container">
                                    {
                                            (() => {
                                                let firstStands = [];
                                                for (let i = 4; i < 6; i++) {
                                                    firstStands.push(<Link to={`/homepage/${standNames[i].number}`}>
                                                    <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i].name}.png`} alt="" />
                                                </Link>)
                                                }
                                                return firstStands;
                                            })()
                                        }
                                    </div> */}
                                    <div className="forth-logo-container">
                                    {
                                            (() => {
                                                let firstStands = [];
                                                for (let i = 6; i < standNames.length; i++) {
                                                    firstStands.push(<Link to={`/homepage/${standNames[i].number}`}>
                                                    <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i].name}.png`} alt="" />
                                                </Link>)
                                                }
                                                return firstStands;
                                            })()
                                        }
                                    </div>
                                    
                                </div>;
                                } else {
                                    return <div className={'logo-container'}>

                                    <div className="first-logo-container">
                                        {
                                            (() => {
                                                let firstStands = [];
                                                for (let i = 0; i < 3; i++) {
                                                    firstStands.push(<Link to={`/homepage/${standNames[i].number}`}>
                                                    <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i].name}.png`} alt="" />
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
                                                    firstStands.push(<Link to={`/homepage/${standNames[i].number}`}>
                                                    <img className={'stand-logo'} src={`assets/images/menu/logos/${standNames[i].name}.png`} alt="" />
                                                </Link>)
                                                }
                                                return firstStands;
                                            })()
                                        }
                                    </div>
                                    
                                </div>;
                                }
                            })()
                        }

                        
                </div>
            </div>
        </div>
        </>
    )
}
