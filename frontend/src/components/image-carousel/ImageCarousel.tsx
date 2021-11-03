import React, { useState } from 'react'
import Image from './image';
import styles from './styles';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

interface ImageCarouselProps {
    images: Image[]
}



export default function ImageCarousel(props: ImageCarouselProps) {
    
    const [currentImage, setCurrentImage] = useState(props.images[0]);
    const [currentImageNumber, setCurrentImageNumber] = useState(0);

    const prevImage = () => {
        console.log('Current image number', currentImageNumber);
        if (currentImageNumber == 0) {
            return;
        }
        setCurrentImageNumber(currentImageNumber-1);
        setCurrentImage(props.images[currentImageNumber-1])
    }
    
    const nextImage = () => {
        console.log('Current image number', currentImageNumber);
        if (currentImageNumber == props.images.length-1) {
            return;
        }
        setCurrentImageNumber(currentImageNumber+1);
        setCurrentImage(props.images[currentImageNumber+1])
    }

    return (
        <>
            <div className='info-image-container' style={styles.flexRowContainer}>
                <IconContext.Provider value={{size: '20px'}}>

                <FaArrowLeft  style={styles.arrowStyle}  onClick={prevImage}/>
                <img className='info-image' style={styles.imageStyle} src={currentImage.path} alt="" />

                <FaArrowRight style={styles.arrowStyle} onClick={nextImage}/>
                </IconContext.Provider>
            </div>
        </>
    )
}


