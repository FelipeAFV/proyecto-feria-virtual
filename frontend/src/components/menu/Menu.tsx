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
        <div className={' bg-[#3d3f8e] xl:bg-[#00000000]  menu-background flex items-center justify-center'}>
            <div className=' relative h-[80%] w-full xl:w-[auto] flex items-center justify-center' >

            <img src='/assets/images/menu/tablet.png' className='h-[100%] hidden object-contain xl:block'></img>
            {/* <div  className='w-[100%] h-[100%] absolute z-[9999] tablet-background block '></div> */}
                        <div className={'close-menu absolute top-0 md:top-[70px] left-20  md:left-36'} onClick={navigateParkView}></div>
            <img src='/assets/images/menu/lienzo-bandera.png' className='h-[100px]  absolute z-20 top-10 mx-auto'></img>
            </div>
            
            <div className={' '}>




                <div className={'responsive-container flex items-center justify-center'}>
                        <div className={' w-[50%] mx-auto'}>

                        </div>

                        {
                            (() => {
                                if (isMobile) {
                                    return <div className={'logo-container'}>

                                    <div className="first-logo-container mb-20 lg:mb-10">
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
                                   
                                    
                                </div>;
                                } else {
                                    return <div className={'logo-container'}>

                                    <div className="first-logo-container mb-40 lg:mb-10">
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
