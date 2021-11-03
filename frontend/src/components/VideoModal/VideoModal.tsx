import React, { ChangeEvent, useState } from 'react'
import { uploadImage } from '../../api-client/image-uploader';

interface VideoModalProps {
    isChallenge: boolean,
    videoIFrame: JSX.Element,
    standNumber: number,
    selectedChallenge: number,
    handleCloseClick: () => void,

}

const style = {
    marginTop: '70px',
    width: '50%',

}

export default function VideoModal(props: VideoModalProps) {

    const [ challengeImage, setChallengeImage] = useState<HTMLInputElement>();
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        
        const {name, value} = event.target;
        setChallengeImage(event.target);
        console.log(challengeImage);
        
    }

    const stopVideo = () => {
        const video : HTMLIFrameElement | null = document.querySelector('.video-display iframe');
        if (video) {
            video.src = video.src;

        }
    }


    return (
        <div>
            <div style={style} className={'video-content'}>
                    <div className={'close-button'} onClick={() => { props.handleCloseClick(); stopVideo()}}></div>
                           <div className="video-display">

                                {props.videoIFrame}

                           </div>
                    {
                        props.isChallenge ? <>
                        <input type={'file'} name="challengeImage" className="upload-challenge" onChange={handleInputChange} />
                        <button className="upload-challenge" onClick={ () => {
                            if (challengeImage && challengeImage.files) {
                                console.log('Uploadinf file');
                                uploadImage(challengeImage.files[0], props.standNumber+1, props.selectedChallenge);

                            }
                        }}>Subir desafio</button>
                    </> : ''
                    }
                                
                </div>
            
        </div>
    )
}
