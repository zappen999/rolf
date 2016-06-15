/**
 * Rolf lib
 */

const net = require('net');
const Response = require('./response');
const Request = require('./request');

/**
Option object
{
  timeout: 200,
  method: 'DESCRIBE',
  cseq: 0,
  headers: {
    'Content-Type': 'text/plain',
  },
};
*/

class Rolf {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string}  host    Hostname
   * @param  {integer} port    Port
   * @param  {string}  uri     URI
   * @param  {object}  options Request options
   * @return {Promise}         Load promise
   */
  constructor(host, port, uri, options = {}) {
    this._host = host;
    this._port = port;
    this._uri = uri;
    this._options = options;

    this._client = new net.Socket();
    this._buf = new Buffer(0);
    this._cseq = options.cseq || 0;

    // To be able to test the constructor without stubbing net
    if (options.test) {
      return;
    }

    return this._setup().then(() => {
      return this._execute().then(() => {
        return this._parseResponse();
      });
    });
  }

  /**
   * Validates the input before performing a request
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Promise} Resolving promise on success, rejecting on fail
   */
  _setup() {
    return new Promise((resolve, reject) => {
      console.log('Setting up...');
      resolve(); // TODO: Perform validation here
    });
  }

  /**
   * Opens a connection to the
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {[type]} [description]
   */
  _execute() {
    return new Promise((resolve, reject) => {
      // Setup data listener
      this._client.on('data', data => {
        console.log('Incoming data', data.toString('utf8'));
        this._handleData(data);

        if (this._hasReachedEnd()) {
          console.log('Reached end of stream, closing...');
          console.log('Resolving', this._buf);
          this._client.destroy();
          return resolve(this._buf);
        }
      });

      // Setup error listener
      this._client.on('error', err => {
        console.log('Stream error', err);
        return reject(err);
      });

      // Open connection
      this._client.connect(this._port, this._host, err => {
        if (err) {
          console.log('Error when connecting', err);
          return reject(err);
        }

        console.log('Connected...');

        // Send the request
        this._sendRequest();
      });
    });
  }

  /**
   * Sends a request down the pipe
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {void}
   */
  _sendRequest() {
    // Construct a request from the data supplied
    const req = new Request(
      this._options.method,
      this._host,
      this._port,
      this._uri,
      this._cseq
    );

    this._client.write(req.getRaw());
    this._cseq = this._cseq + 1;
  }

  /**
   * Takes care of incoming data from server
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {Buffer}  data Data buffer
   * @return {void}
   */
  _handleData(data) {
    this._buf = Buffer.concat([this._buf, Buffer.from(data)]);
  }

  /**
   * Checks if the buffer contains the end sequence
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Boolean} True if end, false if not
   */
  _hasReachedEnd() {
    console.log('Checking end reach');
    return this._buf.indexOf('\r\n\r\n') !== -1;
  }

  /**
   * Uses the response class to parse the response buffer
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Response} Response object
   */
  _parseResponse() {
    // Parse the data in this._buf to Response class
    return new Response(this._buf);
  }
}

module.exports = Rolf;
