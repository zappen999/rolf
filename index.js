const Rolf = require('./lib/rolf');

/**
 * Returns an instance of Rolf
 * @author Johan Kanefur <johan.canefur@gmail.com>
 * @param  {string}  host    Hostname
 * @param  {integer} port    Port
 * @param  {string}  uri     URI
 * @param  {object}  options Request options
 * @return {Rolf}         Instance of Rolf
 */
module.exports = function(host, port, uri, options) {
  return new Rolf(host, port, uri, options);
};
