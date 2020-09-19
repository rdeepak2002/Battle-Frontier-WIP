import * as PIXI from 'pixi.js';

import Sprite from './../sprites/Sprite';

import ninja_sprite from './../../resources/sprites/ninja.png';

/**
 * Class for managing Sprite objects
 * @author Deepak Ramalingam
 */
class SpriteManager {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    this.sprites = [new Sprite({"name": "ninja", "x": 0, "y": 0, "width": 407,
      "height": 512, "scale": 0.3, "sprite_image": ninja_sprite,
      "pixi_sprite_object": undefined, "added": false})]
  }

  /**
   * function to draw new sprites or update existing ones
   */
  draw_sprites(props) {
    // loop through sprites and add / update them accordingly
    for(let i = 0; i < this.sprites.length; i++) {
      if(!this.sprites[i].added) {
        this.add_sprite(this.sprites[i], props);
        this.sprites[i].added = true;
      }
      else {
        this.update_sprite(this.sprites[i], props);
      }
    }
  }

  /**
   * function to add a new sprite to PIXI canvas
   */
  add_sprite(sprite_to_add, props) {
    // get an instance of the app and loader
    const { app, loader, game_area } = props;
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
  update_sprite(sprite, props) {
    // get an instance of the app and loader
    const { game_area } = props;
    const pixi_sprite_object = sprite.pixi_sprite_object;
    if(!pixi_sprite_object) {
      return;
    }
    pixi_sprite_object.x = sprite.x + game_area.x;
    pixi_sprite_object.y = sprite.y + game_area.y;
    pixi_sprite_object.width = sprite.width * game_area.scale * sprite.scale;
    pixi_sprite_object.height = sprite.height * game_area.scale * sprite.scale;
  }
}

export default SpriteManager;
