import React from 'react';
import {useState} from "react";
import {ethers} from 'ethers';
import './App.css';
import VotingContract from 'VotingContract/VotingContract.json';
import Welcome from './VIews/Welcome';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Container, CssBaseline} from "@material-ui/core";
import Header from "./Components/Header/Header";
import VotingArea from "./Components/Container/VotingArea";
import Footer from "./Components/Footer/Footer";
import {positions} from '@material-ui/system';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import WelcomeView from "./VIews/WelcomeView";
import {Alert} from "antd";
import {GetContractOwnerAddress} from "./hooks/contracts";


function App() {
    const address = GetContractOwnerAddress();
    return (
        <React.Fragment>
            <Router>
                <Welcome loopDuration={1000}/>
                <Grid container xs={12}
                      style={{ height: "100%"}} className={"app1"}>
                    <Grid item xs={12}>
                        <Header/>
                        {
                            address &&
                            <Alert message={`Contract is deployed on the Ropsten testnet and owner is ${address} `}
                                   type="success" showIcon/>
                        }
                    </Grid>
                    <Grid item xs={12} style={{minHeight:"80vh", marginBottom:"10vh"}}>
                                <Switch>
                                    <Route exact path="/" component={WelcomeView}/>
                                </Switch>
                    </Grid>
                    <Grid item xs={12}>
                        <Footer />
                    </Grid>
                </Grid>

            </Router>
        </React.Fragment>
    );
}

export default App;