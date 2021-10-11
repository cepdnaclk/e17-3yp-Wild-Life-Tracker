import React from 'react';
import './styles.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    primary:{
      main: '#188459',
    },
    secondary:{
      main: '#e9c437',
    },
  },
});


export default function Template(props) {

/*
* Template for login and register pages
* Usage : <Template left='left_content' right='right_content'/>
*/
  return (
    <ThemeProvider theme={theme}>
      <div className="container-fluid h-100">
        <div className="row min-vh-100 flex-column flex-md-row">

          {/*left side of the template*/}
          <aside className="col-12 col-lg-8 flex-shrink-1" id="left">
            <div className="logo">
              {props.left}
            </div>
          </aside>

          {/*right side of the template*/}
          <main className="col-12 col-lg-4" id="right">
            <div className="form">
              {props.right}
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}