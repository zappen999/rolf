/**
 * Class for handling RTSP responses from a server
 */

class Response {
  /**
   * Constructor
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} data Raw RTSP response data
   * @return {Response}    Self
   */
  constructor(data) {
    this._data = data || '';

    this._version = null;
    this._status = null;
    this._reasonPhrase = null;

    this._parse();
  }

  /**
   * Parses the response
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @return {Response} Self
   */
  _parse() {
    const lines = this._data.toString('utf8').trim().split('\n');

    // First line is status-line, parse and remove the line
    const statusLine = this._parseStatusLine(lines[0]);

    this._version = statusLine.version;
    this._status = statusLine.statusCode;
    this._reasonPhrase = statusLine.reasonPhrase;
    lines.splice(0, 1);

    // Loop through
    for (const line of lines) {
      console.log(line);
    }

    return this;
  }

  /**
   * Parses status line
   * @author Johan Kanefur <johan.canefur@gmail.com>
   * @param  {string} line Status line string from response
   * @return {object}      Object with the components of the status string
   */
  _parseStatusLine(line) {
    const params = line.trim().split(' ');
    const reasonPhrase = params.filter((param, i) => {
      return i < 2 ? false : param;
    }).join(' ');

    return {
      version: params[0],
      statusCode: parseInt(params[1], 10),
      reasonPhrase: reasonPhrase,
    };
  }

  /**
   * Getters and setters
   */

  get version() {
    return this._version;
  }

  set version(version) {
    this._version = version;
  }

  get status() {
    return this._status;
  }

  set status(status) {
    this._status = status;
  }

  get reasonPhrase() {
    return this._reasonPhrase;
  }

  set reasonPhrase(reasonPhrase) {
    this._reasonPhrase = reasonPhrase;
  }
}

module.exports = Response;
