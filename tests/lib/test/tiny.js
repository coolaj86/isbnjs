// tiny.js
// tiny, lazy and buggy
if (typeof Test == 'undefined')
  var Test = {};

Test.Tiny = function() {
  this._initialize.apply(this, arguments);
};

Test.Tiny.prototype = {
  _initialize: function() {
    this._print =
      typeof GM_log == 'function'? GM_log:
      typeof console == 'object'? console.log:
      typeof WScript == 'object'?
        function(msg) { WScript.Echo(msg) }:
      typeof window == 'object'?
        function(msg) { window.document.body.innerHTML += msg + '<br />' }:
      typeof printf == 'function'?
        function(msg) { printf(msg + '\n') }:
      typeof print == 'function'? print:
      function() { /* Zzz */ };
  },

  test : function(tests) {
    if (!tests || tests.length == 0)
      throw "invalid test cases";
    var ok = 0, ng = 0;
    for (var n in tests) {
      if (!this['_' + tests[n][0]])
        throw "invalid test case: " + tests[n];
      this._print(
        (this['_' + tests[n][0]](tests[n])? (++ok, 'OK'): (++ng, 'NG')) +
        ' - ' + this._aToS(tests[n]));
    }
    this._print('OK: ' + ok + ', NG: ' + ng + ', ' + (ok / tests.length) * 100);
    return ng == 0;
  },

  _eq : function(args) {
    if (!args || args.length != 3)
      throw "invalid test case: " + args;
    return args[1] == args[2];
  },

  _t : function(args) {
    if (!args || args.length != 2)
      throw "invalid test case: " + args;
    return args[1];
  },

  _f : function(args) {
    if (!args || args.length != 2)
      throw "invalid test case: " + args;
    return !args[1];
  },

  _eval : function(args) {
    if (!args || args.length != 2)
      throw "invalid test case: " + args;
    return eval(args[1]);
  },

  _aToS : function(a) {
    return (
      typeof a.toSource == 'function'
        ? a.toSource()
        : '[' + a.join(', ') + ']');
  }
};
