// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, cache, entry, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject.parcelRequire === 'function' &&
    globalObject.parcelRequire;
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  globalObject.parcelRequire = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7632e72c822f16e365c3c9e4e905d743":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "aff5bb77a712f328aa3906fbb4830a37";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH */

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
var checkedAssets, assetsToAccept, acceptedAssets; // eslint-disable-next-line no-redeclare

var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
  var port = HMR_PORT || location.port;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    acceptedAssets = {};
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH); // Handle HMR Update

      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || hmrAcceptCheck(global.parcelRequire, asset.id);

        if (didAccept) {
          handled = true;
        }
      });

      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });

        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];

          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('???? [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      } // Render the fancy html overlay


      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      document.body.appendChild(overlay);
    }
  };

  ws.onerror = function (e) {
    console.error(e.message);
  };

  ws.onclose = function (e) {
    console.warn('[parcel] ???? Connection to the HMR server was lost');
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
    console.log('[parcel] ??? Error resolved');
  }
}

function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';

  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          ???? ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }

  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
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
        parents.push([bundle, k]);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    if (link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  };

  newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now());
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      var absolute = /^https?:\/\//i.test(links[i].getAttribute('href'));

      if (!absolute) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    if (asset.type === 'css') {
      reloadCSS();
    } else {
      var fn = new Function('require', 'module', 'exports', asset.output);
      modules[asset.id] = [fn, asset.depsByBundle[bundle.HMR_BUNDLE_ID]];
    }
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

  return getParents(global.parcelRequire, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1]);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached && cached.hot) {
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
      var assetsToAlsoAccept = cb(function () {
        return getParents(global.parcelRequire, id);
      });

      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }

  acceptedAssets[id] = true;
}
},{}],"a4d6996de13e26b7c603051537a4d6bd":[function(require,module,exports) {
require('./bundle-manifest').register(JSON.parse("{\"aa3906fbb4830a37\":\"controller.aff5bb77.js\",\"507edb1975fe7f36\":\"delete-icon.d3b9b46d.svg\",\"e954127485d44948\":\"mark.ac88cffc.svg\"}"));
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"ba8df6b71e73837c465d69bebde6e64d":[function(require,module,exports) {
"use strict";

var mapping = {};

function register(pairs) {
  var keys = Object.keys(pairs);

  for (var i = 0; i < keys.length; i++) {
    mapping[keys[i]] = pairs[keys[i]];
  }
}

function resolve(id) {
  var resolved = mapping[id];

  if (resolved == null) {
    throw new Error('Could not resolve bundle with id ' + id);
  }

  return resolved;
}

module.exports.register = register;
module.exports.resolve = resolve;
},{}],"175e469a7ea7db1c8c0744d04372621f":[function(require,module,exports) {
"use strict";

var model = _interopRequireWildcard(require("./model.js"));

var _itemView = _interopRequireDefault(require("./views/itemView.js"));

var _paginationView = _interopRequireDefault(require("./views/paginationView.js"));

var _cartView = _interopRequireDefault(require("./views/cartView.js"));

var _orderView = _interopRequireDefault(require("./views/orderView.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const controlItems = function () {
  model.loadItemData();

  _itemView.default.render(model.ItemsPage()); // Render initial pagination button


  _paginationView.default.render(model.state.items);
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  _itemView.default.render(model.ItemsPage(goToPage)); // 2) Render NEW pagination  buttons


  _paginationView.default.render(model.state.items);
};

const controlAddOrder = function (e) {
  model.addOrder(e);

  _orderView.default.render(model.state.orders);
};

const controlDeleteOrder = function (e) {
  model.deleteOrder(e);
  console.log(model.state.orders);

  _orderView.default.render(model.state.orders); // model.deleteCart(e);
  // cartView.render(model.state.cart);

};

const controlAddCart = function (e) {
  model.addCart(e);

  _cartView.default.render(model.state.cart);
};

const controlDeleteCart = function (e) {
  model.deleteCart(e);

  _cartView.default.render(model.state.cart);
};

const controlIncOrder = function (e) {
  model.incOrder(e);

  _orderView.default.render(model.state.orders);
};

const controlDecOrder = function (e) {
  model.decOrder(e);

  _orderView.default.render(model.state.orders);
}; // Using the publisher subscriber pattern.
// The listener is in the VIEW and the handler is in the CONTROLLER


const init = function () {
  controlItems();

  _itemView.default.cartDisplay();

  _paginationView.default.addHandlerClick(controlPagination);

  _itemView.default.addHandlerAddOrder(controlAddOrder);

  _orderView.default.addHandlerDeleteOrder(controlDeleteOrder);

  _orderView.default.addHandlerIncOrder(controlIncOrder);

  _orderView.default.addHandlerDecOrder(controlDecOrder);

  _orderView.default.addHandlerAddCart(controlAddCart);

  _orderView.default.addHandlerDeleteCart(controlDeleteCart);
};

init();
},{"./model.js":"aabf248f40f7693ef84a0cb99f385d1f","./views/itemView.js":"89fbc9293843199a3fd18981a59ba6d1","./views/paginationView.js":"d2063f3e7de2e4cdacfcb5eb6479db05","./views/cartView.js":"23351d27245b4488c1df62eb54f888d0","./views/orderView.js":"acdc1c5bbd98816420c0040c5355e39a"}],"aabf248f40f7693ef84a0cb99f385d1f":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = exports.loadItemData = exports.incOrder = exports.deleteOrder = exports.deleteCart = exports.decOrder = exports.addOrder = exports.addCart = exports.ItemsPage = void 0;

var _data = require("./data.js");

const state = {
  items: {
    results: [],
    page: 1,
    resultsPerPage: 6
  },
  initialArr: [],
  orders: [],
  cart: [],
  cartCount: 0
}; // function geting the data from data.js and supplying the controller.

exports.state = state;

const loadItemData = function () {
  state.items.results = _data.data.map(rec => {
    return {
      id: rec.id,
      title: rec.title,
      image: rec.image_url,
      price: rec.price
    };
  });
  state.items.page = 1; // console.log(state.items.results);
}; // function dividing all elements into pages for pagination by slicing the array.


exports.loadItemData = loadItemData;

const ItemsPage = function () {
  let page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  state.items.page = page;
  const start = (page - 1) * state.items.resultsPerPage; // 0;

  const end = page * state.items.resultsPerPage; // 5;

  return state.items.results.slice(start, end);
}; // Storing Cart in the local storage


exports.ItemsPage = ItemsPage;

const persistCart = function () {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const persistOrder = function () {
  localStorage.setItem('order', JSON.stringify(state.orders));
}; // Adding each order


const addOrder = function (e) {
  const data = state.items.results;
  const foundData = data.find(el => el.id === +e.target.dataset.order);
  const destructureData = {
    ordered: true,
    counts: 1,
    updatedPrice: foundData.price,
    ...foundData
  }; // console.log(destructureData);

  state.initialArr.push(destructureData);
  state.initialArr.map(el => {
    if (!state.orders.includes(el) && el !== undefined) state.orders.push(el);
  }); // persistOrder();
}; // Deleting specific orders


exports.addOrder = addOrder;

const deleteOrder = function (e) {
  const index = state.orders.findIndex(el => el.id === +e.target.parentElement.parentElement.dataset.order);
  if (state.orders.includes(index)) return; // console.log(index);

  state.orders.splice(index, 1); // const ind = state.orders.map((el, i) => {
  //   if (el.id === +e.target.parentElement.parentElement.dataset.order)
  //     state.orders.splice(i, 1);
  // return i;
  // });
  // persistOrder();
}; // Add to Cart


exports.deleteOrder = deleteOrder;

const addCart = function (e) {
  const i = state.orders.find(el => el.id === +e.target.parentElement.parentElement.parentElement.dataset.order);
  let arr = [];
  arr.push(i);
  arr.forEach(el => {
    if (state.cart.includes(el)) return;
    state.cart.push(el);
    state.cartCount = state.cart.length; // console.log(state.cartCount);

    document.querySelector('.counts').textContent = state.cartCount;
  }); // persistCart();
}; // Delete Cart


exports.addCart = addCart;

const deleteCart = function (e) {
  const index = state.cart.findIndex(el => el.id === +e.target.parentElement.parentElement.parentElement.dataset.order); // console.log(index);

  state.cart.splice(index, 1);
  state.cartCount = state.cart.length; // console.log(state.cartCount);

  document.querySelector('.counts').textContent = state.cartCount; // persistCart();
}; // Increasing order


exports.deleteCart = deleteCart;

const incOrder = function (e) {
  const id = +e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.order;
  state.orders.find(el => {
    if (el.id === id) el.counts += 1; // console.log(el.counts);
  });
  updatePrice(id);
}; // Decrease Order


exports.incOrder = incOrder;

const decOrder = function (e) {
  const id = +e.target.parentElement.parentElement.parentElement.parentElement.parentElement.dataset.order;
  state.orders.find(el => {
    if (el.id === id && el.counts > 1) el.counts -= 1; // console.log(el.counts);
  });
  updatePrice(id);
}; // Multiply price by current number of elements and update


exports.decOrder = decOrder;

const updatePrice = function (id) {
  state.orders.find(el => {
    if (el.id === id) {
      const priceOnly = +el.price.replace('$', '');
      el.updatedPrice = `$${(priceOnly * el.counts).toFixed(2)}`; // console.log(el.updatedPrice);
    }
  });
}; // initialises the local storage at the load of the page.
// const init = function () {
//   const storage1 = localStorage.getItem('cart');
//   if (storage1) state.cart = JSON.parse(storage1);
// };
// init();
// const init2 = function () {
//   const storage2 = localStorage.getItem('order');
//   if (storage2) state.orders = JSON.parse(storage2);
// };
// init2();
// clears the local storage for easy debugging


const clearBookmarks = function () {
  localStorage.clear('cart');
  localStorage.clear('order');
}; // clearBookmarks();
},{"./data.js":"679bb4f29a008ae758b39532d0677dc9"}],"679bb4f29a008ae758b39532d0677dc9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = void 0;
const data = [{
  id: 65644,
  title: "alpha neo dark grey",
  image_url: "https://eu.muroexe.com/100-large_default/alpha-neo-dark-grey.jpg",
  price: "$59.40"
}, {
  id: 32145,
  title: "Progress Depot Swim Shorts - Black",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/lead_c5298028-14d6-4c6a-8412-876795488adb_540x.jpg?v=1648203463",
  price: "$38"
}, {
  id: 18767,
  title: "Sunglasses Eclipse Beige",
  image_url: "https://eu.muroexe.com/1367-large_default/sunglasses-eclipse-beige.jpg",
  price: "$49"
}, {
  id: 31475,
  title: "304 Service Fatigue Pants - Olive",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/delphecom_0033_2D9A3060_540x.jpg?v=1639754921",
  price: "$83"
}, {
  id: 79742,
  title: "Bad Decisions T-Shirt - Washed Black",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/ILLWOOKIE-ECOM_0006_1Q9A2887_540x.png?v=1655364290",
  price: "$39"
}, {
  id: 10407,
  title: "Wayfare Waxed Canvas Jacket",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/wayfaredelph2_540x.jpg?v=1646066349",
  price: "$144"
}, {
  id: 52154,
  title: "Saguaro Fedora - Ecru",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/Ecom-Photo-Size_0003_2D9A9775_540x.png?v=1652950460",
  price: "$42"
}, {
  id: 21854,
  title: "Progress Tote Bag",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/prespringecom_0005_2D9A0004_4f59a2df-8b58-4538-b0ec-a492b3c217da_540x.jpg?v=1644594261",
  price: "$13.50"
}, {
  id: 99812,
  title: "Good At Bad Decisions Leather Wallet",
  image_url: "https://cdn.shopify.com/s/files/1/0235/2617/products/DSCF7758_540x.jpg?v=1637249768",
  price: "$70"
}, {
  id: 33017,
  title: "Block Beige",
  image_url: "https://eu.muroexe.com/382-large_default/block-beige.jpg",
  price: "$41.40"
}, {
  id: 330178,
  title: "Fufu",
  image_url: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnZXJpYSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  price: "$4.40"
}, {
  id: 323478,
  title: "Chicken",
  image_url: "https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmlnZXJpYSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  price: "$10.40"
}, {
  id: 60178,
  title: "Tomato",
  image_url: "https://images.unsplash.com/photo-1611754349119-9516a4e426dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5pZ2VyaWElMjBmb29kfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
  price: "$21.40"
}, {
  id: 330623472178,
  title: "Cakes",
  image_url: "https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmlnZXJpYSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  price: "$1.40"
}, {
  id: 3307545178,
  title: "Bag",
  image_url: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/32/699137/1.jpg?4679",
  price: "$13.44"
}, {
  id: 47857458,
  title: "Hoodie",
  image_url: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/23/304238/1.jpg?5069",
  price: "$4.20"
}, {
  id: 34457890485,
  title: "Television",
  image_url: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/55/467099/1.jpg?7682",
  price: "$12.40"
}, {
  id: 3475893485,
  title: "Fufu",
  image_url: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmlnZXJpYSUyMGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60",
  price: "$3.2"
}, {
  id: 987458,
  title: "Game",
  image_url: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/00/109048/1.jpg?6607",
  price: "$90.50"
}, {
  id: 87458940857,
  title: "Game Pad",
  image_url: "https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/95/120253/1.jpg?2831",
  price: "$44.40"
}, {
  id: 53454,
  title: "Men's Slim-Fit 9\" Short",
  image_url: "https://m.media-amazon.com/images/I/71xy7iXBJ-S._AC_UX342_.jpg",
  price: "$17.40"
}, {
  id: 53455,
  title: "Men's Classic-Fit Wrinkle-Resistant Flat-Front Chino Pant",
  image_url: "https://m.media-amazon.com/images/I/61X-QR1b61S._AC_UX342_.jpg",
  price: "$17.70"
}, {
  id: 53456,
  title: "Men's Slim-Fit 9\" ShortEssentials Men's Hooded Fleece Sweatshirt",
  image_url: "https://m.media-amazon.com/images/I/81Xf5Ve1YgL._AC_UX342_.jpg",
  price: "$24.00"
}, {
  id: 53457,
  title: "The Drop Women's Karina Cropped Boxy Blazer",
  image_url: "https://m.media-amazon.com/images/I/814SJVLQcxL._AC_UX342_.jpg",
  price: "$69.90"
}, {
  id: 53458,
  title: "BB DAKOTA Women's Victroiously Yours Woven Top",
  image_url: "https://m.media-amazon.com/images/I/71sD+tfInAL._AC_UY445_.jpg",
  price: "$30.93"
}, {
  id: 53459,
  title: "Levi's Women's Ex-Boyfriend Trucker Jacket",
  image_url: "https://m.media-amazon.com/images/I/51fnh5a-ACL._AC_UX385_.jpg",
  price: "$53.70"
}, {
  id: 53460,
  title: "BTFBM Women One Shoulder Sleeveless Casual Summer Dresses",
  image_url: "https://m.media-amazon.com/images/I/81SbGliMb6L._AC_UY445_.jpg",
  price: "$39.99"
}, {
  id: 53461,
  title: "Women's Flat Banded Sandal",
  image_url: "https://m.media-amazon.com/images/I/61UkfFmypdL._AC_UX395_.jpg",
  price: "$20.70"
}, {
  id: 53462,
  title: "Women's Short-Sleeve Scoop Neck Swing Dress",
  image_url: "https://m.media-amazon.com/images/I/81zIttd7fbL._AC_UX342_.jpg",
  price: "$17.40"
}, {
  id: 53463,
  title: "Men's Regular-fit Short-Sleeve Print Shirt",
  image_url: "https://m.media-amazon.com/images/I/91JstEj4kEL._AC_UX342_.jpg",
  price: "$18.50"
}];
exports.data = data;
},{}],"89fbc9293843199a3fd18981a59ba6d1":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("../data.js");

var _view = _interopRequireDefault(require("./view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ItemView extends _view.default {
  _parentElement = document.querySelector('.items');

  addHandlerAddOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.item');
      if (!btn) return;
      document.querySelector('.orders').style.display = 'block';
      handler(e);
    });
  }

  cartDisplay() {
    document.querySelector('.cart-icon-img').addEventListener('click', function () {
      document.querySelector('.cart').classList.toggle('cart-display');
    });
  }

  _generateMarkup() {
    return this._data.map(result => {
      // console.log(result);
      return ` <div class="item"  id="${result.id}" data-order="${result.id}">
         <img src="${result.image}" alt="item" />
         <p class="item-title">${result.title}</p>
         <p class="price">${result.price}</p>
       </div>
       `;
    }).join('');
  }

}

var _default = new ItemView();

exports.default = _default;
},{"./view.js":"6a3957d8744bf1d70b2b44f3726dda59","../data.js":"679bb4f29a008ae758b39532d0677dc9"}],"6a3957d8744bf1d70b2b44f3726dda59":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class View {
  _data;

  render(data) {
    let render = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    this._data = data;

    const markup = this._generateMarkup();

    if (render) this._clear();

    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

}

exports.default = View;
},{}],"d2063f3e7de2e4cdacfcb5eb6479db05":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PaginationView extends _view.default {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return; // console.log(btn);

      const goToPage = +btn.dataset.goto; // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkup() {
    // console.log(this._data);
    const curPage = this._data.page; //items.page

    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); // rounds it up to the nearest integer
    // Page 1, and there are other page

    if (curPage === 1 && numPages > 1) {
      return `
            <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1} &#8594;</span>
            </button>
          `;
    } // Last Page


    if (curPage === numPages && numPages > 1) {
      return `
          <button  data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
          <span>&#8592; Page ${curPage - 1}</span>
        </button>
          `;
    } // Other Page


    if (curPage < numPages) {
      return `
              <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                  <span>&#8592; Page ${curPage - 1}</span>
              </button>
  
              <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                  <span>Page ${curPage + 1} &#8594;</span>
              </button>
        `;
    } // Page 1, and there are NO other pages


    return '';
  }

}

var _default = new PaginationView();

exports.default = _default;
},{"./view":"6a3957d8744bf1d70b2b44f3726dda59"}],"23351d27245b4488c1df62eb54f888d0":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

var _deleteIcon = _interopRequireDefault(require("url:../../img/delete-icon.svg"));

var _mark = _interopRequireDefault(require("url:../../img/mark.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CartView extends _view.default {
  _parentElement = document.querySelector('.cart__list');

  _generateMarkup() {
    return this._data.map(result => {
      // console.log(result);
      return `
        <div class="order-preview" id="${result.id}" data-order=${result.id}>
        <div class="items-title ">
          <h3>${result.title}</h3>
        </div>
    
        <div class="order-item-main">
          <div class="img">
            <img src="${result.image}" alt="" />
          </div>
          <div class="cart-title">
            <p>${result.title}</p>
          </div>

          <div class="preview-footer2">
          <div class="price cart-add">
            <h4>${result.updatedPrice}</h4>
          </div>
        </div>
      </div>
        </div>
    
       
                  `;
    }).join('');
  }

}

var _default = new CartView();

exports.default = _default;
},{"./view":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/delete-icon.svg":"3eaa29c2ea1c99972d0b3b16a515809f","url:../../img/mark.svg":"bedc69fce07105203932666537271a41"}],"3eaa29c2ea1c99972d0b3b16a515809f":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("aa3906fbb4830a37", "507edb1975fe7f36");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"2146da1905b95151ed14d455c784e7b7":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"1b9943ef25c7bbdf0dd1b9fa91880a6c":[function(require,module,exports) {
"use strict";

var resolve = require('./bundle-manifest').resolve;

module.exports = function (fromId, toId) {
  return relative(dirname(resolve(fromId)), resolve(toId));
};

function dirname(_filePath) {
  if (_filePath === '') {
    return '.';
  }

  var filePath = _filePath[_filePath.length - 1] === '/' ? _filePath.slice(0, _filePath.length - 1) : _filePath;
  var slashIndex = filePath.lastIndexOf('/');
  return slashIndex === -1 ? '.' : filePath.slice(0, slashIndex);
}

function relative(from, to) {
  if (from === to) {
    return '';
  }

  var fromParts = from.split('/');

  if (fromParts[0] === '.') {
    fromParts.shift();
  }

  var toParts = to.split('/');

  if (toParts[0] === '.') {
    toParts.shift();
  } // Find where path segments diverge.


  var i;
  var divergeIndex;

  for (i = 0; (i < toParts.length || i < fromParts.length) && divergeIndex == null; i++) {
    if (fromParts[i] !== toParts[i]) {
      divergeIndex = i;
    }
  } // If there are segments from "from" beyond the point of divergence,
  // return back up the path to that point using "..".


  var parts = [];

  for (i = 0; i < fromParts.length - divergeIndex; i++) {
    parts.push('..');
  } // If there are segments from "to" beyond the point of divergence,
  // continue using the remaining segments.


  if (toParts.length > divergeIndex) {
    parts.push.apply(parts, toParts.slice(divergeIndex));
  }

  return parts.join('/');
}

module.exports._dirname = dirname;
module.exports._relative = relative;
},{"./bundle-manifest":"ba8df6b71e73837c465d69bebde6e64d"}],"bedc69fce07105203932666537271a41":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + require('./relative-path')("aa3906fbb4830a37", "e954127485d44948");
},{"./bundle-url":"2146da1905b95151ed14d455c784e7b7","./relative-path":"1b9943ef25c7bbdf0dd1b9fa91880a6c"}],"acdc1c5bbd98816420c0040c5355e39a":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _view = _interopRequireDefault(require("./view"));

var _deleteIcon = _interopRequireDefault(require("url:../../img/delete-icon.svg"));

var _mark = _interopRequireDefault(require("url:../../img/mark.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrderView extends _view.default {
  _parentElement = document.querySelector('.order-items');

  addHandlerAddCart(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.add-to-cart');

      if (btn) {
        handler(e);
        e.target.style.display = 'none';
        e.target.nextElementSibling.style.display = 'block';
      }
    });
  }

  addHandlerDeleteCart(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.mark');

      if (btn) {
        handler(e);
        e.target.style.display = 'none';
        e.target.previousElementSibling.style.display = 'block';
      }
    });
  }

  addHandlerDeleteOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('delete');
      if (!btn) return;
      handler(e);
    });
  }

  addHandlerDecOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('minus');
      if (!btn) return;
      handler(e);
    });
  }

  addHandlerIncOrder(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.classList.contains('plus');
      if (!btn) return;
      handler(e);
    });
  }

  _generateMarkup() {
    return this._data.map(result => {
      return `
        <div class="order-preview" id="${result.id}" data-order=${result.id}>
        <div class="items-title">
          <h3>${result.title}</h3>
          <img class="delete" src="${_deleteIcon.default}" alt="" />
        </div>
    
        <div class="order-item-main">
          <div class="img">
            <img src="${result.image}" alt="" />
          </div>
          <div class="title">
            <p>${result.title}</p>
          </div>
          <div class="quantity">
            <div class="quantity-heading">
              <p>Quantity</p>
              <div class="increments">
                <p class="sign minus">&minus;</p>
                <p>${result.counts}</p>
                <p class="sign plus">&plus;</p>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-footer">
          <div>
            <p class="add-to-cart">Add to Cart</p>
            <img class="mark" src="${_mark.default}" alt="" />
          </div>
          <div class="price">
            <h4>${result.updatedPrice}</h4>
          </div>
        </div>
      </div>
                  `;
    }).join('');
  }

}

var _default = new OrderView();

exports.default = _default;
},{"./view":"6a3957d8744bf1d70b2b44f3726dda59","url:../../img/mark.svg":"bedc69fce07105203932666537271a41","url:../../img/delete-icon.svg":"3eaa29c2ea1c99972d0b3b16a515809f"}]},{},["7632e72c822f16e365c3c9e4e905d743","a4d6996de13e26b7c603051537a4d6bd","175e469a7ea7db1c8c0744d04372621f"], null)

//# sourceMappingURL=controller.aff5bb77.js.map
