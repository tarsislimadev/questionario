var mysql      = require('mysql');

module.exports = {
  db: {
    host     : 'p1us8ottbqwio8hv.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user     : 'rsinx9c64noxy2j3',
    password : 'n4dlx1rzaxllk1o0',
    database : 'tpsq096tu0zgycvj'
  }, 
  externalPaths: [
    '/', 
    '/login', 
    '/login/forget', 
    '/login/register'
  ]
};
