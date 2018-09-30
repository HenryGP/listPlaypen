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

class SimpleCard extends Component {
  constructor(props){
    super(props);
    const { groups, selection } = props;
    
    var groupA = [];
    for (var element in groups){
        groupA.push(element);
    };

    var groupB = [];
    selection.map((parent) =>{
        groups[parent].map((child) => {
            groupB.push(child);
        });
    });
    
    this.state = {groups: groups, groupA: groupA, groupB: groupB, selection: selection};

    //console.log(this.state);
  }

  createGroupA(){
    var selection1=[];
    return selection1;
  }

  checkedBox= name => event => {
    var tempSelection = this.state.selection;
    var tempGroupB = this.state.groupB;
    if(event.target.checked && !this.isInArray(name.element, this.state.selection)){
        tempSelection.push(name.element);
        if(this.isInArray(name.element, this.state.groupA)){
            this.state.groups[name.element].map((element)=>{
                if(!this.isInArray(element, tempGroupB)){
                    tempGroupB.push(element);
                }
            });
        }
    } 
    else if (!event.target.checked && this.isInArray(name.element, this.state.groupB)){
        this.removeElement(name.element, tempSelection);
    }
    else if (!event.target.checked && this.isInArray(name.element, this.state.selection)){
        this.removeElement(name.element, tempSelection);
        if(this.isInArray(name.element, this.state.groupA)){
            this.state.groups[name.element].map((element)=>{
                this.removeElement(element, tempSelection);
                this.removeElement(element, tempGroupB);
            });
        }
    }
    this.setState({selection: tempSelection, groupB: tempGroupB});    
  };

  removeElement(value, array){
    var index = array.indexOf(value);
    if (index > -1) {
        array.splice(index, 1);
    }
  };

  isInArray(value, array) {
    return array.indexOf(value) > -1;
  };

  render(){
    const { classes } = this.props;
    
    var listA =[];
    this.state.groupA.map((element)=>{
        listA.push(
            <FormControlLabel
                control={
                    <Checkbox
                        checked={this.isInArray(element, this.state.selection)}
                        onChange={this.checkedBox({element})}
                        color="primary"
                        value={element}
                    />
                }
                key={element}
                label={element}
            />
        )
    });

    var listB = [];
    this.state.groupB.map((element)=>{
        listB.push(
            <FormControlLabel
                  control={
                      <Checkbox
                          checked={this.isInArray(element, this.state.selection)}
                          onChange={this.checkedBox({element})}
                          color="primary"
                          value={element}
                      />
                  }
                  key={element}
                  label={element}
              />
        )
    });

    return (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textPrimary">
              {this.props.title}
            </Typography>
    
            <Grid container direction="row" alignItems="center" justify='space-evenly'>
                <Grid item sm={6} >
                    <FormGroup column="true">
                        {listA}
                    </FormGroup>
                </Grid >
              
                <Grid item sm={6} >
                    <FormGroup column="true">
                    {listB}
                    </FormGroup>
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