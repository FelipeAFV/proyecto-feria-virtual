import { url } from 'inspector';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Redirect, useParams } from 'react-router'
import standVideos from "../utils/stands-videos.jsx";
import challengeVideos from "../utils/challenge-videos";
import capsulasFormativas from "../utils/capsulas-formativas";
import activities from "../utils/videos-actividades";
import { Any } from 'typeorm';
import { uploadImage} from "../../api-client/image-uploader";
import { Link } from 'react-router-dom';
import { challengesStatus as checkStatus } from "../../api-client/challenge-service";
import Capsule from '../image-content/ImageContent';
import VideoModal from '../VideoModal/VideoModal';
import ImageContent from '../image-content/ImageContent';
import Book from '../book/Book';
import Stand6Middle from '../stand-middle-content/stand6/Stand6Middle';
import Stand7Middle from '../stand-middle-content/stand7/Stand7Middle';
import styles from './stand-styles';
import Stand5Middle from '../stand-middle-content/stand5/Stand5Middle';
import { useMediaQuery } from "react-responsive";

interface StandParams {
    standId: string
}

interface ChallengeResponse {
    challenge: {
        number: number
    }
}

export default function Stand() {

    let { standId }  = useParams<StandParams>();

    const standNumber = parseInt(standId);

    const [ displayChallenge, setDisplayChallenge] = useState('none');
    const [ isChallengeSelected, setIsChallengeSelected] = useState(true);

    
    const isMobile = useMediaQuery({ query: `(max-width: 768px)` });
    const isTablet = useMediaQuery({ query: `(min-width: 769px) and (max-width: 1024px) ` });

    const [ selectedChallenge, setSelectedChallenge] = useState(1);

    // const [ challengeImage, setChallengeImage] = useState<HTMLInputElement>();

    const [ videoToDisplay, setVideoToDisplay] = useState(challengeVideos[0].challenges[0].video);

    const currentCapsule = capsulasFormativas.find((el) => el.standId == standNumber);
    const currentActivity = activities.find((el) => el.standId == standNumber);

    const [ challengesStatus, setChallengesStatus] = useState<ChallengeResponse[]>([]);



    useEffect(() => {
        checkChallengesStatus();
    }, []);

 
    const checkChallengesStatus = async () => {
        const challengesCompleted = await checkStatus(standNumber+1);
        console.log('challenges', challengesCompleted);
        setChallengesStatus(challengesCompleted.challengesCompleted);

    }



    const displayChallengeVideo = (videoNumber: number) => {
        setVideoToDisplay(challengeVideos[standNumber].challenges[videoNumber].video);
        setIsChallengeSelected(true);
        setDisplayChallenge('');
    }


    if (isNaN(standNumber) || ( standNumber < 0 && standNumber > standVideos.length)) {
        
        console.log('Parse ',parseInt(standId));
        return (
            <Redirect to={'/homepage'}></Redirect>
        );
    }

    let numberOfChallenges = challengeVideos[standNumber].challenges.length;
    
    /** Consulta para saber si los desafios para este stand y usuario están completos */
    
    const challengeCompleted = true;
    

    
    let challengesDisplay: any[] = [];
    
    for (let i = 1; i <= numberOfChallenges; i++) {
        console.log('Challenge status', challengesStatus);
        if ( challengesStatus.find((completed) => {
            return  completed.challenge.number == i;
        })) {
            challengesDisplay.push(<img  onClick={ () => { displayChallengeVideo(i-1); setSelectedChallenge(i);}} className={' max-w-[50px] sm:max-w-[80px]'} src={`/assets/images/recursos-didaxia/trofeos/completado/${i}.png`}></img>);
        } else {
            challengesDisplay.push(<img onClick={ () => { displayChallengeVideo(i-1); setSelectedChallenge(i)}}  className={' max-w-[50px] sm:max-w-[60px]'}  src={`/assets/images/recursos-didaxia/trofeos/incompleto/${i}.png`}></img>);
            
        }
    } 


        

    return (
        <div className="park-background py-0 mt-0 scrollable-content" onClick={() => {

        }}>
            <div className='min-h-[80%] relative flex flex-row justify-center items-start py-0 mt-10'>

            
            <div className={'flex absolute bottom-0 flex-row items-center justify-center w-[100%] h-[100%] max-w-[1280px] '} >
                
                    <img className='absolute top-0 object-cover object-top w-[100%]  h-[100%] 2xl:h-[100%]' src={`/assets/images/recursos-didaxia/stands/${standId}/${isMobile ? 'panel-mobile' : (isTablet ? 'panel-tablet' : 'Panel')}.png`}
                    />
                    
            
                    


                    <div className=" " >

                        <div className={'md:mt-40 lg:mt-0'}>

                           {    currentCapsule?.cf.map( (capsula) => {
                                    return (
                                        <ImageContent handleOnClick={() => {
                                            setVideoToDisplay(capsula.video);
                                            setDisplayChallenge('');
                                            setIsChallengeSelected(false);
                                        }} imagePath={capsula.imagePath}></ImageContent>
                                    ); 
                           } )
                           
                           }
                        </div>
                    </div>
                    <div className="flex flex-col relative items-center justify-start mt-80   max-w-[100px] sm:max-w-[200px] md:max-w-[100%] md:mx-20" >
                            { standVideos[standNumber].mainVideo}

                            <div className={'absolute max-w-[150px] md:max-w-[2000px] flex flex-row bottom-[150px]'}>

                            { challengesDisplay}
                            
                            </div>
                            {
                                standNumber == 4 ? <Stand5Middle></Stand5Middle> : ''
                            }

                            <img  src={`/assets/images/recursos-didaxia/stands/${standId}/Mesa.png`} style={
                                {
                                    maxWidth: `200px`,
                                    
                                }}>
                            
                            </img>

                    </div>
                    <div className="" >

                        <div className="md:mt-40 lg:mt-0">
                        {    currentActivity?.activities.map( (activity) => {
                                    return (
                                        <ImageContent handleOnClick={() => {
                                            setVideoToDisplay(activity.video);
                                            setDisplayChallenge('');
                                            setIsChallengeSelected(false);
                                        }} imagePath={activity.imagePath}></ImageContent>
                                    ); 
                           } )
                           
                           }
                        </div>
                    </div>
                    
            
            </div>
            </div>

            <div className={'menu-icons'}>
                <Link to='homepage'>
                    <img src="/assets/images/recursos-didaxia/stands/icons/Volver.png" alt="" />
                </Link>
                <a href="">
                    <img src="/assets/images/recursos-didaxia/stands/icons/Indice.png" alt="" />
                </a>
            </div>

            <div className={'custom-modal'} style={ {display: displayChallenge}} >
                <VideoModal isChallenge={isChallengeSelected} handleCloseClick={() => {
                    setDisplayChallenge('none')
                }} videoIFrame={videoToDisplay} selectedChallenge={selectedChallenge} standNumber={standNumber}

                ></VideoModal>
                

            </div>
        </div>
    )
}

