import React from 'react'
import Image from '../../image-carousel/image';
import ImageCarousel from "../../image-carousel/ImageCarousel";
import images from './info-images';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import styles from './styles';

export default function Stand7Middle() {

    const infoImages: Image[] = images;

    return (
        <>
            
            <div style={styles.infoImageStyle}>
                
                <ImageCarousel images={infoImages}/>

            </div>
  
        </>
    )
}
