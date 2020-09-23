import React, { Component } from 'react';
import { POLICY, Size, getScaledRect } from 'adaptive-scale/lib-esm';
import * as PIXI from 'pixi.js';
import './App.css';

import ScreenManager from './classes/screens/ScreenManager';
import SpriteManager from './classes/sprites/SpriteManager';
import GraphicsManager from './classes/graphics/GraphicsManager';
import MusicManager from './classes/sounds/MusicManager';
import NetworkManager from './classes/network/NetworkManager';

import sky_background_1 from './resources/sprites/backgrounds/sky_background_1.png';
import sky_background_2 from './resources/sprites/backgrounds/sky_background_2.png';
import ninja_image from './resources/sprites/ninja.png';

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
    this.click_listener = this.click_listener.bind(this);
    this.render_canvas = this.render_canvas.bind(this);
    // set the state variables
    this.state = {
      debug: false,
      aspect_ratio: {"x": 768, "y": 432},
      app: undefined,
      loader: undefined,
      game_area: undefined,
      ScreenManager: undefined,
      SpriteManager: undefined,
      GraphicsManager: undefined,
      MusicManager: undefined,
      NetworkManager: undefined
    };
  }

  /**
   * function called by React the moment the client opens the website
   */
  componentDidMount() {
    // declare and initialize the PIXI canvas
    PIXI.utils.skipHello();
    const app = new PIXI.Application();
    const loader = app.loader;
    app.first_click = false;
    // add textures
    loader.add('sky_background_1', sky_background_1)
          .add('sky_background_2', sky_background_2)
          .add('ninja_image', ninja_image);
    // load the textures
    loader.load((loader, resources) => {
      // initialize the state variables
      this.setState({
        app: app,
        resources: resources,
        ScreenManager: new ScreenManager(),
        SpriteManager: new SpriteManager(),
        GraphicsManager: new GraphicsManager(),
        MusicManager: new MusicManager(),
        NetworkManager: new NetworkManager()
      },
      () => {
        // add the screen to the page and add a resize listener to fit screen
        document.getElementsByClassName("screen")[0].appendChild(app.view);
        window.addEventListener("resize", this.resize);
        // click listener for audio elements to work fine
        window.addEventListener("mousedown", this.click_listener, false);
        window.addEventListener("touchstart", this.click_listener, false);
        // resize to fit screen once in beginning
        this.resize();
        // render the canvas in a loop
        app.ticker.add((delta) => {
          this.render_canvas();
        });
      });
    });
  }

  /**
   * function called by React when the App is closing
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("mousedown", this.click_listener, false);
    window.removeEventListener("touchstart", this.click_listener, false);
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
   * function to handle a click or tap on the screen to play beginning music
   */
  click_listener() {
    if(!this.first_click) {
      const { app, ScreenManager } = this.state;
      ScreenManager.load_screen(this.state, "title");
      app.first_click = true;
    }
  }

  /**
   * function for the update render loop
   */
  render_canvas() {
    // get the app, its loader, and pixi graphics from the state
    const { aspect_ratio, app, GraphicsManager,
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
      // update and add new sprites
      SpriteManager.draw_sprites(this.state);
      // draw any PIXI specific graphics
      GraphicsManager.draw_graphics(this.state);
    });
  }
}

export default App;
