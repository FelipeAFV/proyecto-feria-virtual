import { CSSProperties } from "react";

const imageStyle: CSSProperties = {
    height: 'auto',
    width: '300px',
    // margin: 'auto'
}

const arrowStyle: CSSProperties = {
    cursor: 'pointer',
    zIndex: 99999999
};

const flexRowContainer: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
}

const styles = {
    imageStyle: imageStyle,
    flexRowContainer: flexRowContainer,
    arrowStyle: arrowStyle
}

export default styles;