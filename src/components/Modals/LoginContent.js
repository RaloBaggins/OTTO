
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import './LoginSignUpModal.css';
import axios from 'axios';

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}); // styling 

class LoginContent extends Component {
    state = {
        username: null,
        password: null,
    };
    login = async (event) => {
        event.preventDefault();
        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'LOGIN',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                },
            });
        } else {
            this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
        }
        if (this.props.user) {
            this.props.handleClose();
        }
    } // end login
    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    } // end of handleInputChangeFor
    getFavoritesInterests = async () => {
        this.props.dispatch({
            type: 'FETCH_ACCOUNT'
        });
        try {
            const response = await axios({
                url: 'api/interest/favoritesAndInterests',
                method: 'GET',
            })
            if (response.status === 200) {
                this.props.dispatch({
                    type: 'SET_FAVORITES',
                    payload: response.data.favorites
                });
                this.props.dispatch({
                    type: 'SET_INTERESTS',
                    payload: response.data.interests
                });
            }
            if (response.status === 400) {
            }
        } catch (error) {
            console.log(error)
        }
    }// end of getFavoritesInterests
    render() {
        const { classes } = this.props;
        return (
            <Container className="loginModalContainer" component="main" maxWidth="xs">
                <div className={classes.paper}>
                    {this.props.errors.loginMessage && (
                        <h2
                            className="alert"
                            role="alert"
                        >
                            {this.props.errors.loginMessage}
                        </h2>
                    )}
                    <form className={classes.form} noValidate onSubmit={this.login}>
                        <h1>Login</h1>
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email:"
                                name="username"
                                autoComplete="email"
                                autoFocus
                                value={this.state.username}
                                onChange={this.handleInputChangeFor('username')}
                            />
                        </div>
                        <div>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                autoComplete="password"
                                type="password"
                                autoFocus
                                value={this.state.password}
                                onChange={this.handleInputChangeFor('password')}
                            />
                        </div>
                        <div>
                            <Button variant="contained" color="primary"
                                className={classes.submit}
                                fullWidth
                                variant="contained"
                                type="submit"
                                name="submit"
                                value="Log In"
                            >
                                Log In
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(LoginContent));