import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';

// reducer
import { setOpacityValue } from '../actions';

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

class PopupDetailsStrokeOpacity extends Component{


    componentDidMount() {
      this.setState({ selectedValue: this.props.opacity });
      
    }

    constructor(props) {
      super(props);
    }
    state = {
      selectedValue: undefined,
    };

    handleChange = event => {
      this.setState({ selectedValue: event.currentTarget.value });
      this.props.setOpacityValue( event.currentTarget.value, () => {
        console.log('done changing opacity');
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
              Select a Stroke Opacity. This will give your stroke a translucent effect and make your canvas a little bit more interesting...( 1- Opaque | 0.1- Highly translucent )
            </Typography>
          </Paper>
          <div className={classes.flex}>
            <FormControlLabel
              control={
                <Radio
                  checked={this.state.selectedValue === "0.1"}
                  onChange={this.handleChange}
                  value="0.1"
                  name="radio button demo"
                  aria-label="0.1"
                />
                }
                  label="0.1"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "0.3"}
                  onChange={this.handleChange}
                  value="0.3"
                  name="radio button demo"
                  aria-label="0.3"
                />
                }
                  label="0.3"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "0.5"}
                  onChange={this.handleChange}
                  value="0.5"
                  name="radio button demo"
                  aria-label="0.5"
                />
                }
                  label="0.5"
              />
              <FormControlLabel
                control={
                <Radio
                  checked={this.state.selectedValue === "0.7"}
                  onChange={this.handleChange}
                  value="0.7"
                  name="radio button demo"
                  aria-label="0.7"
                />
                }
                  label="0.7"
              />
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
              
            
          </div>
        </div>
      );
    }
    
  }

  PopupDetailsStrokeOpacity.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return { 
      opacity: state.opacity,
    };
  }

// export default withStyles(styles)(PopupDetailsStrokeOpacity);

export default withStyles(styles)(
  connect(mapStateToProps, {setOpacityValue})(PopupDetailsStrokeOpacity)
);