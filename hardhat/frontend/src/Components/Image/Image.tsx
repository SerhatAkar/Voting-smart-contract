import React from 'react';
import '../../App.css';
interface props {
    duration: number,
    className: string,
    image : string,
}
const Image: React.FC<props>  = (props : props) => (
    <img {...props} src={props.image} alt='' />
)

export default Image;