import io from 'socket.io-client';

/**
 * Class for managing Networking
 * @author Deepak Ramalingam
 */
class NetworkManager {
  /**
   * Constructor to initialize variables
   */
  constructor() {
    this.server_url = process.env.REACT_APP_API_URL;
    this.socket = io(this.server_url);
    this.latency = 0;

    this.add_ping_listener();
  }

  /**
   * function to listen for pings from server
   */
  add_ping_listener() {
    this.socket.on('pong', (ms) => {
      this.latency = ms;
    });
  }
}

export default NetworkManager;
