// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"weatherData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ui = _interopRequireDefault(require("./ui.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var weatherData = {
  history: [],
  city: "",
  country: "",
  api_key: "026eaa58510fa593c3a01155a70a99d5",
  getWeather: function getWeather() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=".concat(this.city, ",").concat(this.country, "&units=metric&appid=").concat(this.api_key)).then(function (res) {
      return res.json();
    }).then(function (data) {
      return _ui.default.handleRemoteData(data);
    }).catch(function (err) {
      return _ui.default.showMsg(err.message);
    });
  }
};
var _default = weatherData;
exports.default = _default;
},{"./ui.js":"ui.js"}],"storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _weatherData = _interopRequireDefault(require("./weatherData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var storage = {
  getData: function getData() {
    var data = JSON.parse(localStorage.getItem("weather-history"));

    if (data) {
      _weatherData.default.history = JSON.parse(JSON.stringify(data));
    } else {
      _weatherData.default.history = [];
    }
  },
  saveData: function saveData(data) {
    localStorage.setItem("weather-history", JSON.stringify(data));
  }
};
var _default = storage;
exports.default = _default;
},{"./weatherData.js":"weatherData.js"}],"ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _weatherData = _interopRequireDefault(require("./weatherData.js"));

var _storage = _interopRequireDefault(require("./storage.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UI = {
  loadSelector: function loadSelector() {
    var weatherForm = document.querySelector("#weatherForm");
    var countryInput = document.querySelector("#countryInput");
    var cityInput = document.querySelector("#cityInput");
    var weatherResult = document.querySelector("#weatherResult");
    var cloudIconEl = document.querySelector("#cloudIconEl");
    var placeEl = document.querySelector("#placeEl");
    var tempEl = document.querySelector("#tempEl");
    var weatherEl = document.querySelector("#weatherEl");
    var humidityEl = document.querySelector("#humidityEl");
    var pressureEl = document.querySelector("#pressureEl");
    var alertToast = document.querySelector("#alertToast");
    var alertMsg = document.querySelector("#alertMsg");
    var historyContainer = document.querySelector("#historyContainer");
    var historyTrigger = document.querySelector("#historyTrigger");
    var historyEmptyAlert = document.querySelector("#historyEmptyAlert");
    return {
      weatherForm: weatherForm,
      countryInput: countryInput,
      cityInput: cityInput,
      weatherResult: weatherResult,
      cloudIconEl: cloudIconEl,
      placeEl: placeEl,
      tempEl: tempEl,
      weatherEl: weatherEl,
      humidityEl: humidityEl,
      pressureEl: pressureEl,
      alertToast: alertToast,
      alertMsg: alertMsg,
      historyContainer: historyContainer,
      historyTrigger: historyTrigger,
      historyEmptyAlert: historyEmptyAlert
    };
  },
  loadHistory: function loadHistory() {
    var _this = this;

    var _this$loadSelector = this.loadSelector(),
        historyEmptyAlert = _this$loadSelector.historyEmptyAlert;

    _storage.default.getData();

    if (_weatherData.default.history.length > 0) {
      _weatherData.default.history.forEach(function (item) {
        _this.displayHistoryItem(item);
      });
    } else {
      historyEmptyAlert.classList.remove("d-none");
    }
  },
  displayHistoryItem: function displayHistoryItem(data) {
    var _this$loadSelector2 = this.loadSelector(),
        historyContainer = _this$loadSelector2.historyContainer,
        historyEmptyAlert = _this$loadSelector2.historyEmptyAlert;

    var cityName = data.cityName,
        temp = data.temp,
        weather = data.weather,
        humidity = data.humidity,
        pressure = data.pressure,
        icon = data.icon,
        time = data.time;

    if (!historyEmptyAlert.classList.contains("d-none")) {
      historyEmptyAlert.classList.add("d-none");
    }

    var div = document.createElement("div");
    div.classList.add("history-item");
    div.innerHTML = "\n            <div class=\"history-item-heading\">\n                <h3 class=\"history-place\">".concat(cityName, "</h3>\n                <p class=\"history-date\">").concat(moment(time).format("MMM Do YY, hh:mm a"), "</p>\n            </div>\n            <div class=\"history-item-body\">\n                <div class=\"history-icon\">\n                    <img src=\"https://openweathermap.org/img/w/").concat(icon, ".png\"></img>\n                </div>\n                <div class=\"history-details\">\n                    <h3 class=\"history-temp\">").concat(temp, "&deg;C</h3>\n                    <h6 class=\"history-weather\">").concat(weather, "</h6>\n                    <p>Humidity: <span class=\"history-humidity\">").concat(humidity, "%</span> <span class=\"mx-2\">|</span> Pressure: <span class=\"history-pressure\">").concat(pressure, "hPa</span></p>\n                </div>\n            </div>\n        ");
    historyContainer.insertAdjacentElement("afterbegin", div);
  },
  showMsg: function showMsg(msg) {
    var _this$loadSelector3 = this.loadSelector(),
        alertToast = _this$loadSelector3.alertToast,
        alertMsg = _this$loadSelector3.alertMsg;

    var icon = "<i class=\"fas fa-times-circle\"></i>";
    alertMsg.innerHTML = icon + " " + msg;
    var toast = new bootstrap.Toast(alertToast, {
      delay: 2500
    });
    toast.show();
  },
  checkValidity: function checkValidity(city) {
    if (city === "") {
      return false;
    } else {
      return true;
    }
  },
  getInputValue: function getInputValue() {
    var _this$loadSelector4 = this.loadSelector(),
        countryInput = _this$loadSelector4.countryInput,
        cityInput = _this$loadSelector4.cityInput;

    var countryInputValue = countryInput.value.trim();
    var cityInputValue = cityInput.value.trim();
    var isValid = this.checkValidity(cityInputValue);

    if (isValid) {
      // set city and country to weather data
      _weatherData.default.city = cityInputValue;
      _weatherData.default.country = countryInputValue; // this.handleRemoteData();

      _weatherData.default.getWeather();
    } else {
      // show alert message
      this.showMsg("Error! Please enter your city.");
    }
  },
  resetInput: function resetInput() {
    var _this$loadSelector5 = this.loadSelector(),
        weatherForm = _this$loadSelector5.weatherForm;

    weatherForm.reset();
  },
  addToHistory: function addToHistory(data) {
    _weatherData.default.history.push(data);

    _storage.default.saveData(_weatherData.default.history);

    this.displayHistoryItem(data);
  },
  displayWeatherReport: function displayWeatherReport(data) {
    var _this$loadSelector6 = this.loadSelector(),
        weatherResult = _this$loadSelector6.weatherResult,
        placeEl = _this$loadSelector6.placeEl,
        tempEl = _this$loadSelector6.tempEl,
        cloudIconEl = _this$loadSelector6.cloudIconEl,
        weatherEl = _this$loadSelector6.weatherEl,
        humidityEl = _this$loadSelector6.humidityEl,
        pressureEl = _this$loadSelector6.pressureEl,
        historyContainer = _this$loadSelector6.historyContainer,
        historyTrigger = _this$loadSelector6.historyTrigger;

    var main = data.main,
        cityName = data.name,
        weather = data.weather;

    if (window.innerWidth < 992 && historyContainer.classList.contains("show")) {
      historyContainer.classList.remove("show");
      historyTrigger.classList.remove("active");
    } // Display on UI


    placeEl.textContent = cityName;
    tempEl.innerHTML = main.temp + " &deg;C";
    weatherEl.textContent = weather[0].main;
    humidityEl.textContent = main.humidity + "%";
    pressureEl.textContent = main.pressure + "hPa";
    cloudIconEl.setAttribute("src", "https://openweathermap.org/img/w/".concat(weather[0].icon, ".png"));
    weatherResult.classList.remove("d-none"); // Taking data for history

    var now = moment();
    var historyData = {
      cityName: cityName,
      temp: main.temp,
      weather: weather[0].main,
      humidity: main.humidity,
      pressure: main.pressure,
      icon: weather[0].icon,
      time: now
    };
    this.addToHistory(historyData);
  },
  handleRemoteData: function handleRemoteData(data) {
    var cod = data.cod,
        message = data.message;

    if (cod === "404") {
      this.showMsg(message);
    } else {
      this.displayWeatherReport(data);
    }
  },
  init: function init() {
    var _this2 = this;

    var _this$loadSelector7 = this.loadSelector(),
        weatherForm = _this$loadSelector7.weatherForm,
        historyTrigger = _this$loadSelector7.historyTrigger,
        historyContainer = _this$loadSelector7.historyContainer;

    weatherForm.addEventListener("submit", function (e) {
      e.preventDefault();

      _this2.getInputValue();

      _this2.resetInput();
    });
    historyTrigger.addEventListener("click", function () {
      historyContainer.classList.toggle("show");
      historyTrigger.classList.toggle("active");
    });
    window.addEventListener("DOMContentLoader", this.loadHistory());
  }
};
var _default = UI;
exports.default = _default;
},{"./weatherData.js":"weatherData.js","./storage.js":"storage.js"}],"main.js":[function(require,module,exports) {
"use strict";

var _ui = _interopRequireDefault(require("./ui.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initializing weather app
_ui.default.init();
},{"./ui.js":"ui.js"}],"C:/Users/Asif/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "10155" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/Asif/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map