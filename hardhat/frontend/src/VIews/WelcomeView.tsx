import React, {useEffect, useState} from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper
} from "@material-ui/core";
import {useAppSelector} from "../State/hooks";
import {connect} from "react-redux";
import store from "../State";
import VoteCard from "../Components/Container/VoteCard";
import {PlusOneRounded} from "@material-ui/icons";
import NewVoteDialog from "../Components/Dialog/newVoteDialog";
import Pagination from '@material-ui/lab/Pagination';
import {useEthers} from "@usedapp/core";
import {contract, EventHandler} from "../hooks/contracts";
import Typography from "@material-ui/core/Typography";
import {Modal} from "antd";


function WelcomeView() {

    const {account, active} = useEthers();
    const [modal, setModal] = useState<boolean>(false);

    EventHandler("ProposalCreated", ((proposal: any) => {
        setModal(true);
    }))


    const [voteDialog, setVoteDialog] = useState(false);
    const newVote = () => {
        setVoteDialog(true);
    }
    const handleClose = () => setVoteDialog(false);
    console.log(account);
    const refreshPage = () => {
        setModal(false);
        window.location.reload();
    }

    return (
        <Grid container xs={12} style={{minHeight: "80vh"}}>
            <Dialog
                open={modal}
                onClose={window.location.reload}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">{"A new vote has been created  (it might be yours) !"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        The page will now refresh.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={refreshPage} color="primary" autoFocus>
                        Okay :)
                    </Button>
                </DialogActions>
            </Dialog>
            {!!account && <React.Fragment>
                <Grid item xs={12}>
                    <Paper style={{margin: "10vh", backgroundColor: "whitesmoke", height: "100%"}}
                           elevation={0}>
                        <Grid container xs={12} style={{height: "100%"}}>
                            <Grid item xs={12}>
                                <VoteCard/>
                            </Grid>
                            <Grid item xs={12} alignItems={"flex-end"}>
                                <Grid container xs={12} style={{textAlign: "center"}} direction={"row"}>
                                    <Grid item xs={12} alignContent={"center"} style={{paddingBottom: 10}}>
                                        {voteDialog && <NewVoteDialog onClose={() => handleClose}/>}
                                        <Button onClick={newVote} variant="outlined" color="primary">
                                            New vote
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </React.Fragment>
            }
        </Grid>

    );
}


export default WelcomeView;