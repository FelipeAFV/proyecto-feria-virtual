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

                <div className="park-background scrollable-content">

                        <div className="park-stand-container first-stand-container">

                            <div className="stand">
                                <Link to={`${path}/0`}>

                                    <img id={imagesUrl[0].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage} src={`assets/images/recursos-didaxia/stands/${imagesUrl[0].url}`} alt="" />
                                </Link>
                                
                            </div>
        
                        </div>
                        <div className=" second-stand-container">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 1; i < 4; i++) {
                                            stands.push(
                                                <div key={i} className="stand">
                                                    <Link to={`${path}/${i}`}>
                                                        <img id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
                                                    </Link>
                                                </div>
                                            );
                                        }
                                        
                                        return stands;
                                    }
                                    )()
                                }

                            
                    </div>
                        <div className=" third-stand-container">

                            {
                                (
                                    () => {
                                        const stands = [];
                                        
                                        for (let i = 4; i < imagesUrl.length; i++) {
                                            stands.push(
                                                <div key={i} className="stand">
                                                    <Link to={`${path}/${i}`}>
                                                        <img id={imagesUrl[i].name} onMouseLeave={mouseLeave} onMouseOver={hoverImage}  src={`assets/images/recursos-didaxia/stands/${imagesUrl[i].url}`} alt="" />
                                                    </Link>
                                                </div>
                                            );
                                        }
                                        
                                        return stands;
                                    }
                                    )()
                                }

                            
                    </div>
                
                    
                </div>
            </Route>

            <Route path={`${path}/:standId`}>
                    <Stand/>
            </Route>

            </Switch>
        </>
    )
}
