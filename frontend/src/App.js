import React, { Component } from 'react';
import {POLICY, Size, getScaledRect} from 'adaptive-scale/lib-esm';
import * as PIXI from 'pixi.js';
import './App.css';

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
    this.render_canvas = this.render_canvas.bind(this);
    this.draw_graphics = this.draw_graphics.bind(this);
    // set the state variables
    this.state = {
      aspect_ratio: {"x": 1280, "y": 720},
      app: undefined,
      loader: undefined,
      graphics: undefined,
      game_area: undefined,
      sprites: [{"added": false, "name": "ninja", "x": 0, "y": 0, "width": 407, "height": 512, "sprite_image": ninja_sprite, "pixi_sprite_object": undefined}]
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
   * function for the update render loop
   */
  render_canvas() {
    // get the app, its loader, and pixi graphics from the state
    const { aspect_ratio, app, graphics, sprites } = this.state;
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
      // add sprites that need to be added
      for(let i = 0; i < sprites.length; i++) {
        if(!sprites[i].added) {
          console.log("adding sprite");
          this.add_sprite(sprites[i]);
          sprites[i].added = true;
        }
        else {
          this.update_sprite(sprites[i]);
        }
      }
      // draw any PIXI specific graphics
      this.draw_graphics();
      // add the graphics to the app screen
      app.stage.addChild(graphics);
    });
  }

  /**
   * function to render PIXI-specific graphics
   */
  draw_graphics() {
    // get an instance of the game_area
    const { graphics, game_area } = this.state;
    // clear the previous graphics
    graphics.clear();
    // draw the game area background for debugging
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(game_area.x, game_area.y,
      game_area.width, game_area.height);
  }

  /**
   * function to add a new sprite to PIXI canvas
   */
  add_sprite(sprite_to_add) {
    // get an instance of the app and loader
    const { app, loader, game_area } = this.state;
    // load the texture we need
    loader.add(sprite_to_add.name, sprite_to_add.sprite_image).load((loader, resources) => {
      const sprite = new PIXI.Sprite(resources[sprite_to_add.name].texture);
      sprite.x = sprite_to_add.x + game_area.x;
      sprite.y = sprite_to_add.y + game_area.y;
      sprite.width = sprite_to_add.width * game_area.scale;
      sprite.height = sprite_to_add.height * game_area.scale;
      sprite_to_add.pixi_sprite_object = sprite;
      app.stage.addChild(sprite);
    });
  }

  /**
   * function to update an existing sprite
   */
  update_sprite(sprite) {
    // get an instance of the app and loader
    const { game_area } = this.state;
    const pixi_sprite_object = sprite.pixi_sprite_object;
    if(!pixi_sprite_object) {
      return;
    }
    pixi_sprite_object.x = sprite.x + game_area.x;
    pixi_sprite_object.y = sprite.y + game_area.y;
    pixi_sprite_object.width = sprite.width * game_area.scale;
    pixi_sprite_object.height = sprite.height * game_area.scale;
  }
}

export default App;
