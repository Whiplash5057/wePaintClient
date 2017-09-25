import React, { Component } from 'react';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
const socket = openSocket('https://we-paint-server.herokuapp.com');
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Cached from 'material-ui-icons/Cached';
import Snackbar from 'material-ui/Snackbar';
import Fade from 'material-ui/transitions/Fade';


// card
import Card, { CardContent, CardMedia } from 'material-ui/Card';
// import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
// // import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
// import PlayArrowIcon from 'material-ui-icons/PlayArrow';
// // import SkipNextIcon from 'material-ui-icons/SkipNext';
import TextField from 'material-ui/TextField';


const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
      top: '90%',
      left: '95%',
      backgroundColor: '#702870',
      color: 'white',
    },
    card: {
        display: 'flex',
        color: 'black',
      },
    details: {
        display: 'flex',
        flexDirection: 'row',
    },
    content: {
        flex: '2 0 auto',
    },
    cover: {
        width: 151,
        height: 180,
      },
    textField: {
        // marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
      },
  });


class MainCanvas extends Component {

    handleClick = () => {
    // console.log(parseInt(this.props.strokeRadius), 'is working');
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    handleRequestBroadcastClose = () => {
        this.setState({ msgOpen: false });
    };

    componentDidMount() {
        this.initCanvas();
        
    }
    constructor(props) {
        super(props);

        this.state = {
            gradientColor: this.props.gradientColor,
            open: false,
            msgOpen: false,
            message: null,
            socketSentCount: 0,
            messageNew: '',
            messageBroad: '',
            userBroadName: '',
            userCount: 0
        }
      }

    clearCanvas(event) {
        // eslint-disable-next-line no-console
        // console.log('lol');
        let canvas = document.getElementById('mainCanvas');
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    handleChange = name => event => {
        // event.preventDefault();

        this.setState({
            messageNew: event.target.value,
        });
      };


    onSubmit(event) {
        event.preventDefault();
        this.setState({
            messageNew: "",
        });
        // console.log(this.props.user, 'username');
        socket.emit('sendBroadcastMsg', {
            userName: this.props.user,
            userMessage: this.state.messageNew,
        });
    }


    render() {

        const classes = this.props.classes;
        
        let divStyle = {
            backgroundColor: this.props.backgroundColor,
          };

    


        return (
            <div
                className="canvasContainer">

                <div className="uppermostZ">
                    <Card className={classes.card}>
                        
                    <CardMedia
                        className={classes.cover}
                        image="https://devdesk.herokuapp.com/images/wePaintBack.png"
                        title="Live from space album cover"
                    />

                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography type="headline">Broadcast a message</Typography>
                                <Typography type="subheading" color="secondary">
                                { this.props.user }
                                </Typography>
                                <Typography type="caption" color="secondary">
                                    { this.state.userCount } users live!!!
                                </Typography>
                                <form className={classes.container} 
                                noValidate 
                                autoComplete="off"
                                onSubmit={this.onSubmit.bind(this)}>
                                    <TextField
                                    id="name"
                                    label="Message"
                                    className={classes.textField}
                                    value={this.state.messageNew}
                                    onChange={this.handleChange('name')}
                                    margin="normal"
                                    />
                                 </form>
                            </CardContent>

                        </div>
                        
                    </Card>
                </div>

                <canvas id="mainCanvas" style={ divStyle }></canvas>
                <Snackbar
                    anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    
                    autoHideDuration={4000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Everybody... Please Welcome <span className="usrNm">{ this.state.message }</span> </span>}
                />
                <Snackbar
                    anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                    open={this.state.msgOpen}
                    onRequestClose={this.handleRequestBroadcastClose}
                    
                    autoHideDuration={3000}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id"> <span className="usrNm">{ this.state.userBroadName }:</span>  { this.state.messageBroad } </span>}
                />
                <Button fab onClick={this.clearCanvas} aria-label="add" className={classes.button}>
                    <Cached />
                </Button>


                

                
            </div>
        )
    }

    

    initCanvas() {

        // console.log(this.state.socketSentCount);
        if(this.state.socketSentCount < 1) {
            socket.emit('welcomeMsg', {
                
                socketName: this.props.user,
            });
        }
        
        // console.log(this.state.socketSentCount);
        this.setState({socketSentCount: 1})


        
        socket.on('welcomeMsg', (data) => {
            // console.log(data, "this should come");
            this.setState({ open: true });
            this.setState({message: data.socketName});
            this.setState({userCount: data.currentLive});
            // document.getElementById('#message-id').innerHTML = this.props.user;
        });

        socket.on('broadCMsg', (data) => {
            this.setState({ msgOpen: true });
            this.setState({messageBroad: data.userMessage});
            this.setState({userBroadName: data.userName});

            // document.getElementById('#message-id').innerHTML = this.props.user;
        });


        // ------ sent to client

        // console.log(this.props.strokeRadius, ' inside initCanvas');
        let canvas = document.getElementById('mainCanvas');
        let context = canvas.getContext("2d");
        
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        window.onresize = () => {
            context.save();
            console.log('resizing');
            
            context.restore();
        }
        
        
        
        let radius = this.props.strokeRadius;
        let dragging = false;
        
        let current = {};
        
        
        let putPoint = (e) => {
            
            let radius = this.props.strokeRadius;
            let globalAlpha = this.props.opacity;
            let newGrad = this.props.gradientColor.colors;
            let permitGrad = this.props.gradientColor.enableGradient;
            let xPt = e.clientX;
            let yPt = e.clientY;
            let fillStyle = this.props.strokeColor;
            let strokeStyle = this.props.strokeColor;
            let backgroundColor = this.props.backgroundColor;


            drawTheChods(radius, current.x, current.y, xPt, yPt, strokeStyle, fillStyle, permitGrad, newGrad, globalAlpha, backgroundColor);
        }


        let drawTheChods = (radius, x0, y0, xPt, yPt, strokeStyle, fillStyle, permitGrad, newGrad, globalAlpha, backgroundColor) => {

                context.lineWidth = radius*2;
                context.fillStyle = fillStyle;
                context.strokeStyle = strokeStyle;
                context.globalAlpha= globalAlpha;
                // console.log('test');

                if(permitGrad){
                
                    let grd=context.createLinearGradient(0,0,canvas.width,canvas.height);
                    grd.addColorStop(0,newGrad[0]);
                    grd.addColorStop(1,newGrad[1]);
                    context.strokeStyle = grd;
                    context.fillStyle = grd;
                }

                if(dragging) {

                    // context.moveTo(xPt, yPt);
                    // context.lineTo(xPt, yPt);
                    // context.stroke();
                    // context.beginPath();
                    // context.arc(xPt, yPt, radius, 0, Math.PI*2);
                    // context.fill();
                    // context.beginPath();
                    // context.moveTo(xPt, yPt);
                    // context.closePath();

                    context.beginPath();
                    context.moveTo(x0, y0);
                    context.lineTo(xPt, yPt);
                    // context.arc(x0, y0, radius, 0, Math.PI*2);
                    context.stroke();
                    context.closePath();

                    // console.log(xPt, 'xPt');
                    socket.emit('drawing', {
                        x0: x0,
                        y0: y0,
                        xPt: xPt,
                        yPt: yPt,
                        strokeRadius: radius,
                        backgroundColor: backgroundColor,
                        strokeColor: fillStyle,
                        gradientColor: {
                            colors: newGrad,
                            enableGradient: permitGrad
                            },
                        globalAlpha: globalAlpha,
                    });

                    current.x = xPt;
                    current.y = yPt;
                    
                }
        }
        
        let engage = (e) => {
            dragging = true;
            // putPoint(e);
            current.x = e.clientX;
            current.y = e.clientY;
        }
        
        let disengage = () => {
            dragging = false;
            context.beginPath();
        }
        
        canvas.addEventListener('mousedown', engage);
        canvas.addEventListener('mouseup', disengage);
        canvas.addEventListener('mousemove', putPoint);
        


        // ------- received by client
        socket.on('drawing', (data) => {
            let {x0} = data;
            let {y0} = data;
            let {xPt} = data;
            let {yPt} = data;
            let {backgroundColor} = data;
            let {strokeRadius} = data;
            let {strokeColor} = data;
            let {gradientColor} = data;
            let {globalAlpha} = data;
            // console.log(data, 'is the data');

            context.lineWidth = strokeRadius*2;
            context.fillStyle = strokeColor;
            context.strokeStyle = strokeColor;
            context.globalAlpha= globalAlpha;
            // console.log('test');

            if(gradientColor.enableGradient){
            
                let grd=context.createLinearGradient(0,0,canvas.width,canvas.height);
                grd.addColorStop(0,gradientColor.colors[0]);
                grd.addColorStop(1,gradientColor.colors[1]);
                context.strokeStyle = grd;
                context.fillStyle = grd;
            }

            context.beginPath();
            context.moveTo(x0, y0);
            context.lineTo(xPt, yPt);
            // context.arc(x0, y0, radius, 0, Math.PI*2);
            context.stroke();
            context.closePath();

            // canvas.style.backgroundColor = backgroundColor;

        });


        

    }
}

MainCanvas.propTypes = {
    classes: PropTypes.object.isRequired,
  };


function mapStateToProps(state) {
    return {
        user: state.user,
        strokeRadius: state.strokeRadius,
        backgroundColor: state.backgroundColor,
        strokeColor: state.strokeColor,
        gradientColor: state.gradientColor,
        opacity: state.opacity
    };
  }



// export default MainCanvas;
// export default connect(mapStateToProps)(MainCanvas);

export default withStyles(styles)(
  connect(mapStateToProps)(MainCanvas)
);