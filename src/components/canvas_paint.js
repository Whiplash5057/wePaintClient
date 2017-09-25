import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/trendingFlat';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import AllOut from 'material-ui-icons/allOut';
import DraftsIcon from 'material-ui-icons/Drafts';
import HomeIcon from 'material-ui-icons/home';
import OpacityIcon from 'material-ui-icons/blurOn';
import Dialog , { DialogActions, DialogTitle, DialogContent, DialogContentText,} from 'material-ui/Dialog';
import StrokeColor from 'material-ui-icons/album';
import BackgroundColor from 'material-ui-icons/brightnessLow';
import Download from 'material-ui-icons/fileDownload';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
// import deepPurple from 'material-ui/colors/deepPurple';
import Chip from 'material-ui/Chip';
import grey from 'material-ui/colors/grey';


import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MainCanvas from './main_canvas';
import PopupDetailsStrokeRadius from './popup_details_stroke_radius';
import PopupDetailsBackgroundColor from './popup_details_background_color';
import PopupDetailsStrokeColor from './popup_details_stroke_color';
import PopupDetailsGradientColor from './popup_details_gradient_color';
import PopupDetailsStrokeOpacity from './popup_details_stroke_opacity';


// reducers
import { setStrokeRadiusValue, setBackgroundColorValue, setStrokeColorValue, setGradientColorValue, setOpacityValue } from '../actions';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    // marginTop: theme.spacing.unit * 3,
    zIndex: 1,
    overflow: 'hidden',
  },
  purple: {
    color: 'purple',
  },
  chip: {
    margin: theme.spacing.unit,
    cursor: 'pointer',
  },
  svgIcon: {
    color: grey[800],
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: 'purple',
  },
  listTextColor: {
    color: '#000',
  },
  flex: {
    flex: 1,
  },
  iconColor: {
    color: '#000',
  },
  gradientIconColor: {
      color: 'rgba(255, 255, 255, 0.5)',
      background: '-webkit-linear-gradient(lightblue, lightpink, lightgrey)',
      borderRadius: '50%',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    background: '#000',
    zIndex: theme.zIndex.navDrawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    // background: 'lightpink',
    height: '100vh',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    height: 56,
    [theme.breakpoints.up('sm')]: {
      height: 64,
    },
  },
  content: {
    width: '100%',
    flexGrow: 1,
    background: 'black',
    flexWrap: 'wrap',
    overflow: 'scroll',
    // backgroundColor: theme.palette.background.default,
    padding: 24,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class MiniDrawer extends Component {

  componentDidMount() {
    
    // console.log(this.props.user, 'in canvas paint');
    // console.log(this.props.strokeRadius, 'in canvas strokeRadius');
    // console.log(this.props.backgroundColor, 'in canvas backgroundColor');
    // console.log(this.props.strokeColor, 'in canvas strokeColor');
    // console.log(this.props.gradientColor, 'in canvas gradientColor');
    // console.log(this.props.opacity, 'in canvas opacity');
  }



  state = {
    open: false,
    strokeRadius: false,
    backgroundColor: false,
    strokeColor: false,
    gradientColor: false,
    strokeOpacity: false,
    openingDialog: true,

    strokeRadiusValue: this.props.strokeRadius,
    backgroundColorValue: this.props.backgroundColor,
    strokeColorValue: this.props.strokeColor,
    gradientColorValue: this.props.gradientColor,
    strokeOpacityValue: this.props.opacity,
  };

  handleStrokeOpacityOpen = () => {
    this.setState({ strokeOpacity: true });
  };

  handleStrokeOpacityClose = () => {
    this.setState({ strokeOpacity: false });
  };
  handleGradientColorOpen = () => {
    this.setState({ gradientColor: true });
  };

  handleGradientColorClose = () => {
    this.setState({ gradientColor: false });
  };
  handleStrokeColorOpen = () => {
    this.setState({strokeColor: true});
  };

  handleStrokeColorClose = () => {
    this.setState({strokeColor: false});
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({strokeRadius: true});
  };

  handleClose = () => {
    this.setState({strokeRadius: false});
  };

  handleBackgroundOpen = () => {
    this.setState({backgroundColor: true});
  };

  handleBackgroundClose = () => {
    this.setState({backgroundColor: false});
  };
  goHome = () => {
    this.props.history.push('/');
  };
  downloadCanvas = () => {
    let download = document.getElementById("download");
    let image = document.getElementById("mainCanvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
  }

  handleRequestClose = () => {
    this.setState({ openingDialog: false });
  };

  render() {
      
    const { classes, ...other } = this.props;

    return (

      <ReactCSSTransitionGroup
        transitionName= {'SlideIn'}
        transitionAppear={true}
        transitionAppearTimeout={600}
        transitionEnterTimeout={600}
        transitionLeaveTimeout={1600} >

        <div className={classes.root}>

          <Dialog
            className={classes.listTextColor}
            
            modal={false}
            open={this.state.openingDialog}
            onRequestClose={this.handleClose}
          >
          <DialogTitle>WE PAINT</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Welcome to WePaint... A real-time live painting canvas allowing you to share your mind on a canvas and collaborate with people all over the world.
                
                Get Together... Get Creative... 
                <br/>
                <br/>
                {/* <DialogActions> */}
                  <Button onClick={this.handleRequestClose} color='primary' className={classes.purple}> START DRAWING </Button>
                {/* </DialogActions> */}
              </DialogContentText>
            </DialogContent>
          </Dialog>  


          <div className={classes.appFrame}>
            <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="contrast"
                  aria-label="open drawer"
                  onClick={this.handleDrawerOpen}
                  className={classNames(classes.menuButton, this.state.open && classes.hide)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography type="title" color="inherit" className={classes.flex}>
                  WE PAINT
                </Typography>
                <Chip color="contrast" 
                  avatar={<Avatar className={classes.purpleAvatar} >{(this.props.user.length > 1) ? this.props.user.substring(0, 2) : "A" }</Avatar>}
                  label={this.props.user}
                  onClick={this.goHome}
                  className={classes.chip}/>
              </Toolbar>
            </AppBar>
            <Drawer
              type="permanent"
              classes={{
                paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
              }}
              open={this.state.open}
            >
              <div className={classes.drawerInner}>
                <div className={classes.drawerHeader}>
                  <IconButton onClick={this.handleDrawerClose}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                {/* <List className={classes.list}>{mailFolderListItems}</List> */}
                <List>
                  <ListItem button onClick={this.handleOpen}>
                      <ListItemIcon>
                          <AllOut className={classes.iconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Stroke Radius" />
                      <Dialog
                          className={classes.listTextColor}
                          title="Stroke Radius"
                          modal={false}
                          open={this.state.strokeRadius}
                          onRequestClose={this.handleClose}
                          >
                          {/* Stroke Radius */}
                          <PopupDetailsStrokeRadius title="Stroke Radius"/>
                      </Dialog>
                  </ListItem>
                  <ListItem button onClick={this.handleBackgroundOpen}>
                      <ListItemIcon>
                          <BackgroundColor className={classes.iconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Background Color" />
                      <Dialog
                          className={classes.listTextColor}
                          title="Background Color"
                          modal={false}
                          open={this.state.backgroundColor}
                          onRequestClose={this.handleBackgroundClose}
                          >
                          <PopupDetailsBackgroundColor title="Background Color" />
                      </Dialog>
                  </ListItem>
              </List>
              <Divider />
              <List>
                  <ListItem button onClick={this.handleStrokeColorOpen}>
                      <ListItemIcon>
                          <StrokeColor className={classes.iconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Stroke Color" />
                      <Dialog
                          className={classes.listTextColor}
                          title="Stroke Color"
                          modal={false}
                          open={this.state.strokeColor}
                          onRequestClose={this.handleStrokeColorClose}
                          >
                          <PopupDetailsStrokeColor title="Stroke Color" />
                      </Dialog>
                  </ListItem>
                  <ListItem button onClick={this.handleGradientColorOpen}>
                      <ListItemIcon>
                          <StrokeColor className={classes.gradientIconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Gradient Color" />
                      <Dialog
                          className={classes.listTextColor}
                          title="Gradient Color"
                          modal={false}
                          open={this.state.gradientColor}
                          onRequestClose={this.handleGradientColorClose}
                          >
                          <PopupDetailsGradientColor title="Gradient Color" />
                      </Dialog>
                  </ListItem>
                  <ListItem button onClick={this.handleStrokeOpacityOpen}>
                      <ListItemIcon>
                          <OpacityIcon className={classes.iconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Stroke Opacity" />
                      <Dialog
                          className={classes.listTextColor}
                          title="Stroke Opacity"
                          modal={false}
                          open={this.state.strokeOpacity}
                          onRequestClose={this.handleStrokeOpacityClose}
                          >
                          <PopupDetailsStrokeOpacity title="Stroke Opacity" />
                      </Dialog>
                  </ListItem>
              </List>
              <Divider />
              <List>
                  <ListItem button onClick={this.downloadCanvas}>
                    <a id="download" download="image.png">
                      <ListItemIcon>
                          <Download className={classes.iconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Download" />
                    </a>
                  </ListItem>
              </List>
              <Divider />
              <List>
                  <ListItem button onClick={this.goHome}>
                      <ListItemIcon>
                          <HomeIcon className={classes.iconColor}/>
                      </ListItemIcon>
                      <ListItemText primary="Home" />
                  </ListItem>
              </List>
                {/* <List className={classes.list}>{otherMailFolderListItems}</List> */}
              </div>
            </Drawer>
            <main className={classes.content}>
              <MainCanvas />
            </main>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { 
    user: state.user,
    strokeRadius: state.strokeRadius,
    backgroundColor: state.backgroundColor,
    strokeColor: state.strokeColor,
    gradientColor: state.gradientColor,
    opacity: state.opacity };
}

export default withStyles(styles)(
  connect(mapStateToProps, { setStrokeRadiusValue, setBackgroundColorValue, setStrokeColorValue, setGradientColorValue, setOpacityValue })(MiniDrawer)
);
// export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);