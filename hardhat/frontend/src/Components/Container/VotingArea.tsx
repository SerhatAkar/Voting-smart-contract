import React from 'react';
import styled from 'styled-components';
import '../../App.css';
import {Grid} from "@material-ui/core";
import VoteCard from "./VoteCard";

export default class VotingArea extends React.Component {
    render() {
        return (
            <Grid xs={12}>
                <VoteCard/>
            </Grid>
        );
    }
}