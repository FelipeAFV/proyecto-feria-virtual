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
        <div className='sm:max-w-[120px] max-w-[100px] md:max-w-[150px]'>
            <img style={style} src={props.imagePath} onClick={props.handleOnClick}></img>
            
        </div>
    )
}
