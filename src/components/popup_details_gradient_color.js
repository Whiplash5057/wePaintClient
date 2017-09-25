import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Radio from 'material-ui/Radio';
import Switch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';

import Done from 'material-ui-icons/done';


// reducer
import { setGradientColorValue } from '../actions';


const styles = theme => ({
    root: theme.mixins.gutters({
      paddingTop: 16,
      paddingBottom: 16,
      // overflow: 'scroll',
    //   marginTop: theme.spacing.unit * 3,
    }),
    dialogContainer: {
      overflow: 'scroll',
    },
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
      console.log(this.props.gradientColor);
      this.setState({ selectedValue: this.props.gradientColor });
    }
    constructor(props) {
      super(props);

    }
    
    state = {
      selectedValue: this.props.gradientColor,
      backColor: [
        ['#000', '#FF530C'], ['#FF530C', '#E82C0C'], ['#E82C0C', '#FF0005'], ['#FF0005', '#E80C7A'], ['#E80C7A', '#FF0DFF'], ['#FF0DFF', '#012D41'], ['#012D41', '#1BA5B8'],
        ['#1BA5B8', '#fff'], ['#fff', '#DAECF3'], ['#DAECF3', '#FF404E'], ['#FF404E', '#1CA5B8'], ['#1CA5B8', '#00CEAB'], ['#00CEAB', '#00F7CA'], ['#00F7CA', '#FFE53F'], ['#FFE53F', '#FF600B'],
        ['#FF600B', '#FF0000'], ['#FF0000', '#69ADFA'], ['#69ADFA', '#FFADA6'], ['#FFADA6', '#FF4A3A'], ['#FF4A3A', '#FF530D'], ['#FF530D', '#CCED10'], ['#CCED10', '#59660E'], ['#59660E', '#2C3E50'],
        ['#2C3E50', '#E74C3C'], ['#E74C3C', '#3498DB'], ['#3498DB', '#ECF0F1'], ['#ECF0F1', '#2980B9'], ['#2980B9', '#E0A825'], ['#E0A825', '#B0B365'], ['#B0B365', '#82A17B'], ['#82A17B', '#AB3A71'],
      ],
      checkedGradient: true,
    };

    handleGradientChange = name => (event, checked) => {
      this.setState({ [name]: checked });
    };

    handleChange = (colors) => {
        console.log(colors);
        this.setState({ selectedValue: colors });
        this.props.setGradientColorValue(colors, () => {
          console.log('done changing gradient');
        });
    };

    backgroundAvatars() {
        console.log(this.state.selectedValue, 'is the state value');
        const colorItem = this.state.backColor.map((colors, index) => {
            if (colors[0] == this.state.selectedValue[0] && colors[1] == this.state.selectedValue[1]) {
                return (
                    <Avatar style={{
                      background: `-webkit-linear-gradient(left,${colors[0]}, ${colors[1]})`,
                      background: `-o-linear-gradient(left,${colors[0]}, ${colors[1]})`,
                      background: `-moz-linear-gradient(left,${colors[0]}, ${colors[1]})`,
                      background: `linear-gradient(to left,${colors[0]}, ${colors[1]})`,
                       margin: '10', cursor: 'pointer', border: '2px solid black'}} key={index}
                    onClick={() => this.handleChange(colors)}>
                        <Done />
                    </Avatar>
                );
            } else {
                return (
                    <Avatar style={{
                      background: `-webkit-linear-gradient(left,${colors[0]}, ${colors[1]})`,
                      background: `-o-linear-gradient(left,${colors[0]}, ${colors[1]})`,
                      background: `-moz-linear-gradient(left,${colors[0]}, ${colors[1]})`,
                      background: `linear-gradient(to left,${colors[0]}, ${colors[1]})`,
                       margin: '10', cursor: 'pointer', border: '2px solid black'}} key={index}
                    onClick={() => this.handleChange(colors)}/>
                )
            }
        });
        return colorItem;
    }
  
    render(){

      console.log(this.props.gradientColor);

      const classes = this.props.classes;

      return (
        <div className={classes.dialogContainer}>
          <Paper className={classes.root} elevation={4}>
            <Typography type="headline" component="h3">
              {this.props.title}
            </Typography>
            <Typography type="body1" component="p">
                Select a stroke that has a gradient( shades of two colors ) of two colors...
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
      gradientColor: state.gradientColor.colors,
    };
  }

// export default withStyles(styles)(PopupDetailsBackgroundColor);

export default withStyles(styles)(
  connect(mapStateToProps, {setGradientColorValue})(PopupDetailsBackgroundColor)
);