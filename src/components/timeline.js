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
    var { tz, value } = props;
    this.state = { value: value, tz: tz };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, onTZButtonClick } = this.props;

    return (
      <center>
        <Slider
          style={{
            padding: 35,
            float: "centered",
            height: "50%",
            width: "80%"
          }}
          value={this.props.value}
          min={0}
          max={24}
          step={0.1}
          onChange={this.handleChange}
        />
        <div style={{ float: "right", margin: 3 }}>
          <Button
            className={classes.button}
            variant="fab"
            color="primary"
            aria-label="Add"
          >
            {this.props.value.toString().replace(".", ":")}
          </Button>
          <Button
            className={classes.button}
            variant="fab"
            color="inherit"
            aria-label="Add"
          >
            {this.props.value < 12 || this.props.value === 24 ? "AM" : "PM"}
          </Button>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            aria-label="Add"
            onClick={onTZButtonClick}
          >
            {this.props.tz}
          </Button>
        </div>
      </center>
    );
  }
}

export default withStyles(styles)(SimpleSlider);
