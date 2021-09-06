import React from "react";
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
        borderBottomWidth:3

    },
    mainContent: {
        padding: 40
    },
    secondaryContainer: {
        padding: "20px 25px",
        backgroundColor: grey[200],

    }
});


function NewVoteDialog(props: any) {
    const user = useAppSelector(state => state.user.id);
    const {classes, open, onClose} = props;
    const [values, setValues] = React.useState({
        shipping: user,
        country: "",
        city: "",
        state: "",
        postalCode: "",
        address: ""
    });

    return (
        <Dialog
            className={classes.root}
            fullWidth
            maxWidth="md"
            open={true}
            onClose={() => props.onClose}
        >
            <DialogContent className={classes.padding}>
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container direction="row" className={classes.mainHeader}>
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
                                    defaultValue={user}
                                    placeholder={user}
                                    id="shipping-presets"
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
                                    id="proposal"
                                    margin="dense"
                                    placeholder={"Proposal name"}
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
                                    id="additional-info"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container direction="row" justify={"center"} spacing={2} style={{marginTop: 9}}>
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
                                        <Button variant={"outlined"} style={{borderColor: "green"}}>Start the vote
                                            !</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*<Grid item xs={4} className={classes.secondaryContainer}>*/}
                    {/*    <Grid container>*/}
                    {/*        <Grid item xs={12}  className={classes.padding}>*/}
                    {/*            <IconButton*/}
                    {/*                edge="start"*/}
                    {/*                color="inherit"*/}
                    {/*                aria-label="Close"*/}
                    {/*                style={{ padding: 8 }}*/}
                    {/*            >*/}
                    {/*                <CloseIcon />*/}
                    {/*            </IconButton>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid item xs={12}>*/}
                    {/*            <Typography className={classes.primaryColor} variant="h5">*/}
                    {/*                Seller Shipping From*/}
                    {/*            </Typography>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid container style={{ paddingTop: 20 }}>*/}
                    {/*            <Grid item xs={2}>*/}
                    {/*                <Icon className={classes.primaryColor}>location_on</Icon>*/}
                    {/*            </Grid>*/}
                    {/*            <Grid item xs={10}>*/}
                    {/*                <Typography className={classes.secondaryColor}>*/}
                    {/*                    36 BAOSHAN JIUCUN BAOSHAN DISTRICT{" "}*/}
                    {/*                    <strong>201900 Shanghai China</strong>*/}
                    {/*                </Typography>*/}
                    {/*            </Grid>*/}
                    {/*        </Grid>*/}
                    {/*        <Grid container style={{ paddingTop: 10, alignItems: "center" }}>*/}
                    {/*            <Grid item xs={2}>*/}
                    {/*                <Icon className={classes.primaryColor}>person</Icon>*/}
                    {/*            </Grid>*/}
                    {/*            <Grid item  xs={3}>*/}
                    {/*                <Typography*/}
                    {/*                    variant="caption"*/}
                    {/*                    className={classes.secondaryColor}*/}
                    {/*                >*/}
                    {/*                    Seller*/}
                    {/*                </Typography>*/}
                    {/*            </Grid>*/}
                    {/*            <Grid item xs={7}>*/}
                    {/*                <Typography align="right" className={classes.secondaryColor}>*/}
                    {/*                    <strong>Seller Company</strong>*/}
                    {/*                </Typography>*/}
                    {/*            </Grid>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid container className="mt-auto">*/}
                    {/*        <Grid item >*/}
                    {/*            <Grid item xs={12}>*/}
                    {/*                <Button>Cancel</Button>*/}
                    {/*            </Grid>*/}
                    {/*            <Grid item xs={12}>*/}
                    {/*                <Button>SAVE</Button>*/}
                    {/*            </Grid>*/}
                    {/*        </Grid>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>
            </DialogContent>
        </Dialog>
    );
}

export default withStyles(styles)(NewVoteDialog);
