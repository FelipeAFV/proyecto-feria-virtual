import { CSSProperties } from "react"

const pdfContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
}

const arrowStyle: CSSProperties = {
    height: '2em',
    margin: '1em',
    zIndex: 9999999
};


export {
    pdfContainerStyle,
    arrowStyle
}