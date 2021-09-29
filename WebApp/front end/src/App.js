import React from 'react';
import { Link } from 'react-router-dom';
import Template from './asserts/pages/template';
import Logo from './asserts/pages/logo';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import SinginIcon from '@mui/icons-material/AppRegistration'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import ContactIcon from '@mui/icons-material/ContactMail';
import Fab from '@mui/material/Fab';

const theme = createTheme({
  palette: {
    primary: {
      main: '#188459',
    },
    secondary: {
      main: '#e9c437',
    },
  },
});


export default function App() {

  const logo = <Logo />
  const page = <Page />

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Template left={logo} right={page} />
      </div>
    </ThemeProvider>
  );
}

///page content
function Page() {
  return (
    <div onLoad={function () { document.title = 'Home' }} className="home">
      <Typography variant="h6" component="h6">
        Do you already have an account?
      </Typography>
      <Button
        variant="contained"
        startIcon={<LoginIcon />}
        href='/Login'
      >
        Login
      </Button>
      <Typography variant="h6" component="h6">
        Do you want to join with us?
      </Typography>
      <Button
        variant="contained"
        startIcon={<SinginIcon />}
        color="secondary"
        href='/Register'
      >
        Get started
      </Button>
      
        <div class="footer">
          <Tooltip title="Contact us">
            <Fab
              size="large"
              href="mailto: wildlifetrackeruop@gmail.com"
              id="contactButton"
              style={{background:"#7eb9a3"}}>
              <ContactIcon />
            </Fab>
          </Tooltip>
        </div>
    </div>
  );
}
/*
<div className="row" onLoad={function(){document.title = 'Home'}}>
      <div className="col-6">
        <div className="list-group" id="list-tab" role="tablist">
           <Link className="list-group-item list-group-item-action" to='/Login'> Login </Link>
           <Link className="list-group-item list-group-item-action" to='/Register'> Register </Link>
           <Link className="list-group-item list-group-item-action" to='/AdminLogin'> Admin-Login </Link>
           <Link className="list-group-item list-group-item-action" to='/AdminRegister'> Admin-Register </Link>
           <Link className="list-group-item list-group-item-action" to='/Admin'> Admin-Panel </Link>
           <Link className="list-group-item list-group-item-action" to='/Dashboard'> User-Dashboard </Link>
        </div>
      </div>
    </div>
*/