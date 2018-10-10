import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class SimpleCard extends Component {
  constructor(props) {
    super(props);
  }

  checkedBox = name => event => {
    this.props.onBoxCheck(name, event, this.props.groupA);
  };

  render() {
    const { classes } = this.props;

    var listA = this.props.groupA.map(element => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.selection.includes(element)}
              onChange={this.checkedBox({ element })}
              color="primary"
              value={element}
            />
          }
          key={element}
          label={element}
        />
      );
    });

    var listB = this.props.groupB.map(element => {
      return (
        <FormControlLabel
          control={
            <Checkbox
              checked={this.props.selection.includes(element)}
              onChange={this.checkedBox({ element })}
              color="primary"
              value={element}
            />
          }
          key={element}
          label={element}
        />
      );
    });

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textPrimary">
            {this.props.title}
          </Typography>

          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-evenly"
          >
            <Grid item sm={6}>
              <FormGroup column="true">{listA}</FormGroup>
            </Grid>

            <Grid item sm={6}>
              <FormGroup column="true">{listB}</FormGroup>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
