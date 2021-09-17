import React, {useEffect, useState} from 'react';
import Container from '../Components/Container/Container';
import OuterContainer from '../Components/OuterContainer/OuterContainer';
import InnerContainer from '../Components/InnerContainer/InnerContainer';
import Logo from '../Components/Image/Image';
import LogoText from '../Components/LogoText/LogoText';
import votepng from '../Components/Image/vote.png';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
import {contract, EventHandler, GetProposals} from "../hooks/contracts";
import Typography from "@material-ui/core/Typography";
import {Modal} from "antd";
import PaginationWithStyles from "material-ui-flat-pagination";

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


    return (
        <Grid container xs={12} style={{minHeight: "80vh"}}>
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
            {!!account && <React.Fragment>
                <Grid item xs={12}>
                    <Grid container xs={12} alignItems={"center"} style={{height: "80vh"}}>
                        <Grid item xs={12}>
                                    {proposals && <Carousel
                                        swipeable={false}
                                        draggable={false}
                                        responsive={responsive}
                                        ssr={true} // means to render carousel on server-side.
                                        autoPlaySpeed={1000}
                                        keyBoardControl={true}
                                        customTransition="all .5"
                                        transitionDuration={500}

                                        removeArrowOnDeviceType={["tablet", "mobile"]}
                                        renderButtonGroupOutside
                                    >

                                        {proposals?.map(prop => prop?.map((value: { ProposalOwner: string; name: string, description: string, owner: string }) =>

                                               <Grid item xs={12}>

                                            <VoteCard name={value.name} description={value.description}
                                                          owner={value.ProposalOwner}/>
                                               </Grid>
                                        ))}

                                    </Carousel>
                                    }
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
                </Grid>
            </React.Fragment>
            }
        </Grid>

    );
}


export default WelcomeView;