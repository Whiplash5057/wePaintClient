import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parallax from 'parallax-js' // Now published on NPM
import { Link } from 'react-router-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { setUsername } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { term: props.user };
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount() {
    this.initiateCanvas();
    var scene = document.getElementById('js-scene');
    var parallax = new Parallax(scene);
    // console.log(this.props.location.pathname);
   
  }

  onInputChange(event) {
    // console.log(event.target.value);
    this.setState({ term: event.target.value.toUpperCase() });
  }

  onSubmit(event) {
    event.preventDefault()
    // console.log(this.state.term, 'in app');
    if(this.state.term.length > 0) {
      this.props.setUsername(this.state.term, () => {
        this.props.history.push('/paint');
      });
    }
   
      
      // this.props.history.push('/paint');
  }

  render() {
    return (
      <ReactCSSTransitionGroup
      transitionName= {'SlideIn'}
      transitionAppear={true}
      transitionAppearTimeout={600}
      transitionEnterTimeout={600}
      transitionLeaveTimeout={1600} >
        <div className="splashScreenContainer">
          <canvas id="canvasSplashScreen"></canvas>
          <div className="parallax_items">
            <div className="items__inner" id="js-scene">
              <div className="items__layer layer" data-depth="0.85"><div className="items__item" ></div></div>
              <div className="items__layer layer" data-depth="0.70"><div className="items__item" ></div></div>
              <div className="items__layer layer" data-depth="0.65"><div className="items__item" ></div></div>
              <div className="items__layer layer" data-depth="1.20"><div className="items__item" ></div></div>
              <div className="items__layer layer" data-depth="0.00"><div className="items__item" ></div></div>
            </div>
          </div>
          <div className="textAndUserNameSplashScreen">
            <div className="wrapper textAndUserName">
              <div className="textLogo">
                <span className="largeLogoText">WE <br/> PAINT</span>
                <br/>
                <span className="largeAuthorText"> bY Richard Andrews</span> 
              </div>
              <div className="getDataFromUser">
              <form className="nameForm" onSubmit={(this.onSubmit)}>
                <input 
                  className="textNameInput"
                  type="text"
                  value={this.state.term}
                  onChange={this.onInputChange}
                  placeholder='Enter your name'/>
                  <button
                    type='submit'
                    className='btn-primary'>
                    Go Paint...
                  </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }


  initiateCanvas() {
    let canvas = document.getElementById('canvasSplashScreen');
    let canvasWidth = canvas.width = window.innerWidth;
    let canvasHeight = canvas.height = window.innerHeight;
    let c = canvas.getContext('2d');
    let startPts = {
      x: 0,
      y: 600,
    }
    let endPts = {
      x: canvas.width,
      y: 600,
    }

    let mouse = {
      x: undefined,
      y: undefined,
    };

    var colorArray = [
      [0,0,0],
      [255,255,255],
      [0,0,0],
      [255,255,255],
      [0,0,0],
      [255,255,255],
    ];


    // -- event listeners 
    window.addEventListener('mousemove', function (event) {
      // console.log('asdf');
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener('resize', function (event) {
      canvasWidth = canvas.width = window.innerWidth;
      canvasHeight = canvas.height = window.innerHeight;
      endPts.x = canvasWidth;
      init();
    });

    // -- util functions
    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    

    // -- shape initialize
    let CubicBezier = function(startPtsY,changeX, changeY, fillStrokeColorValue) {
      this.changeX = canvasWidth/2;
      this.changeY = canvasHeight/2;
      this.startPtsX = startPts.x;
      this.startPtsY = startPtsY;
      this.endPtsX = endPts.x;
      this.endPtsY = startPtsY;
      this.fillStrokeColorValue = fillStrokeColorValue;
      this.fillStrokeColorValueString = `rgb(${this.fillStrokeColorValue[0]}, ${this.fillStrokeColorValue[1]}, ${this.fillStrokeColorValue[2]})`;
      
      this.nextColor = colorArray[getRandom(1, colorArray.length-2)];


      this.draw = function() {
        c.beginPath();
        c.moveTo(this.startPtsX, this.startPtsY);
        c.quadraticCurveTo(this.changeX, this.changeY, this.endPtsX, this.endPtsY);
        c.lineTo(this.endPtsX, this.startPtsY);
        c.lineTo(canvasWidth, canvasHeight);
        c.lineTo(0, canvasHeight);
        c.closePath();
        
        c.fillStyle = this.fillStrokeColorValueString;
        c.fill();
        c.lineWidth = 3;
        c.strokeStyle = this.fillStrokeColorValueString;
        c.stroke();
      }

      this.update = function() {
        this.changeX = mouse.x;
        this.changeY = mouse.y;
        // if(this.fillStrokeColor == "#000")
        //   this.fillStrokeColor = "#fff";
        // else if(this.fillStrokeColor == "#fff")
        //   this.fillStrokeColor = "#000";
        
        // if (this.fillStrokeColorValue[0] < this.nextColor[0])
        //   this.fillStrokeColorValue[0] = this.fillStrokeColorValue[0] + 1;
        // else if(this.fillStrokeColorValue[0] > this.nextColor[0])
        //   this.fillStrokeColorValue[0] = this.fillStrokeColorValue[0] - 1;
        // else
        //   this.fillStrokeColorValue[0] = this.nextColor[0];

        // if (this.fillStrokeColorValue[1] < this.nextColor[1])
        //   this.fillStrokeColorValue[1] = this.fillStrokeColorValue[1] + 1;
        // else if(this.fillStrokeColorValue[1] > this.nextColor[1])
        //   this.fillStrokeColorValue[1] = this.fillStrokeColorValue[1]- 1;
        // else
        //   this.fillStrokeColorValue[1] = this.nextColor[1];

        // if (this.fillStrokeColorValue[2] < this.nextColor[2])
        //   this.fillStrokeColorValue[2] = this.fillStrokeColorValue[2] + 1;
        // else if(this.fillStrokeColorValue[2] > this.nextColor[2])
        //   this.fillStrokeColorValue[2] = this.fillStrokeColorValue[2] - 1;
        // else
        //   this.fillStrokeColorValue[2] = this.nextColor[2];


        // if(this.fillStrokeColorValue[0] == this.nextColor[0]
        //   && this.fillStrokeColorValue[1] == this.nextColor[1]
        //    && this.fillStrokeColorValue[2] == this.nextColor[2]) {
        //     // this.fillStrokeColorValue = this.nextColor;
        //     // console.log(this.fillStrokeColorValueString, "fillStrokeColorValueString");
        //     // console.log(this.nextColor, "nextColor");
        //      this.nextColor = colorArray[getRandom(1, colorArray.length-2)];
        //     //  this.fillStrokeColorValue = colorArray[getRandom(1, colorArray.length-2)];
        //    }

        //    this.fillStrokeColorValueString = `rgb(${this.fillStrokeColorValue[0]}, ${this.fillStrokeColorValue[1]}, ${this.fillStrokeColorValue[2]})`;
           
      }

    }

    var cubicBezier = [];
    function init() {
        cubicBezier = [];
       cubicBezier.push(new CubicBezier(-300, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(0, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(50, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(100, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(150, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(200, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(250, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(300, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(350, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(400, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(450, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(500, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(550, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(600, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(650, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(700, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(canvasHeight, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));
       cubicBezier.push(new CubicBezier(canvasHeight + 200, canvasWidth/2, canvasHeight/2, colorArray[getRandom(0, colorArray.length-1)]));

      // cubicBezier.draw();
    }

    function animate() {
      requestAnimationFrame(animate);

      //refresh the canvas
      c.clearRect(0, 0, canvasWidth, canvasHeight);

      for (var i = 0; i < cubicBezier.length; i++) {
        cubicBezier[i].draw();
        cubicBezier[i].update();
      }

    }
    init();
    animate();

  }

}
function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { setUsername })(App);