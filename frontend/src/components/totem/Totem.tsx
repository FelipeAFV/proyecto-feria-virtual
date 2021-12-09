import React from 'react'
import { Link } from 'react-router-dom'
import { totemStyle, continueButton, linkStyle, videoContainer } from './totem-style'


export default function Totem() {
    return (
        <>
          <div className={'totem-background scrollable-content'}>
                <div style={totemStyle} className={'totem'}>
                <div style={videoContainer}>
                    <iframe src="https://www.youtube.com/embed/cFFcK3BM_No" 
                    title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; 
                    clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen></iframe>

                </div>
                    <Link style={{...linkStyle, ...continueButton}} to="/menu">
                        <div >
                            Continuar
                        </div>
                    </Link>
                </div>  
            </div>  
        </>
    )
}
