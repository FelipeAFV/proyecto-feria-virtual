import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import Stand from '../stand/stand'
import { imageFormat, withLightSufix, withoutLightSufix, standsImages } from "../utils/stands-images";
export default function ParkView() {

    const [imagesUrl, setImageUrl] = useState(standsImages);

    const {url, path} = useRouteMatch();

    console.log('url',url);
    console.log('path',path);

    const mouseLeave = (e: any) => {
        let standName = e.target.id;
        setImageUrl(
            imagesUrl.map( (image) => {
                if (image.name == standName) {
                    image.url = `${image.name}-sin-luz.png`;
                }
                return image;
            })
        );
    }

    const hoverImage = (e: any) => {
        let standName = e.target.id;
        console.log(e.target.id);
        
        setImageUrl(
            imagesUrl.map( (image) => {
                if (image.name == standName) {
                    image.url = `${image.name}-con-luz.png`;
                }
                return image;
            })
        );
        
        console.log(imagesUrl);
    }


    return (
        <>
        <Switch>
            <Route  exact path={`${path}`}>

                    <div className='flex min-h-[100%] my-auto absolute top-0  flex-col  items-center justify-center overflow-auto '>

                            <img src="assets/images/recursos-didaxia/vista-parque.png" className='object-cover object-center h-[100%] sm:h-[100%] w-[100%]' alt="" />
                        <div className='absolute flex flex-col h-[80%] z-10 w-[100%] px-4'>

                       
                   

                        <div className="flex justify-center h-[30%]  w-[50%] mx-auto  flex-row ">


                                <Link className='flex mx-auto ' to={`${path}/0`}>

                                    <img className='max-h-[100%] object-contain   '  id={imagesUrl[0].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage} src={`assets/images/recursos-didaxia/stands/${imagesUrl[0].url}`} alt="" />
                                </Link>
                                

        
                        </div>
                        <div className="flex h-[30%] justify-center  flex-row ">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 1; i < 3; i++) {
                                            stands.push(

                                                    <Link className='mr-4  last:mr-0 last:ml-4 ' to={`${path}/${i}`}>
                                                        <img className='max-h-[100%]   '  id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
                                                    </Link>


                                            );
                                        }
                                        
                                        return stands;
                                    }
                                    )()
                                }

                            
                    </div>
                        <div className="flex h-[30%] justify-between sm:w-[70%]   flex-row mx-auto  ">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 3; i < imagesUrl.length; i++) {
                                            stands.push(

                                                    <Link className={' mr-4 last:mr-0 last:ml-4  '} to={`${path}/${i}`}>
                                                        <img className=' max-h-[100%] '   id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
                                                    </Link>


                                            );
                                        }
                                        
                                        return stands;
                                    }
                                    )()
                                }

                            
                    </div>
                        {/* <div className="park-stand-container fourth-stand-container">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 6; i < imagesUrl.length; i++) {
                                            stands.push(

                                                    <Link to={`${path}/${i}`}>
                                                        <img id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
                                                    </Link>

                                            );
                                        }
                                        
                                        return stands;
                                    }
                                    )()
                                }

                            
                    </div>
                 */}
                  </div>
                  </div>
                {/* <div className="park-background px-4 -z-10">
                    
                </div> */}
            </Route>

            <Route path={`${path}/:standId`}>
                    <Stand/>
            </Route>

            </Switch>
        </>
    )
}
