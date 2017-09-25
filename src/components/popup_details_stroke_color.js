import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import Avatar from 'material-ui/Avatar';

import Done from 'material-ui-icons/done';

// reducer
import { setStrokeColorValue, disableGradientColorValue } from '../actions';

const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
    //   marginTop: theme.spacing.unit * 3,
    }),
    avatar: {
        margin: 10,
      },
    flex: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });

class PopupDetailsStrokeColor extends Component{

    componentDidMount() {
      this.setState({ selectedValue: this.props.strokeColor });
    }

    constructor(props) {
      super(props);

    }
    
    state = {
      selectedValue: undefined,
      backColor: [
          '#000', '#FF530C', '#E82C0C', '#FF0005', '#E80C7A', '#FF0DFF', '#012D41', '#1BA5B8',
          '#fff', '#DAECF3', '#FF404E', '#1CA5B8', '#00CEAB', '#00F7CA', '#FFE53F', '#FF600B',
          '#FF0000', '#69ADFA', '#FFADA6', '#FF4A3A', '#FF530D', '#CCED10', '#59660E', '#2C3E50',
          '#E74C3C', '#3498DB', '#ECF0F1', '#2980B9', '#E0A825', '#B0B365', '#82A17B', '#AB3A71'
      ]
    };

    handleChange = color => {
      this.setState({ selectedValue: color });
      this.props.disableGradientColorValue('dummy',()=>{
        console.log('done disabling gradient color');
      });

      this.props.setStrokeColorValue(color, () => {
        console.log('done changing stroke color');
      });
    };

    backgroundAvatars() {
        const colorItem = this.state.backColor.map((color, index) => {
            if (color == this.state.selectedValue) {
                return (
                    <Avatar style={{backgroundColor: color, margin: '10', cursor: 'pointer', border: '2px solid black'}} key={index}
                    onClick={() => this.handleChange(color)}>
                        <Done />
                    </Avatar>
                );
            } else {
                return (
                    <Avatar style={{backgroundColor: color, margin: '10', cursor: 'pointer', border: '2px solid black'}} key={index}
                    onClick={() => this.handleChange(color)}/>
                )
            }
        });
        return colorItem;
    }
  
    render(){
      const classes = this.props.classes;

      return (
        <div>
          <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h3">
              {this.props.title}
            </Typography>
            <Typography type="body1" component="p">
              Select a stroke color...
            </Typography>
          </Paper>
          <div className={classes.flex}>
            
            { this.backgroundAvatars() }
          </div>
        </div>
      );
    }
    
  }

  PopupDetailsStrokeColor.propTypes = {
    classes: PropTypes.object.isRequired,
  };


// export default withStyles(styles)(PopupDetailsStrokeColor);
function mapStateToProps(state) {
  return { 
    strokeColor: state.strokeColor,
  };
}
export default withStyles(styles)(
  connect(mapStateToProps, {setStrokeColorValue, disableGradientColorValue})(PopupDetailsStrokeColor)
);