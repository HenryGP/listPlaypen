import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/table'
import SimpleCard from './components/card'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component {

  render() {
    return (

      <div>
        <Grid container spacing={24} direction="row" alignItems="center" justify='space-evenly'>
          
          <Grid item sm={8} >
             <Table />
          </Grid >

          <Grid item sm={4}>

            <Grid container spacing={24} direction="column" >
              
              <Grid item sm={8}>
                <SimpleCard title="Teams" selection={["APAC"]} groups={{"APAC":["Sydney", "Delhi"],"EMEA":["Dublin", "Tel Aviv"],"NA":["New York", "Austin", "Palo Alto"]}}/>
              </Grid>

              <Grid item sm={8}>
               <Grid item sm={8}>
                 <SimpleCard title="Skills" selection={["Core", "A&I", "Atlas"]} groups={{"Core":[],"A&I":[],"Atlas":[]}}/>
               </Grid>
              </Grid>
            
            </Grid>
          
          </Grid>
        </Grid >
      </div>
      
    );
  }
}

export default App;