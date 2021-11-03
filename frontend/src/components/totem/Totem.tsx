import React from 'react'
import { Link } from 'react-router-dom'
import { totemStyle, continueButton, linkStyle } from './totem-style'


export default function Totem() {
    return (
        <>
          <div className={'totem-background scrollable-content'}>
                <div style={totemStyle} className={'totem'}>
                    <Link style={{...linkStyle, ...continueButton}} to="/homepage">
                        <div >
                            Continuar
                        </div>
                    </Link>
                </div>  
            </div>  
        </>
    )
}
