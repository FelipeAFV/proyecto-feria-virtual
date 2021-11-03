import React, { ReactNode } from 'react';
import "./Button.css";
import { Link } from 'react-router-dom';

interface IProps {
    children?: ReactNode;
    type:any;
    onClick:any ;
    buttonStyle:string;
    buttonSize:string;
    
}
const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];
export const Button: React.FC<IProps> = ({
    children, 
    type, 
    onClick, 
    buttonStyle, 
    buttonSize}) => {

        const checkButtonStyle = STYLES.includes(buttonStyle) 
        ? buttonStyle 
        : STYLES[0];

        const checkButtonSize = SIZES.includes(buttonStyle) 
        ? buttonSize
        : SIZES[0];
        
        return (
            <Link to ='login' className='btn-mobile'>
                <button className= {`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
                >
                    {children}
                </button>
                
            </Link>
        )
};
export default Button;