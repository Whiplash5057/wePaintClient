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
import { setBackgroundColorValue } from '../actions';


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

class PopupDetailsBackgroundColor extends Component{
    componentDidMount() {
      this.setState({ selectedValue: this.props.backgroundColor });
    }
    constructor(props) {
      super(props);
    }
    
    state = {
      selectedValue: this.props.backgroundColor,
      backColor: [
          '#000', '#FF530C', '#E82C0C', '#FF0005', '#E80C7A', '#FF0DFF', '#012D41', '#1BA5B8',
          '#fff', '#DAECF3', '#FF404E', '#1CA5B8', '#00CEAB', '#00F7CA', '#FFE53F', '#FF600B',
          '#FF0000', '#69ADFA', '#FFADA6', '#FF4A3A', '#FF530D', '#CCED10', '#59660E', '#2C3E50',
          '#E74C3C', '#3498DB', '#ECF0F1', '#2980B9', '#E0A825', '#B0B365', '#82A17B', '#AB3A71'
      ]
    };

    handleChange = color => {

        this.setState({ selectedValue: color });
        this.props.setBackgroundColorValue(color, () => {
          console.log('done changing background');
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
              Select a background for better canvas visibility. This color won't be saved in your download file...
            </Typography>
          </Paper>
          <div className={classes.flex}>
            
            { this.backgroundAvatars() }
          </div>
        </div>
      );
    }
    
  }

  PopupDetailsBackgroundColor.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  function mapStateToProps(state) {
    return { 
      backgroundColor: state.backgroundColor,
    };
  }

export default withStyles(styles)(
  connect(mapStateToProps, {setBackgroundColorValue})(PopupDetailsBackgroundColor)
);