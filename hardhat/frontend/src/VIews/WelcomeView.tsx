import React, {useEffect, useState} from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';
import {Carousel} from 'react-responsive-carousel';
import "react-multi-carousel/lib/styles.css";
import {
    Button, Card,
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
import {contract, EventHandler, GetProposals} from "../hooks/contracts";
import Typography from "@material-ui/core/Typography";
import {Modal} from "antd";
import PaginationWithStyles from "material-ui-flat-pagination";
import Slider from "react-slick";
import Particles from "react-tsparticles";
import BackgroundAnimation from "../Components/Container/BackgroundAnimation";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 5
    },
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1
    }
};

function WelcomeView() {

    const {account, active} = useEthers();
    const [modal, setModal] = useState<boolean>(false);
    const proposals = GetProposals();
    const pLength = proposals && Object.keys(proposals[0]).length;
    EventHandler("ProposalCreated", ((proposal: any) => {
        setModal(true);
    }))

    const [pageNumber, setPageNumber] = useState(0);
    const [voteDialog, setVoteDialog] = useState(false);
    const newVote = () => {
        console.log(pLength);
        console.log(proposals?.map(prop => prop?.map((value: { ProposalOwner: any; }) => value.ProposalOwner)));
        setVoteDialog(true);
    }
    const handleClose = () => setVoteDialog(false);
    console.log(account);
    const refreshPage = () => {
        setModal(false);
        window.location.reload();
    }
    const rowsPerPage = 3;
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    return (
        <Grid container xs={12} style={{height: "80vh"}} id={"tsparticles"}>
            <Grid item>
                <BackgroundAnimation/>
            </Grid>
            <Dialog
                open={modal}
                onClose={window.location.reload}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle
                    id="alert-dialog-title">{"A new vote has been created  (it might be yours) !"}</DialogTitle>
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


            <Grid item xs={12}>

                <Grid container xs={12} alignItems={"center"} style={{height: "80vh"}}>
                    {!!account ? <React.Fragment>
                            <Grid item xs={10} style={{paddingLeft: "28vh"}}>
                                <Slider {...sliderSettings}>
                                    {proposals?.map(prop => prop?.map((value: { ProposalOwner: string; name: string, description: string, owner: string }, index: number) => {
                                        return <Grid item xs={12} style={{padding: "40px"}}>
                                            <VoteCard name={value.name} description={value.description}
                                                      owner={value.ProposalOwner}/>
                                        </Grid>
                                    }))}
                                </Slider>
                            </Grid>
                            <Grid item xs={2} alignItems={"flex-end"}>
                                <Grid container xs={12} style={{textAlign: "center"}} direction={"row"}>
                                    <Grid item xs={12} alignContent={"center"} style={{paddingBottom: 10}}>
                                        {voteDialog && <NewVoteDialog onClose={() => handleClose}/>}
                                        <Button onClick={newVote} variant="outlined" color="primary">
                                            New vote
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </React.Fragment> :
                        <Grid item xs={12}  style={{padding: "30vh", minHeight:"80vh"}}>

                            <Paper>
                                <Typography variant="h5" component="h3">
                                    This is a sheet of paper.
                                </Typography>
                                <Typography component="p">Paper can be used to build surface or other elements for your application.</Typography>
                            </Paper>

                        </Grid>
                    }
                    </Grid>

            </Grid>
        </Grid>
    );
}


export default WelcomeView;