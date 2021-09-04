import React from 'react';
import styled from 'styled-components';
import '../../App.css';
const StyledInnerContainer = styled.div`
    text-align: center;
`;

interface Props {
}
const InnerContainer :  React.FC<Props>  = (props: Props) => (
    <StyledInnerContainer {...props} />
)

export default InnerContainer;