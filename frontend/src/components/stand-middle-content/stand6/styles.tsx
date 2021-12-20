import { CSSProperties } from "react";

const middleContainer: CSSProperties = {
    
    position: 'absolute',
    bottom: '150px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'

}
const styles = {
    middleContainer: {
        ...middleContainer
    }
}

export {
    styles
}