import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

//function checkedBox(team){
//    console.log(team);
//    groups[team].map((element)=>{console.log(element);})
//};

class SimpleCard extends Component {
  constructor(props){
    super(props);
    const { classes, groups, selection } = props;
    this.teams = [];
    for (var team in groups){
      this.teams.push(
          <FormControlLabel
              control={
                  <Checkbox
                      checked={team in selection? true: false}
                      //onChange={checkedBox(team)}
                      //value="checkedAPAC"
                      color="primary"
                  />
              }
              key={team}
              label={team}
          />
      )
    }  
  }



  render(){
    const { classes } = this.props;

    return (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary">
              Team
            </Typography>
    
            <Grid container direction="row" alignItems="center" justify='space-evenly'>
                <Grid item sm={6} >
                    <FormGroup column="true">
                        {this.teams}
                    </FormGroup>
                </Grid >
              
                <Grid item sm={6} >
                    <p>HELLO!</p>
                </Grid >
    
            </Grid>
            
          </CardContent>
        </Card>
      );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);