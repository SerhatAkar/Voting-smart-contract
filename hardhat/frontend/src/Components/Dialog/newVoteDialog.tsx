import React, {useState} from "react";
import {withStyles, MenuItem} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import {teal, grey, green} from "@material-ui/core/colors";
import {useAppSelector} from "../../State/hooks";
import {CreateVote, Vote} from "../../hooks/contracts";
import {useEthers} from "@usedapp/core";
import {Modal} from "antd";

const styles = () => ({
    root: {
        flexGrow: 1
    },
    primaryColor: {
        color: teal[500]
    },
    secondaryColor: {
        color: grey[700]
    },

    padding: {
        padding: 0
    },
    mainHeader: {
        backgroundColor: grey[100],
        padding: 20,
        alignItems: "center",
        borderColor: green[200],
        borderBottomWidth: 3

    },
    mainContent: {
        padding: 40
    },
    secondaryContainer: {

        backgroundColor: grey[200],

    }
});


function NewVoteDialog(props: any) {

    const account = useEthers();
    const {state, send } = CreateVote();
    const {classes, open, onClose} = props;
    const initialForm: Vote = {
        _name: "",
        _description: "",
    };
    const [voteForm, setVoteForm] = useState<Vote>(initialForm);

    function handleInputChange(e: any) {
        const target = e.target;
        const setName = target.name;
        const value = target.value;
        setVoteForm({
            ...voteForm,
            [setName]: value
        })
        console.log(voteForm);
    }

    function  submitVote() {
       send(voteForm._name, voteForm._description, 5253535).then(value => {
           console.log(state);
                console.log("Okay" + value);
                // window.location.reload();
            }
        ).catch(
            err => {
                console.log(err);
                // showAlertModal();
            }
        );
    }

    const showAlertModal = () => {
        return <Modal title="Error"
                      visible onOk={window.location.reload}>
            <Typography> There was an error submitting your proposal, please try again shortly. </Typography>
        </Modal>
    }

    return (
        <form onSubmit={submitVote}>
            {!!account.account &&
            <Dialog
                className={classes.root}
                fullWidth
                maxWidth="md"
                open={true}
                onClose={() => props.onClose}
            >
                <DialogContent className={classes.padding}>
                    <Grid container xs={12}>
                        <Grid item xs={12}>
                            <Grid container direction="row" xs={12} className={classes.mainHeader}>
                                <Grid item xs={8}>
                                    <Typography className={classes.primaryColor} variant="h5">
                                        New vote proposal
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                className={classes.mainContent}
                                spacing={1}
                            >
                                <Grid item xs={10}>
                                    <TextField
                                        style={{marginBottom: 20}}
                                        fullWidth
                                        disabled={true}
                                        margin="dense"
                                        variant="outlined"
                                        label="Chairperson (you)"
                                        defaultValue={account.account}
                                        placeholder={!!account.account ? account.account : "No account is connected"}
                                    >
                                        <MenuItem>None Present</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField
                                        style={{marginTop: 20}}
                                        label="Proposal"
                                        fullWidth
                                        variant="outlined"
                                        id="_name"
                                        name="_name"
                                        margin="dense"
                                        placeholder={"Proposal name"}
                                        onChange={handleInputChange}
                                    >
                                        {/*{countries.map(option => (*/}
                                        {/*    <MenuItem key={option.value} value={option.value}>*/}
                                        {/*        {option.label}*/}
                                        {/*    </MenuItem>*/}
                                        {/*))}*/}
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        margin="dense"
                                        multiline
                                        rows="5"
                                        variant="outlined"
                                        label="Additional Info"
                                        name="_description"
                                        id="_description"
                                        onChange={handleInputChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container direction="row" justify={"center"} spacing={2}
                                          style={{marginTop: 9}}>
                                        <Grid item>
                                            <IconButton
                                                onClick={onClose()}
                                                edge="start"
                                                aria-label="Close"
                                                style={{padding: 8, color: "red"}}
                                            >
                                                <CloseIcon/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Button  onClick={submitVote} variant={"outlined"} style={{borderColor: "green"}}>Start the vote
                                                !</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>}

        </form>
    );
}

export default withStyles(styles)(NewVoteDialog);
