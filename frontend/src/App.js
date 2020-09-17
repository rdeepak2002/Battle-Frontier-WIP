import React, { Component } from 'react';
import {POLICY, Size, getScaledRect} from 'adaptive-scale/lib-esm';
import {Application, Graphics} from 'pixi.js';
import './App.css';

/**
 * Main class that render the Canvas and handles scaling and resizing
 * @author Deepak Ramalingam
 */
class App extends Component {
  /**
   * constructor to initialize global variables
   * @param {object} props The default properties from React
   */
  constructor(props) {
    // call super constructor
    super(props);
    // bind methods to use the state
    this.render_graphics = this.render_graphics.bind(this);
    this.resize = this.resize.bind(this);
    // set the state variables
    this.state = {
      aspect_ratio: {"x": 1280, "y": 720},
      app: undefined,
      loader: undefined,
      graphics: undefined
    };
  }

  /**
   * function called by React the moment the client opens the website
   */
  componentDidMount() {
    // declare and initialize the PIXI canvas
    const app = new Application();
    const loader = app.loader;
    const graphics = new Graphics();
    // initialize the state variables
    this.setState({
      app: app,
      loader: loader,
      graphics: graphics
    },
    () => {
      // add the screen to the page and add a resize listener to fit screen
      document.getElementsByClassName("screen")[0].appendChild(app.view);
      window.addEventListener("resize", this.resize);
      this.resize();
      app.ticker.add((delta) => {
        this.render_graphics();
      });
    });
  }

  /**
   * function to render graphics onto the PIXI Canvas
   */
  render_graphics() {
    // get the app, its loader, and pixi graphics from the state
    const { aspect_ratio, app, loader, graphics } = this.state;
    // create the playable game area with constant scaling
    const game_area = getScaledRect({
      container: new Size(app.renderer.width, app.renderer.height),
      target: new Size(aspect_ratio.x, aspect_ratio.y),
      policy: POLICY.ShowAll
    });
    // define the scale of the game area
    game_area.scale = game_area.width/aspect_ratio.x;
    // clear the previous graphics
    graphics.clear();
    // draw the game area background for debugging
    graphics.beginFill(0xFFFF00);
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(game_area.x, game_area.y,
      game_area.width, game_area.height);
    // add the graphics to the app screen
    app.stage.addChild(graphics);
  }

  /**
   * function called by React when the App is closing
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    window.location.reload();
  }

  /**
   * function called by React to render HTML elements
   */
  render() {
    return (<div className="screen"/>);
  }
  
  /**
   * function to handle screen resizing
   */
  resize() {
    this.state.app.renderer.resize(window.innerWidth, window.innerHeight);
    this.render_graphics();
  }
}

export default App;
