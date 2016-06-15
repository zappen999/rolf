const rolf = require('../index');

const host = 'freja.hiof.no';
const port = 1935;
const uri = '/rtplive/_definst_/hessdalen03.stream';

const options = {
  method: 'DESCRIBE',
  cseq: 0,
};


rolf(host, port, uri, options).then(response => {
  console.log('Response HTTP code:', response.status);
}).catch(err => {
  console.log('Error', err);
});

options.method = 'PLAY';
options.cseq = 1;

rolf(host, port, uri, options).then(response => {
  console.log('Response HTTP code:', response.status);
}).catch(err => {
  console.log('Error', err);
});
