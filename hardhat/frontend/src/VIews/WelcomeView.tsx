import React, {useState} from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';
import {Button, Grid} from "@material-ui/core";
import {useAppSelector} from "../State/hooks";
import {connect} from "react-redux";
import store from "../State";
import VoteCard from "../Components/Container/VoteCard";
import {PlusOneRounded} from "@material-ui/icons";
import NewVoteDialog from "../Components/Dialog/newVoteDialog";


function WelcomeView() {
    const user = useAppSelector((state) => state.user.id);
    const [voteDialog, setVoteDialog] = useState(false);
    const newVote = () => {
       setVoteDialog(true);
    }
    const handleClose = () => setVoteDialog(false);
    return (
        <Grid>
            <Grid container direction={"row"} spacing={4} alignItems={"center"}>

                {user && <React.Fragment>
                    <Grid item xs={8}>
                        <VoteCard/>
                    </Grid>
                    <Grid item xs={4} justify={"center"}>
                        {voteDialog && <NewVoteDialog onClose={() => handleClose}/>}
                        <Grid container alignItems={"center"}>
                            <Grid item alignItems={"center"}>
                                <Button onClick={newVote} variant="outlined" color="primary" href="#outlined-buttons">
                                    New vote
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>
                }
            </Grid>
        </Grid>
    );
}


export default WelcomeView;