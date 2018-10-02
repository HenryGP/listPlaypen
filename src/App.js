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
function createData(name, loadScore, ticketCount, location, type, fts, ooo, visible) {
  counter += 1;
  return { id: counter, name, loadScore, ticketCount, location, type, fts, ooo, visible };
};

const filterTeamSelection = [
  "APAC"
];

const filterTeamGroups = {
  "APAC":["Sydney", "Delhi"],
  "EMEA":["Dublin", "Tel Aviv"],
  "NA":["New York", "Austin", "Palo Alto"]
};

const tableData = [
  createData('Guy1', 400, 8, "NA", "Core",1,0,true),
  createData('Guy2', 200, 6, "EMEA", "A&I",1,1,true),
  createData('Guy3', 100, 4, "APAC", "Core",1,1,true),
  createData('Guy4', 50, 3, "EMEA", "Core",1,0,true),
  createData('Guy5', 500, 10, "NA", "A&I",1,0,true),
  createData('Guy6', 300, 7, "APAC", "Core",1,1,true),
  createData('Guy7', 150, 5, "NA", "Atlas",1,1,true),
];

function isInArray(value, array) {
  return array.indexOf(value) > -1;
};

function removeElement(value, array){
  var index = array.indexOf(value);
  if (index > -1) {
      array.splice(index, 1);
  }
};

class App extends Component {

  constructor(props){
    super(props);

    var geoRegions = [];
    for (var element in filterTeamGroups){
        geoRegions.push(element);
    };

    var offices = [];
    filterTeamSelection.map((parent) =>{
      filterTeamGroups[parent].map((child) => {
            offices.push(child);
        });
    });

    this.state = {
      filterTeamGroups: filterTeamGroups, geoRegions: geoRegions, 
      offices: offices, filterTeamSelection: filterTeamSelection,
      tableData: tableData
    };
    this.checkedBox=this.checkedBox.bind(this);
  }

  checkedBox(name, event, groupA){
    var tempFilterTeamSelection = this.state.filterTeamSelection;
    var tempOffices = this.state.offices;
    if(event.target.checked && !isInArray(name.element, tempFilterTeamSelection)){
        tempFilterTeamSelection.push(name.element);
        if(isInArray(name.element, groupA)){
            this.state.filterTeamGroups[name.element].map((element)=>{
                if(!isInArray(element, tempOffices)){
                  tempOffices.push(element);
                }
            });
        }
    } 
    else if (!event.target.checked && isInArray(name.element, tempOffices)){
        removeElement(name.element, tempFilterTeamSelection);
    }
    else if (!event.target.checked && isInArray(name.element, tempFilterTeamSelection)){
        removeElement(name.element, tempFilterTeamSelection);
        if(isInArray(name.element, groupA)){
            this.state.filterTeamGroups[name.element].map((element)=>{
                removeElement(element, tempFilterTeamSelection);
                removeElement(element, tempOffices);
            });
        }
    }
    this.setState({filterTeamSelection: tempFilterTeamSelection, offices: tempOffices});
  };

  render() {
    var filteredData = this.state.tableData.map((element)=>{
      element.visible = this.state.filterTeamSelection.indexOf(element.location)>=0 ? true : false;
      return element;
    });

    return (

      <div>
        <Grid container spacing={24} direction="row" alignItems="center" justify='space-evenly'>
          
          <Grid item sm={9} >
             <Table data={filteredData} filters={this.state.filterTeamSelection}/>
          </Grid >

          <Grid item sm={3}>

            <Grid container spacing={24} direction="column" justify='flex-start'>
              
              <Grid item sm={8}>
                <SimpleCard title="Teams" 
                groupA={this.state.geoRegions} groupB={this.state.offices} groups={this.state.filterTeamGroups}
                selection={this.state.filterTeamSelection} onBoxCheck={this.checkedBox}
                />
              </Grid>

              <Grid item sm={8}>
               { /*
               <Grid item sm={8}>
                 <SimpleCard title="Skills" selection={["Core", "A&I", "Atlas"]} groups={{"Core":[],"A&I":[],"Atlas":[]}}/>
               </Grid>
               */}
              </Grid>
            
            </Grid>
          
          </Grid>
        </Grid >
      </div>
      
    );
  }
}

export default App;