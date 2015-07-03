// Generated by CoffeeScript 1.9.0
var RouteItem, fs, path, _;

fs = require('fs-extra');

path = require('path');

_ = require('lodash')._;

RouteItem = (function() {
  function RouteItem(_at_route_item) {
    this.route_item = _at_route_item;
  }

  RouteItem.prototype.save = function(callback) {
    var p;
    return fs.ensureDir(path.dirname(p = this.route_item.route_file + ".js"), (function(_this) {
      return function(e) {
        if (e != null) {
          return callback.apply(_this, arguments);
        }
        return fs.writeFile(p, _this.template(_this.route_item), {
          flag: 'wx'
        }, function(e) {
          return callback != null ? callback.apply(_this, arguments) : void 0;
        });
      };
    })(this));
  };

  return RouteItem;

})();

RouteItem.__template__ = "/**\n * <%= name %>.js\n * Route Handler File\n */\nvar _app_ref;\nvar render = function(res, model) {\n  console.log(module.exports.templatePath);\n res.render( module.exports.templatePath, model, function(e,html) {\n   res.send(html);\n }); \n};\n\nvar <%= name %>Handler = function(req, res, next) {\n  var funcName = module.exports.queryMethod || 'find';\n  var collectionName = ((name = module.exports.collectionName) == \"\") ? null : name;\n\n  if (collectionName == null || _app_ref.models[collectionName] == void 0) {\n    return render(res, {});\n  }\n  \n  _app_ref.models[collectionName][funcName]( module.exports.query, function(e,record) {\n    if (e != null) {\n      console.log(e);\n      return res.sendStatus(500);\n    }\n    \n    render(res,record);\n  });\n};\n\nmodule.exports.init = function(app) {\n  _app_ref = app;\n  app.get(\"/<%= route %>\", <%= name %>Handler);\n};\n\nmodule.exports.collectionName = \"<%= route %>\";\nmodule.exports.queryMethod = \"<%= query_method %>\";\nmodule.exports.templatePath = \"<%= template_file %>\";\nmodule.exports.query = {};";

RouteItem.prototype.template = _.template(RouteItem.__template__);

module.exports = RouteItem;