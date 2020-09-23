import Sprite from './../sprites/Sprite';

/**
 * Class for the Title Screen
 * @author Deepak Ramalingam
 */
class TitleScreen {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    // music to be played
    this.music = { "name": "prologue", "loop": true, "override": true};
    // sprites to be drawn
    this.sprites = [
                      new Sprite({
                        "name": "sky_background",
                        "background": true,
                        "x": 0,
                        "y": 0,
                        "width": 391,
                        "height": 292,
                        "scale": 1.0,
                        "sprite_image": "sky_background",
                        "pixi_sprite_object": undefined,
                        "added": false
                      }),
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

export default TitleScreen;
