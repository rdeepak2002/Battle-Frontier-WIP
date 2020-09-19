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

    this.socket.on('pong', function(ms) {
      console.log(ms);
      this.latency = ms;
    });
  }

  /**
   * getter method for latency variable
   */
  get_latency() {
    return this.latency;
  }
}

export default NetworkManager;
