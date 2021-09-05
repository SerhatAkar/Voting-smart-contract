import React from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';
import {Grid} from "@material-ui/core";
import {useAppSelector} from "../State/hooks";
import {connect} from "react-redux";
import store from "../State";



 function WelcomeView() {
    const user =  useAppSelector((state) => state.user.id);
        return (
            <Grid>
                {user}
            </Grid>
        )
    }


export default WelcomeView;