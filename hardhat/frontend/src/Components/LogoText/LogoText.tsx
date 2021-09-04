import React from 'react';
import '../../App.css';

interface Props {
    textColor : string;
    duration: number,
    className: string,
}
const LogoText: React.FC<Props>   = (props : Props) => {

    return (
        <p style={{color: props.textColor}} {...props} />
    )}

export default LogoText