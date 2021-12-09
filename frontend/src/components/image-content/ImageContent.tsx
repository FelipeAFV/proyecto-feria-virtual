import React, { StyleHTMLAttributes } from 'react'

interface ImageContentProps {
    imagePath: string,
    handleOnClick: () => void,


}

const style = {
    // width: '200px',
    // height: '130px',
    // marginBottom: '10px'
}

export default function ImageContent(props: ImageContentProps) {


    return (
        <div>
            <img style={style} src={props.imagePath} onClick={props.handleOnClick}></img>
            
        </div>
    )
}
