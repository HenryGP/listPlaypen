import React, { Component } from "react";
import "./App.css";
import Table from "./components/table";
import SimpleCard from "./components/card";
import SimpleSlider from "./components/timeline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  icon: {
    color: "white"
  }
};

let counter = 0;
//name, loadScore, ticketCount, location, type, fts, ooo
function createData(
  name,
  loadScore,
  ticketCount,
  location,
  type,
  fts,
  ooo,
  visible
) {
  counter += 1;
  return {
    id: counter,
    name,
    loadScore,
    ticketCount,
    location,
    type,
    fts,
    ooo,
    visible
  };
}

const filterSkills = { Core: ["Queries"], "A&I": ["OM"], Atlas: ["Billing"] };

const filterSkillSelection = ["Core", "A&I", "Atlas"];

const filterTeamSelection = ["APAC"];

const filterTeamGroups = {
  APAC: ["Sydney", "Delhi"],
  EMEA: ["Dublin", "Tel Aviv"],
  NA: ["New York", "Austin", "Palo Alto"]
};

const tableData = [
  createData("Guy1", 400, 8, "NA", "Core", 1, 0, true),
  createData("Guy2", 200, 6, "EMEA", "A&I", 1, 1, true),
  createData("Guy3", 100, 4, "APAC", "Core", 1, 1, true),
  createData("Guy4", 50, 3, "EMEA", "Core", 1, 0, true),
  createData("Guy5", 500, 10, "NA", "A&I", 1, 0, true),
  createData("Guy6", 300, 7, "APAC", "Core", 1, 1, true),
  createData("Guy7", 150, 5, "NA", "Atlas", 1, 1, true)
];

function removeElement(value, array) {
  var index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    const { classes } = props;

    var geoRegions = [];
    for (var element in filterTeamGroups) {
      geoRegions.push(element);
    }

    var offices = [];
    filterTeamSelection.forEach(parent => {
      filterTeamGroups[parent].forEach(child => {
        offices.push(child);
      });
    });

    var skills = [];
    for (element in filterSkills) {
      skills.push(element);
    }

    var tags = [];
    filterSkillSelection.forEach(parent => {
      filterSkills[parent].forEach(child => {
        tags.push(child);
      });
    });

    this.state = {
      classes: classes,
      filterTeamGroups: filterTeamGroups,
      geoRegions: geoRegions,
      offices: offices,
      filterTeamSelection: filterTeamSelection,
      tableData: tableData,
      skills: skills,
      tags: tags,
      filterSkillSelection: filterSkillSelection,
      filterSkills: filterSkills
    };

    this.checkBox = this.checkBox.bind(this);
  }

  checkBox(name, event, groupA) {
    var filterSelector1 = false;
    var selectionA, selectionB, filter;
    if (this.state.filterTeamGroups[groupA[0]]) {
      filterSelector1 = true;
      filter = this.state.filterTeamGroups;
      selectionA = this.state.filterTeamSelection;
      selectionB = this.state.offices;
    } else {
      filter = this.state.filterSkills;
      selectionA = this.state.filterSkillSelection;
      selectionB = this.state.tags;
    }

    if (event.target.checked && !selectionA.includes(name.element)) {
      selectionA.push(name.element);
      if (groupA.includes(name.element)) {
        filter[name.element].forEach(element => {
          if (!selectionB.includes(element.name)) {
            selectionB.push(element);
          }
        });
      }
    } else if (!event.target.checked && selectionB.includes(name.element)) {
      removeElement(name.element, selectionA);
    } else if (!event.target.checked && selectionA.includes(name.element)) {
      removeElement(name.element, selectionA);
      if (groupA.includes(name.element)) {
        filter[name.element].forEach(element => {
          removeElement(element, selectionA);
          removeElement(element, selectionB);
        });
      }
    }

    if (filterSelector1) {
      this.setState({ filterTeamSelection: selectionA, offices: selectionB });
    } else {
      this.setState({ filterSkillSelection: selectionA, tags: selectionB });
    }
  }

  render() {
    const { classes } = this.props;

    var filteredData = this.state.tableData.map(element => {
      var visibleTeam =
        this.state.filterTeamSelection.indexOf(element.location) >= 0
          ? true
          : false;
      var visibleSkill =
        this.state.filterSkillSelection.indexOf(element.type) >= 0
          ? true
          : false;
      element.visible = visibleTeam && visibleSkill;
      return element;
    });

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Dynamic list playpen
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid
          container
          spacing={24}
          className={classes.paper}
          alignContent="center"
          justify="space-around"
        >
          <Grid item xs={12}>
            <Card className={classes.paper}>
              <SimpleSlider />
            </Card>
          </Grid>

          <Grid item sm={12}>
            <Grid container spacing={16} direction="row" alignContent="center">
              <Grid item sm={9}>
                <Table
                  data={filteredData}
                  filters={this.state.filterTeamSelection}
                />
              </Grid>

              <Grid item sm={3}>
                <Grid container spacing={24} direction="column">
                  <Grid item xs={12} sm={6}>
                    <SimpleCard
                      title="Teams"
                      groupA={this.state.geoRegions}
                      groupB={this.state.offices}
                      groups={this.state.filterTeamGroups}
                      selection={this.state.filterTeamSelection}
                      onBoxCheck={this.checkBox}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <SimpleCard
                      title="Skills"
                      groupA={this.state.skills}
                      groupB={this.state.tags}
                      groups={this.state.filterSkills}
                      selection={this.state.filterSkillSelection}
                      onBoxCheck={this.checkBox}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(App);
