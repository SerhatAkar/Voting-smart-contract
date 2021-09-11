import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import {useAppDispatch, useAppSelector} from "../../State/hooks";
import {Spin} from "antd";
import * as session from "../../Services/Session/session"
import {logOut, setDisplayId, signIn} from "../../State/slices/userAccountSlice";
import {useHistory, withRouter} from "react-router-dom";
import {useEthers} from "@usedapp/core";


const useStyles = makeStyles((theme) => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
}));

export function Header() {

    const userId = useAppSelector((state) => state.user.id);
    const classes = useStyles();
    const [loading, startLoading] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    const {activateBrowserWallet, account} = useEthers();
    const login = async () => {
        try {
            activateBrowserWallet();
            account && session.upsertSessionUserId(account);
            account && dispatch(signIn(account));
        } catch (error) {
            console.log(error);
            await logout();
        }
    };

    const logout = () => {
        session.clearSession();
        dispatch(logOut());
        console.log(userId);
    };


    return (
        <React.Fragment>
            <Toolbar className={classes.toolbar}>
                <Button size="small">Hemesky</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    className={classes.toolbarTitle}
                >
                    Voting app
                </Typography>
                {
                    userId &&
                    <Typography
                        component="h6"
                        variant="h6"
                        color="primary"
                        align="right"
                        noWrap
                        className={classes.toolbarSecondary}
                    >
                        Your id is {userId}
                    </Typography>
                }
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                {
                    !userId ? (<Button variant="outlined" size="small" onClick={login}>
                        Sign in ( with Metamask only ! )
                        {loading && <Spin className="LoginButton__spinner" size="small"/>}
                    </Button>) : (
                        <Button variant="outlined" size="small" onClick={logout}>
                            Sign out
                        </Button>
                    )
                }

            </Toolbar>
        </React.Fragment>
    );
}

export default Header;
