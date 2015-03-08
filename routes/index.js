module.exports = function(app) {

  app.get('/', function(req, res, next) {
    res.render('index.html', {env: app.get('environment')});
  });

  app.get('/:page', function(req, res, next) {
    var page = req.params.page;
    res.render(page, {env: app.get('environment')});
  });

  app.get('*', function(req, res, next) {
    var err = new Error();
    err.status = 404;
    return next(err);
  });

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
        error: err.status,
        env: app.get('environment')
    });
  });
}
