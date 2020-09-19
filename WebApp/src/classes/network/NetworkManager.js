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
    console.log(this.server_url);
  }
}

export default NetworkManager;
