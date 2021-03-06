import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import LinkStyle from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
// import Link from '@material-ui/core/Link';
// import './NewFooter.css';
function Copyright() {
  return (
    <Typography className="nav-link" variant="body2" color="textSecondary">
      {'Copyright © '}
        Mktfare
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));

export default function NewFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Link className="nav-link" to="/about"> About</Link>
          <Link className="nav-link" to="/contact"> Contact Us </Link>
          <Link className="nav-link" to="/TOS"> Terms and Conditions </Link>
          <Link className="nav-link" to="/privacy">Privacy Policy</Link>
          < Copyright />
        </Container>
      </footer>
    </div>
  );
}