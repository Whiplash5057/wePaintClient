import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

// reducer
import { setStrokeRadiusValue } from '../actions';


const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    //   marginTop: theme.spacing.unit * 3,
    }),
    flex: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });

class PopupDetailsStrokeRadius extends Component{

    componentDidMount() {
      this.setState({ selectedValue: this.props.strokeRadius });
      
    }

    constructor(props) {
      super(props);
    }
    state = {
      selectedValue: undefined,
    };

    handleChange = event => {
      this.setState({ selectedValue: event.currentTarget.value });
      this.props.setStrokeRadiusValue( event.currentTarget.value, () => {
        console.log('done changing stroke Radius');
      });
    };
  
    render(){
      const classes = this.props.classes;

      return (
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h3">
              {this.props.title}
            </Typography>
            <Typography type="body1" component="p">
              Select a Stroke Radius. The finer the stroke, the more precise the end result...
            </Typography>
          </Paper>
          <div className={classes.flex}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedValue === "1"}
                  onChange={this.handleChange}
                  value="1"
                  name="radio button demo"
                  aria-label="1"
                />
                }
                  label="1"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "3"}
                  onChange={this.handleChange}
                  value="3"
                  name="radio button demo"
                  aria-label="3"
                />
                }
                  label="3"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "5"}
                  onChange={this.handleChange}
                  value="5"
                  name="radio button demo"
                  aria-label="5"
                />
                }
                  label="5"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "10"}
                  onChange={this.handleChange}
                  value="10"
                  name="radio button demo"
                  aria-label="10"
                />
                }
                  label="10"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "15"}
                  onChange={this.handleChange}
                  value="15"
                  name="radio button demo"
                  aria-label="15"
                />
                }
                  label="15"
              />
            
          </div>
        </div>
      );
    }
    
  }

  PopupDetailsStrokeRadius.propTypes = {
    classes: PropTypes.object.isRequired,
  };


  function mapStateToProps(state) {
    return { 
      strokeRadius: state.strokeRadius,
    };
  }
// export default withStyles(styles)(PopupDetailsStrokeRadius);

export default withStyles(styles)(
  connect(mapStateToProps, {setStrokeRadiusValue})(PopupDetailsStrokeRadius)
);