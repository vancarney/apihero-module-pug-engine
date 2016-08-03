// Generated by CoffeeScript 1.10.0
var TemplateManager, _, _p, browserify, fs, path, pug_runtime, router;

_ = require('lodash')._;

fs = require('fs-extra');

path = require('path');

router = require('apihero-module-pug-router');

browserify = require('apihero-module-browserify');

pug_runtime = require('pug-runtime');

if (global.app_root == null) {
  global.app_root = process.cwd();
}

module.exports.browserify = browserify;

module.exports.pug = {};

_.each(router['pug'], (function(_this) {
  return function(fun, param) {
    return module.exports.pug[param] = fun;
  };
})(this));

module.exports.router = router;

_p = path.join('', 'node_modules', 'pug', 'runtime.js');

module.exports['pug-runtime'] = fs.readFileSync(_p, 'utf8');

module.exports.init = function(app, options, callback) {
  var defaults, tMan;
  defaults = {
    distDir: path.join(app_root || process.cwd(), 'dist'),
    buildDir: path.join(app_root || process.cwd(), 'build'),
    fileName: 'templates.js',
    templateDirectives: {}
  };
  this.options = _.extend({}, defaults, options);
  router.init(app, options, (function(_this) {
    return function() {
      return callback.apply(_this, arguments);
    };
  })(this));
  tMan = new TemplateManager;
  return app.once('ahero-modules-loaded', (function(_this) {
    return function() {
      var out, outFile;
      out = "'use strict';\n\n";
      (_this.configs = app.ApiHero.getModuleConfigs()).push({
        templates: path.join(app_root, "views")
      });
      _.each(_this.configs, function(config) {
        return out += tMan.processConfig(config);
      });
      outFile = path.join(_this.options.buildDir, _this.options.fileName);
      return fs.outputFile(outFile, out, function(e) {
        var error;
        try {
          browserify.browserify(outFile).bundle().pipe(fs.createWriteStream(_this.options.distDir));
        } catch (error) {
          e = error;
          console.log(e);
          return callback("unable to create template client");
        }
        return callback(e != null ? e : null);
      });
    };
  })(this));
};

TemplateManager = require('./TemplateManager');