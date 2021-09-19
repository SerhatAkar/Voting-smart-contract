import React, {useState} from 'react';
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
import VoteCard from "../Components/Container/VoteCard";
import NewVoteDialog from "../Components/Dialog/newVoteDialog";
import {useEthers} from "@usedapp/core";
import {EventHandler, GetProposals, Vote} from "../hooks/contracts";
import Typography from "@material-ui/core/Typography";
import {notification} from "antd";
import Slider from "react-slick";
import BackgroundAnimation from "../Components/Container/BackgroundAnimation";
import CustomDatePicker from "../Components/CustomPicker/customDatePicker";
import {Transaction} from "ethers/lib/ethers";

function WelcomeView() {

    const {account} = useEthers();
    const [modalText, setModalText] = useState("Modal text");
    const [modal, setModal] = useState<boolean>(false);
    const proposals = GetProposals();
    const pLength = proposals && Object.keys(proposals[0]).length;
    EventHandler("ProposalCreated", ((proposal: any) => {
        setModalText("A new vote has been created  (it might be yours) !");
        setModal(true);
    }))
    const openNotification = (name: string, description: string) => {
        notification.success({
            message: name,
            description: description,
            placement: "bottomRight",
            duration: 15
        })
    };
    const {state, send} = Vote();
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
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
    };

    async function vote(proposal: number) {
        await send(proposal).finally(() => state.status == "Success" && openNotification("Success", "Your vote has been taken into account !")).catch(error => {
            setModalText("An error has occured, please try again later")
            setModal(true)
        })
    }


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
                    id="alert-dialog-title">{modalText}</DialogTitle>
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
                            <Grid item xs={10} style={{paddingLeft: "25vh"}}>
                                <Slider {...sliderSettings}>
                                    {proposals?.map(prop => prop?.map((value: { ProposalOwner: string; name: string, description: string, owner: string, voteCount: number }, index: number) => {
                                        return <Grid item xs={12} style={{padding: "40px"}}>
                                            <VoteCard name={value.name} description={value.description}
                                                      owner={value.ProposalOwner} voteCount={value.voteCount}
                                                      onVote={() => vote(index)}/>
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
                        <Grid item xs={12} style={{padding: "30vh", minHeight: "80vh"}}>

                            <Paper>
                                <Typography variant="h5" component="h3">
                                    This is a sheet of paper.
                                </Typography>
                                <Typography component="p">Paper can be used to build surface or other elements for your
                                    application.</Typography>
                            </Paper>

                        </Grid>
                    }
                </Grid>

            </Grid>
        </Grid>
    );
}


export default WelcomeView;