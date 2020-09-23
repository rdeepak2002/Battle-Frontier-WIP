import * as PIXI from 'pixi.js';

import Sprite from './../sprites/Sprite';

/**
 * Class for managing Sprite objects
 * @author Deepak Ramalingam
 */
class SpriteManager {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    this.sprites = [
      new Sprite({
        "name": "sky_background",
        "background": true,
        "backgroundColor": 0x285080,
        "repeat": false,
        "x": 0,
        "y": 0,
        "width": 391,
        "height": 292,
        "scale": 1.0,
        "sprite_image": "sky_background_2",
        "pixi_sprite_object": undefined,
        "added": false
      })
    ]
  }

  /**
   * function to draw new sprites or update existing ones
   * @param {object} props The properties of the application to be passed down
   */
  draw_sprites(props) {
    // loop through sprites and add / update them accordingly
    for(let i = 0; i < this.sprites.length; i++) {
      if(!this.sprites[i].added) {
        this.add_sprite(props, this.sprites[i]);
        this.sprites[i].added = true;
      }
      else {
        this.update_sprite(props, this.sprites[i]);
      }
    }
  }

  /**
   * function to add a new sprite to PIXI canvas
   * @param {object} props The properties of the application to be passed down
   */
  add_sprite(props, sprite_to_add) {
    // get an instance of the app and loader
    const { app, resources, game_area } = props;
    // create a new pixi sprite object and add it to the stage
    if(sprite_to_add.background) {
      // repeating background
      if(sprite_to_add.repeat) {
        const sprite =
          new PIXI.TilingSprite(resources[sprite_to_add.sprite_image].texture,
            app.renderer.width, app.renderer.height);
        sprite_to_add.pixi_sprite_object = sprite;
        sprite.zIndex = -1;
        app.stage.addChild(sprite);
      }
      // non-repeating background
      else {
        const sprite =
          new PIXI.TilingSprite(resources[sprite_to_add.sprite_image].texture,
            app.renderer.width,
            game_area.height);
        sprite_to_add.pixi_sprite_object = sprite;
        sprite.zIndex = -1;
        app.stage.addChild(sprite);
      }
    }
    // normal sprite
    else {
      let sprite = new PIXI.Sprite(resources[sprite_to_add.sprite_image].texture);
      sprite.x = sprite_to_add.x + game_area.x;
      sprite.y = sprite_to_add.y + game_area.y;
      sprite.width = sprite_to_add.width * game_area.scale * sprite_to_add.scale;
      sprite.height = sprite_to_add.height * game_area.scale * sprite_to_add.scale;
      sprite_to_add.pixi_sprite_object = sprite;
      app.stage.addChild(sprite);
    }
  }

  /**
   * function to update an existing sprite
   * @param {object} props The properties of the application to be passed down
   */
  update_sprite(props, sprite_to_update) {
    // get an instance of the app and loader
    const { app, resources, game_area } = props;
    const pixi_sprite_object = sprite_to_update.pixi_sprite_object;
    if(!pixi_sprite_object) {
      return;
    }
    if(sprite_to_update.background) {
      app.renderer.backgroundColor = sprite_to_update.backgroundColor;
      // repeating background
      if(sprite_to_update.repeat) {
        pixi_sprite_object.tileScale.x = game_area.scale;
        pixi_sprite_object.tileScale.y = game_area.scale;
        pixi_sprite_object.width = app.renderer.width;
        pixi_sprite_object.height = app.renderer.height;
      }
      // non-repeating background
      else {
        pixi_sprite_object.tileScale.x = game_area.scale;
        pixi_sprite_object.tileScale.y = game_area.scale;
        pixi_sprite_object.width = app.renderer.width;
        pixi_sprite_object.height = game_area.height;
        pixi_sprite_object.y = app.renderer.height-resources
          [sprite_to_update.sprite_image].texture.height*game_area.scale;
      }
    }
    // normal sprite
    else {
      pixi_sprite_object.x = sprite_to_update.x + (sprite_to_update.background ? 0 : game_area.x);
      pixi_sprite_object.y = sprite_to_update.y + (sprite_to_update.background ? 0 : game_area.y);
      pixi_sprite_object.width = sprite_to_update.width * game_area.scale * sprite_to_update.scale;
      pixi_sprite_object.height = sprite_to_update.height * game_area.scale * sprite_to_update.scale;
    }
  }
}

export default SpriteManager;
