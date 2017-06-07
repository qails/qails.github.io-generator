var ghpages = require('gh-pages');

ghpages.publish('dist', {
  repo: 'https://github.com/qailsjs/qails.git'
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('gh-pages published.');
  }
});
