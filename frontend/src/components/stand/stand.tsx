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
            challengesDisplay.push(<img onClick={ () => { displayChallengeVideo(i-1); setSelectedChallenge(i);}} className={'silueta-trofeo trofeo'} src={`/assets/images/recursos-didaxia/trofeos/completado/${i}.png`}></img>);
        } else {
            challengesDisplay.push(<img onClick={ () => { displayChallengeVideo(i-1); setSelectedChallenge(i)}}  className={'silueta-trofeo trofeo'} src={`/assets/images/recursos-didaxia/trofeos/incompleto/${i}.png`}></img>);
            
        }
    } 


        

    return (
        <div className="park-background scrollable-content" onClick={() => {

        }}>
            <div className={'stand-container'} style={
                {
                    backgroundImage: `url('/assets/images/recursos-didaxia/stands/${standId}/Panel.png')`,
                    
                    
                }}>
                    


                    <div className="columna columna-1">

                        <div className={'capsulas'}>

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
                    <div className="columna columna-2">
                            { standVideos[standNumber].mainVideo}

                            <div className={'trofeo-container'}>

                            { challengesDisplay}
                            
                            </div>
                            {
                                standNumber == 4 ? <Stand5Middle></Stand5Middle> : ''
                            }
                            {
                                standNumber == 5 ? <Stand6Middle></Stand6Middle> : ''
                                
                            }
                            {
                                standNumber == 6 ? <Stand7Middle></Stand7Middle> : ''

                            }
                            <img  src={`/assets/images/recursos-didaxia/stands/${standId}/Mesa.png`} style={
                                {
                                    maxWidth: `200px`,
                                    
                                }}>
                            
                            </img>

                    </div>
                    <div className="columna columna-3">

                        <div className="activities">
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


            <div className={'responsive-activities'}>

                          { standNumber == 6 || 4 ? <h2 style={styles.headingStyle}>Programas</h2> : <h2 style={styles.headingStyle}>Actividades</h2>}
            {    currentActivity?.activities.map( (activity) => {
                                    return (
                                        <div className="video">
                                            {activity.video}
                                        </div>
                                    ); 
                           } )
                           
                           }
            </div>
            <div className={'responsive-capsules'}>
                          { standNumber == 6 || 4 ? '' : <h2  style={styles.headingStyle}>Capsulas Formativas</h2>}
                           {    currentCapsule?.cf.map( (capsula) => {
                                    return (
                                        <div className="video">
                                            {capsula.video}
                                        </div>
                                    ); 
                           } )
                           
                           }
            </div>

            <div className={'menu-icons'}>
                <a href="">
                    <img src="/assets/images/recursos-didaxia/stands/icons/Indice.png" alt="" />
                </a>
                <Link to='homepage'>
                    <img src="/assets/images/recursos-didaxia/stands/icons/Volver.png" alt="" />
                </Link>
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

