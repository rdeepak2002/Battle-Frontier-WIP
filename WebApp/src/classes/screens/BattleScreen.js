import Sprite from './../sprites/Sprite';

/**
 * Class for the Title Screen
 * @author Deepak Ramalingam
 */
class LobbyScreen {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    // music to be played
    this.music = { "name": "battle1_intro", "loop": false, "override": true};
    // sprites to be drawn
    this.sprites = [
                      new Sprite({
                        "name": "ninja",
                        "background": false,
                        "x": 0,
                        "y": 0,
                        "width": 407,
                        "height": 512,
                        "scale": 0.3,
                        "sprite_image": "ninja_image",
                        "pixi_sprite_object": undefined,
                        "added": false})
                   ];
  }
}

export default LobbyScreen;
