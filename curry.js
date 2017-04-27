//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

function add () {
    var total = 0;
    var args = Array.prototype.slice.call(arguments, 0);
    for (var i=0; i<args.length; i++) {
        total += arguments[i];
    }
    return total;
}

function curry(orig_func) {
    var ap = Array.prototype;
    var args = arguments;

    return function() {
        function fn () {
            if (arguments.length != 0) {
                ap.push.apply(fn.args, arguments);
                return fn;
            } else {
                return orig_func.apply(this, fn.args);
            }
        }
        fn.args = ap.slice.call( args, 1 );
        return fn.apply( this, arguments );
    };

var f = curry(add);
var a = f(3)(4)(3);
var b = f(10)(3);
var result1 = a(); // returns 10
var result2 = b(); // returns 13


//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

let curry = (f, ...args) => {
    if (f.length <= args.length) {
        return f(...args);
    }
    return (...more) => curry(f, ...args, ...more);
};

//----------------------------------------------------------------------------
//
//----------------------------------------------------------------------------

let curry = (fn, ...args) => {
    let _curry = (args) =>
        args.length < fn.length
        ? (..._args) => _curry([...args, ..._args])
        : fn(...args);
    return _curry(args);
};
