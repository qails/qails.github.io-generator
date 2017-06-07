var ghpages = require('gh-pages');

ghpages.publish('dist', {
  branch: 'master',
  repo: 'https://github.com/qailsjs/qailsjs.github.io.git'
}, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('gh-pages published.');
  }
});
