import TitleScreen from './TitleScreen';
import LobbyScreen from './LobbyScreen';
import BattleScreen from './BattleScreen';

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
      "title": new TitleScreen(),
      "lobby": new LobbyScreen(),
      "battle": new BattleScreen()
    };
  }

  /**
   * function to load a screen
   * @param {object} props The properties of the application to be passed down
   * @param {string} screen_name The name of the screen to load
   */
  load_screen(props, screen_name) {
    if(screen_name !== this.current_screen) {
      const { SpriteManager, MusicManager } = props;
      SpriteManager.sprites = this.screens[screen_name].sprites;
      MusicManager.play_music(this.screens[screen_name].music.name,
        this.screens[screen_name].music.loop,
        this.screens[screen_name].music.override);
      this.current_screen = screen_name;
    }
    else {
      console.error("ScreenManager.js: Screen has already loaded");
    }
  }
}

export default ScreenManager;
