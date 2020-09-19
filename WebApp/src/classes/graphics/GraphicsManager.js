import * as PIXI from 'pixi.js';

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
    this.text_objects = [{"name": "fps_text", "added": false, "text_object":
      new PIXI.Text("", {fontFamily : "Arial", fontSize: 24, fill : 0xFFFFFF,
      align : "center"})},
      {"name": "ping_text", "added": false, "text_object":
        new PIXI.Text("", {fontFamily : "Arial", fontSize: 24, fill : 0xFFFFFF,
        align : "center"})}];
    this.sprite_objects = [{"name": "game_area_rect", "sprite":
      PIXI.Sprite.from(PIXI.Texture.WHITE)}];
  }

  /**
   * function to render PIXI-specific graphics
   */
  draw_graphics(props) {
    this.draw_sprites(props);
    this.draw_text(props);
  }

  /**
   * function to draw text
   */
  draw_text(props) {
    // get an instance of the app an game area
    const { app } = props;
    // go through all text objects and draw them
    for(let i = 0; i < this.text_objects.length; i++) {
      const text_object = this.text_objects[i];
      // for the fps text set it according to app.ticker.FPS
      if(text_object.name === "fps_text") {
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
      if(text_object.name === "ping_text") {
        if(this.debug) {
          // set ping text
          text_object.text_object.text = "Ping: " + NetworkManager.get_latency()
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
  }

  /**
   * function to draw sprites
   */
  draw_sprites(props) {
    // get an instance of the app an game area
    const { app, game_area } = props;
    // go through all sprite objects and draw them
    for(let i = 0; i < this.sprite_objects.length; i++) {
      const sprite_object = this.sprite_objects[i];
      // for the game area rectangle, draw it at the game_area bounds
      if(sprite_object.name === "game_area_rect") {
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
    }
  }
}

export default GraphicsManager;
