import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/lab/Slider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class SimpleSlider extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 12 };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  stringify(value) {
    var append;
    if (value - Math.floor(value) === 0.5) {
      append = ":30";
    } else {
      append = ":00";
    }
    var roundingValue = value === 12 ? value : Math.floor(value) % 12;
    roundingValue = value === 12.5 ? 12 : roundingValue;
    return roundingValue + append;
  }

  render() {
    const { value } = this.state;
    const { classes } = this.props;

    return (
      <center>
        <Slider
          style={{
            padding: 35,
            float: "centered",
            height: "50%",
            width: "80%"
          }}
          value={value}
          min={0}
          max={24}
          step={0.5}
          onChange={this.handleChange}
        />
        <div style={{ float: "right", margin: 3 }}>
          <Button
            className={classes.button}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            {this.stringify(value)}
          </Button>
          <Button
            className={classes.button}
            variant="fab"
            color="inherit"
            aria-label="Add"
          >
            {value < 12 || value === 24 ? "AM" : "PM"}
          </Button>
        </div>
      </center>
    );
  }
}

export default withStyles(styles)(SimpleSlider);