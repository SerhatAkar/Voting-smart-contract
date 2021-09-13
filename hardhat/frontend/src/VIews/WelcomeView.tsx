import React, {useState} from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';
import {Button, Grid, Paper} from "@material-ui/core";
import {useAppSelector} from "../State/hooks";
import {connect} from "react-redux";
import store from "../State";
import VoteCard from "../Components/Container/VoteCard";
import {PlusOneRounded} from "@material-ui/icons";
import NewVoteDialog from "../Components/Dialog/newVoteDialog";
import Pagination from '@material-ui/lab/Pagination';
import {useEthers} from "@usedapp/core";


function WelcomeView() {
    const account = useEthers();
    const [voteDialog, setVoteDialog] = useState(false);
    const newVote = () => {
        setVoteDialog(true);
    }
    const handleClose = () => setVoteDialog(false);
    console.log(account);
    return (
            <Grid container spacing={5}   xs={12}   >
                {!!account.account && <React.Fragment>
                    <Grid item xs={12}>
                        <VoteCard/>
                    </Grid>
                    <Grid item xs={12} alignItems={"flex-end"}>
                        <Grid container  xs={12} direction={"row"} alignItems={"center"}>
                            <Grid item xs={6} justify={"center"} style={{paddingBottom:10}}>
                                {voteDialog && <NewVoteDialog onClose={() => handleClose}/>}
                                <Button onClick={newVote} variant="outlined" color="primary" href="#outlined-buttons">
                                    New vote
                                </Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Pagination count={10} variant="outlined"/>
                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>
                }
            </Grid>

    );
}


export default WelcomeView;