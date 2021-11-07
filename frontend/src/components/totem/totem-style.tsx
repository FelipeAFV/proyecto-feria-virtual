import { HTMLAttributes, HtmlHTMLAttributes } from "react";
import { CSSProperties } from "react";
const totemStyle: CSSProperties = {
    backgroundImage: 'url(/assets/images/totem/totem.png)',
    marginTop: '40px',
    backgroundPosition: 'center center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    height: '600px',
    minWidth: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}

const linkStyle: CSSProperties = {

    textDecoration: 'none'
}

const videoContainer: CSSProperties = {
  position: 'relative',
  bottom: '40px',
  left: '10px',
  width: '400px'
}

const continueButton: CSSProperties = {
    borderRadius: '0.8em',
    backgroundColor: '#f00',
    color: '#fff',
    display: 'inline',
    padding: '0.5em',
    position: 'absolute',
    width: '7.4em',
    marginLeft: '-3em',
    bottom: '25%',
    left: '50%',
    textAlign: 'center'

}



export {
    totemStyle,
    continueButton,
    linkStyle, 
    videoContainer
};