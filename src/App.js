import React, { Component } from 'react';
import './App.css';
import Table from './components/table'
import SimpleCard from './components/card'
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

let counter = 0;
//name, loadScore, ticketCount, location, type, fts, ooo
function createData(name, loadScore, ticketCount, location, type, fts, ooo) {
  counter += 1;
  return { id: counter, name, loadScore, ticketCount, location, type, fts, ooo };
}

var filterTeamSelection = [
  "APAC"
]

var filterTeamGroups = {
  "APAC":["Sydney", "Delhi"],
  "EMEA":["Dublin", "Tel Aviv"],
  "NA":["New York", "Austin", "Palo Alto"]
};

var tableData = [
  createData('Guy1', 400, 8, "NA", "Core",1,0),
  createData('Guy2', 200, 6, "EMEA", "A&I",1,1),
  createData('Guy3', 100, 4, "APAC", "Core",1,1),
  createData('Guy4', 50, 3, "EMEA", "Core",1,0),
  createData('Guy5', 500, 10, "NA", "A&I",1,0),
  createData('Guy6', 300, 7, "APAC", "Core",1,1),
  createData('Guy7', 150, 5, "NA", "Atlas",1,1),
]

class App extends Component {

  constructor(props){
    super(props);
    var {filterTeamSelection, filterTeamGroups, tableData} = props;
    this.state = {filterTeamSelection:filterTeamSelection, filterTeamGroups: filterTeamGroups, tableData:tableData};
    console.log(this.state);
  }

  render() {
    return (

      <div>
        <Grid container spacing={24} direction="row" alignItems="center" justify='space-evenly'>
          
          <Grid item sm={9} >
             <Table data={tableData} />
          </Grid >

          <Grid item sm={3}>

            <Grid container spacing={24} direction="column" justify='flex-start'>
              
              <Grid item sm={8}>
                <SimpleCard title="Teams" selection={filterTeamSelection} groups={filterTeamGroups}/>
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