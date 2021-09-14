import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {Grid} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <Grid item alignItems={"flex-end"}>
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    Hemesky
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Made for my portfolio with love
                </Typography>
            </Container>
        </footer>
        </Grid>
    );
}

