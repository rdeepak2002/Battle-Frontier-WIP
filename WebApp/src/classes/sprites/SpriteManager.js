import * as PIXI from 'pixi.js';

/**
 * Class for managing Sprite objects
 * @author Deepak Ramalingam
 */
class SpriteManager {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    this.sprites = []
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
    const sprite =
      new PIXI.Sprite(resources[sprite_to_add.sprite_image].texture);
    sprite.x = sprite_to_add.x + (sprite_to_add.background ? 0 : game_area.x);
    sprite.y = sprite_to_add.y + (sprite_to_add.background ? 0 : game_area.y);
    sprite.width = sprite_to_add.width * game_area.scale * sprite_to_add.scale;
    sprite.height = sprite_to_add.height * game_area.scale * sprite_to_add.scale;
    sprite_to_add.pixi_sprite_object = sprite;
    app.stage.addChild(sprite);
    // repeat background
    
  }

  /**
   * function to update an existing sprite
   * @param {object} props The properties of the application to be passed down
   */
  update_sprite(props, sprite_to_update) {
    // get an instance of the app and loader
    const { game_area } = props;
    const pixi_sprite_object = sprite_to_update.pixi_sprite_object;
    if(!pixi_sprite_object) {
      return;
    }
    pixi_sprite_object.x = sprite_to_update.x + (sprite_to_update.background ? 0 : game_area.x);
    pixi_sprite_object.y = sprite_to_update.y + (sprite_to_update.background ? 0 : game_area.y);
    pixi_sprite_object.width = sprite_to_update.width * game_area.scale * sprite_to_update.scale;
    pixi_sprite_object.height = sprite_to_update.height * game_area.scale * sprite_to_update.scale;
  }
}

export default SpriteManager;
