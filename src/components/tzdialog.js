import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

/*'Sydney (UTC+10)',
  'Delhi (UTC+5:30)',
  'Tel Aviv (UTC+3)',
  'CET (UTC+1)',
  'UTC',
  'ET (UTC-4)',
  'CT (UTC-6)',
  'MT (UTC-7)',
  'PT (UTC-8)', */
const options = [
  "Sydney",
  "Delhi",
  "Tel Aviv",
  "Cont. Europe",
  "Dublin",
  "New York",
  "Austin",
  "Denver",
  "Palo Alto"
];

class ConfirmationDialogRaw extends Component {
  constructor(props) {
    super(props);
    var { value, open } = props;
    this.state = {
      value: value,
      open: open
    };
  }

  // TODO
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleEntering = () => {
    this.radioGroupRef.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.state.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Timezone</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={ref => {
              this.radioGroupRef = ref;
            }}
            aria-label="Ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string
};

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  paper: {
    width: "80%",
    maxHeight: 435
  }
});

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    var { open, value } = props;
    console.log(value);
    this.state = { open: open, value: value };
  }

  render() {
    const { classes, open, handleClose } = this.props;
    return (
      <ConfirmationDialogRaw
        classes={{
          paper: classes.paper
        }}
        open={open}
        onClose={handleClose}
        value={this.state.value}
      />
    );
  }
}

ConfirmationDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ConfirmationDialog);
