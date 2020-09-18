import React, { Component } from 'react';
import { POLICY, Size, getScaledRect } from 'adaptive-scale/lib-esm';
import * as PIXI from 'pixi.js';
import './App.css';

import Sprite from './classes/sprites/Sprite';
import SpriteManager from './classes/sprites/SpriteManager';

import GraphicsManager from './classes/graphics/GraphicsManager';

import ninja_sprite from './resources/sprites/ninja.png';

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
    this.resize = this.resize.bind(this);
    this.debug = this.debug.bind(this);
    this.render_canvas = this.render_canvas.bind(this);
    // set the state variables
    this.state = {
      debug: true,
      aspect_ratio: {"x": 1280, "y": 720},
      app: undefined,
      loader: undefined,
      graphics: undefined,
      game_area: undefined,
      sprites: [new Sprite({"name": "ninja", "x": 0, "y": 0, "width": 407,
        "height": 512, "scale": 0.5, "sprite_image": ninja_sprite,
        "pixi_sprite_object": undefined, "added": false})],
      GraphicsManager: new GraphicsManager(),
      SpriteManager: new SpriteManager()
    };
  }

  /**
   * function called by React the moment the client opens the website
   */
  componentDidMount() {
    // declare and initialize the PIXI canvas
    const app = new PIXI.Application();
    const loader = app.loader;
    const graphics = new PIXI.Graphics();
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
      // resize to fit screen once in beginning
      this.resize();
      // render the canvas in a loop
      app.ticker.add((delta) => {
        this.debug();
        this.render_canvas();
      });
    });
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
    this.render_canvas();
  }

  /**
   * function for handle debugging
   */
  debug() {
    const { debug, GraphicsManager } = this.state;
    GraphicsManager.debug = debug;
  }

  /**
   * function for the update render loop
   */
  render_canvas() {
    // get the app, its loader, and pixi graphics from the state
    const { aspect_ratio, app, graphics, GraphicsManager,
      SpriteManager } = this.state;
    // create the playable game area with constant scaling
    const game_area = getScaledRect({
      container: new Size(app.renderer.width, app.renderer.height),
      target: new Size(aspect_ratio.x, aspect_ratio.y),
      policy: POLICY.ShowAll
    });
    // define the scale of the game area
    game_area.scale = game_area.width/aspect_ratio.x;
    // make the new game_area definition available to the whole class
    this.setState({game_area: game_area},
    () => {
      // draw any PIXI specific graphics
      GraphicsManager.draw_graphics(this.state);
      // update and add new sprites
      SpriteManager.draw_sprites(this.state);
      // add the graphics to the app screen
      app.stage.addChild(graphics);
    });
  }
}

export default App;
