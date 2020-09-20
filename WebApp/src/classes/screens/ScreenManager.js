import Sprite from './../sprites/Sprite';

import ninja_sprite from './../../resources/sprites/ninja.png';

/**
 * Class for managing Screens
 * @author Deepak Ramalingam
 */
class ScreenManager {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    // variable to keep track of the current screen
    this.current_screen = undefined;
    // variable to keep track of the screens
    this.screens = {
      // TODO: make a general screen class and have other screen classes that extend from that
      "title": {"music": "prologue", "sprites": [
                  new Sprite({"name": "ninja", "x": 0, "y": 0, "width": 407,
                    "height": 512, "scale": 0.3, "sprite_image": ninja_sprite,
                    "pixi_sprite_object": undefined, "added": false})
                ]}
    };
  }

  load_screen(props, screen_name) {
    if(screen_name !== this.current_screen) {
      const { SpriteManager, MusicManager } = props;
      SpriteManager.sprites = this.screens[screen_name].sprites;
      MusicManager.play_music(this.screens[screen_name].music, true, false);
      this.current_screen = screen_name;
    }
    else {
      console.error("ScreenManager.js: Screen has already loaded");
    }
  }
}

export default ScreenManager;
