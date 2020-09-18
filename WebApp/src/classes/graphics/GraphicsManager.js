/**
 * Class for managing Graphics
 * @author Deepak Ramalingam
 */
class GraphicsManager {
  /**
   * function to render PIXI-specific graphics
   */
  draw_graphics(props) {
    // get an instance of the game_area
    const { graphics, game_area } = props;
    // clear the previous graphics
    graphics.clear();
    // draw the game area background for debugging
    graphics.lineStyle(5, 0xFF0000);
    graphics.drawRect(game_area.x, game_area.y,
      game_area.width, game_area.height);
  }
}

export default GraphicsManager;
