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
import { positions } from '@material-ui/system';
const votingContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

declare const window: any;

function App() {
    const [votingContract, setVotingContract] = useState();
    const [proposals, setProposals] = useState();
    const [proposalName, setProposalName] = useState("");

    async function requestAccount() {
        await window.ethereum.request({method: 'eth_requestAccounts'})
    }

    async function getProposals() {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(votingContractAddress, VotingContract.abi, provider);
            try {
                const addresses = await contract.getProposals();
                setProposals(addresses);
                console.log(addresses);
            } catch (err) {
                console.log(err)
            }
        }
    }

    async function setProposal() {

    }

    const sections = [
        {title: 'Tutorials', url: '#'},
        {title: 'See old votes', url: '#'},

    ];


    return (
        <React.Fragment>
            <Grid container className={"app1"} alignItems="stretch">
                <Grid xs={12}>
                    <Welcome loopDuration={3000}/>
                    <CssBaseline/>
                    <Grid item xs={12}>
                        <Header title="Vote !" sections={sections}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}  style={{minHeight:"90%"}}>
                    <Grid container>
                        <main>
                            <Grid xs={12} alignContent="center" >
                                <VotingArea/>
                                <button onClick={getProposals}> See the proposals !</button>
                                {
                                    !!proposals &&
                                    <div> The currents proposals bytes32 are {JSON.stringify(proposals)}</div>
                                }
                                <input onChange={e => setProposalName(e.target.value)} placeholder="New proposal"
                                       value={proposalName}/>
                            </Grid>

                        </main>
                    </Grid>
                </Grid>

            </Grid>
            <Footer/>

        </React.Fragment>
    );
}

export default App;