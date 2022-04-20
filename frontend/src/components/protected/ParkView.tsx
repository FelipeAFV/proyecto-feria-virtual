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

                <div className="park-background px-4">

                        <div className="flex flex-row md:mt-20 md:mb-14 xl:mb-4 2xl:mb-10">


                                <Link className='mx-auto w-[200px] sm:w-[300px]' to={`${path}/0`}>

                                    <img id={imagesUrl[0].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage} src={`assets/images/recursos-didaxia/stands/${imagesUrl[0].url}`} alt="" />
                                </Link>
                                

        
                        </div>
                        <div className="flex flex-row justify-center md:mb-10 xl:mb-4 2xl:mb-10 items-center">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 1; i < 3; i++) {
                                            stands.push(

                                                    <Link className='mr-4 last:mr-0 last:ml-4 w-[300px]' to={`${path}/${i}`}>
                                                        <img id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
                                                    </Link>


                                            );
                                        }
                                        
                                        return stands;
                                    }
                                    )()
                                }

                            
                    </div>
                        <div className="flex flex-row md:mx-auto justify-around lg:w-[90%]  xl:w-[75%]">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 3; i < imagesUrl.length; i++) {
                                            stands.push(

                                                    <Link className={' mr-4 last:mr-0 last:ml-4  w-[300px]'} to={`${path}/${i}`}>
                                                        <img  id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
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
            </Route>

            <Route path={`${path}/:standId`}>
                    <Stand/>
            </Route>

            </Switch>
        </>
    )
}
