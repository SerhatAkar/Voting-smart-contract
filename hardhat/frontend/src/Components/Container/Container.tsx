import React from 'react';
import styled from 'styled-components';
import '../../App.css';
interface Props {
    status: String
}
const StyledContainer = styled.div`
background-color: whitesmoke;
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
z-index: 1;
display: ${( props : Props)  => props.status === 'finished' ? 'none' : 'initial'};
`

const Container : React.FC<Props> = (props : Props) => (
    <StyledContainer {...props} />
)

export default Container;