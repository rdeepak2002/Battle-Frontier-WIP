import * as PIXI from 'pixi.js';

/**
 * Class for managing Sprite objects
 * @author Deepak Ramalingam
 */
class SpriteManager {
  /**
   * function to draw new sprites or update existing ones
   */
  draw_sprites(props) {
    // get the array of sprite objects
    const { sprites } = props;
    // loop through sprites and add / update them accordingly
    for(let i = 0; i < sprites.length; i++) {
      if(!sprites[i].added) {
        this.add_sprite(sprites[i], props);
        sprites[i].added = true;
      }
      else {
        this.update_sprite(sprites[i], props);
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
