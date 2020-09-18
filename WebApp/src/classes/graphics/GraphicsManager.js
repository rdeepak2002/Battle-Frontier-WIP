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
    this.text_objects = [{"added": false, "text_object":
      new PIXI.Text("", {fontFamily : "Arial",
      fontSize: 24, fill : 0xFFFFFF, align : "center"})}];
  }

  /**
   * function to render PIXI-specific graphics
   */
  draw_graphics(props) {
    // get an instance of the game_area
    const { app, graphics, game_area } = props;
    // clear the previous graphics
    graphics.clear();
    // draw the game area background for debugging
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(game_area.x, game_area.y,
      game_area.width, game_area.height);
    // draw any debug graphics
    if(this.debug) {
      // go through all text objects and draw them
      for(let i = 0; i < this.text_objects.length; i++) {
        const text_object = this.text_objects[i];
        text_object.text_object.text = app.ticker.FPS.toFixed(1) + " FPS";
        if(!text_object.added) {
          app.stage.addChild(text_object.text_object);
          text_object.added = true;
        }
      }
    }
  }
}

export default GraphicsManager;
