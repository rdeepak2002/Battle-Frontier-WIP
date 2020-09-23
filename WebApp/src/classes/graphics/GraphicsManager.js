import * as PIXI from 'pixi.js';

import { isMobile } from 'react-device-detect';

/**
 * Class for managing Graphics
 * @author Deepak Ramalingam
 */
class GraphicsManager {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    this.debug = false;
    this.text_objects = [
      // start text
      {"name": "start_text", "added": false, "text_object":
        new PIXI.Text(isMobile ? "Tap to Start" : "Click to Start",
        {fontFamily : "Arial", fontSize: 24,
        fill : 0x000000, align : "center"})},
      // fps text
      {"name": "fps_text", "added": false, "text_object":
        new PIXI.Text("", {fontFamily : "Arial", fontSize: 24, fill : 0x000000,
        align : "center"})},
      // ping time text
      {"name": "ping_text", "added": false, "text_object":
        new PIXI.Text("", {fontFamily : "Arial", fontSize: 24, fill : 0x000000,
        align : "center"})}
      ];
    this.sprite_objects = [
      // game_area rectangle
      {"name": "game_area_rect", "sprite": PIXI.Sprite.from(PIXI.Texture.WHITE)}
      ];
  }

  /**
   * function to render PIXI-specific graphics
   * @param {object} props The properties of the application to be passed down
   */
  draw_graphics(props) {
    this.debug = props.debug;
    this.draw_sprites(props);
    this.draw_text(props);
  }

  /**
   * function to draw sprites
   * @param {object} props The properties of the application to be passed down
   */
  draw_sprites(props) {
    // go through all sprite objects and draw them
    for(let i = 0; i < this.sprite_objects.length; i++) {
      const sprite_object = this.sprite_objects[i];
      if(sprite_object.name === "game_area_rect") {
        this.handle_game_area_rect(props, sprite_object);
      }
    }
  }

  /**
   * function to draw text
   * @param {object} props The properties of the application to be passed down
   */
  draw_text(props) {
    // go through all text objects and draw them
    for(let i = 0; i < this.text_objects.length; i++) {
      const text_object = this.text_objects[i];
      if(text_object.name === "fps_text") {
        this.handle_fps_text(props, text_object);
      }
      if(text_object.name === "ping_text") {
        this.handle_ping_text(props, text_object);
      }
      if(text_object.name === "start_text") {
        this.handle_start_text(props, text_object);
      }
    }
  }

  /**
   * function to draw a red rectangle for the game area
   * @param {object} props The properties of the application to be passed down
   * @param {string} sprite_object The sprite object to be utilized
   */
  handle_game_area_rect(props, sprite_object) {
    const { app, game_area } = props;
    if(this.debug) {
      // define the sprite as the game area
      sprite_object.sprite.x = game_area.x;
      sprite_object.sprite.y = game_area.y;
      sprite_object.sprite.width = game_area.width;
      sprite_object.sprite.height = game_area.height;
      sprite_object.sprite.tint = 0xFF0000;
      // add a sprite object to the canvas if it has not been addedd
      if(!sprite_object.added) {
        app.stage.addChild(sprite_object.sprite);
        sprite_object.added = true;
      }
    }
    else {
      app.stage.removeChild(sprite_object.sprite);
    }
  }

  /**
   * function to handle drawing the start text
   * @param {object} props The properties of the application to be passed down
   * @param {string} sprite_object The text object to be utilized
   */
  handle_start_text(props, text_object) {
    const { app, game_area } = props;
    if(!app.first_click) {
      // position the text in the center
      text_object.text_object.x = game_area.x + game_area.width/2
        - text_object.text_object.width/2;
      text_object.text_object.y = game_area.y + game_area.height/2
        - text_object.text_object.height/2;
      // add a text object to the canvas if it has not been addedd
      if(!text_object.added) {
        app.stage.addChild(text_object.text_object);
        text_object.added = true;
      }
      else {
        text_object.text = "";
      }
    }
    else {
      app.stage.removeChild(text_object.text_object);
    }
  }

  /**
   * function to handle drawing the fps text
   * @param {object} props The properties of the application to be passed down
   * @param {string} sprite_object The text object to be utilized
   */
  handle_fps_text(props, text_object) {
    const { app } = props;
    if(this.debug) {
      // set fps text
      text_object.text_object.text = app.ticker.FPS.toFixed(1) + " FPS";
      // add a text object to the canvas if it has not been addedd
      if(!text_object.added) {
        app.stage.addChild(text_object.text_object);
        text_object.added = true;
      }
    }
    else {
      app.stage.removeChild(text_object.text_object);
    }
  }

  /**
   * function to handle drawing the ping text
   * @param {object} props The properties of the application to be passed down
   * @param {string} sprite_object The text object to be utilized
   */
  handle_ping_text(props, text_object) {
    const { app, NetworkManager } = props;
    if(this.debug) {
      // set ping text
      text_object.text_object.text = "Ping: " + NetworkManager.latency
        + " MS";
      // move the text
      text_object.text_object.y = 32;
      // add a text object to the canvas if it has not been addedd
      if(!text_object.added) {
        app.stage.addChild(text_object.text_object);
        text_object.added = true;
      }
    }
    else {
      app.stage.removeChild(text_object.text_object);
    }
  }
}

export default GraphicsManager;
