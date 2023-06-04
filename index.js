"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var isNothing = function (e) { return e === null || e === false || e === undefined; };
var isSomething = function (e) { return !isNothing(e); };
var Animation = (0, react_1.forwardRef)(function (_a, ref) {
    var keyframes = _a.keyframes, duration = _a.duration, children = _a.children, direction = _a.direction, iterations = _a.iterations, easing = _a.easing, fill = _a.fill, delay = _a.delay;
    var innerRef = (0, react_1.useRef)();
    var _b = (0, react_1.useState)(0), _ = _b[0], update = _b[1];
    var prev = (0, react_1.useRef)(children);
    var next = (0, react_1.useRef)(children);
    (0, react_1.useMemo)(function () {
        if (!(next.current !== children &&
            isSomething(prev.current) &&
            isNothing(children))) {
            next.current = children;
        }
    }, [children]);
    if (prev.current !== next.current) {
        prev.current = next.current;
    }
    var Component = (0, react_1.useMemo)(function () {
        if (isNothing(next.current)) {
            return null;
        }
        var NextChildren = next.current;
        return (0, react_1.cloneElement)(NextChildren, __assign(__assign({}, NextChildren.props), { ref: function (forwardedRef) {
                innerRef.current = forwardedRef;
                if (ref instanceof Function) {
                    ref(forwardedRef);
                }
                else if (ref === null || ref === void 0 ? void 0 : ref.current) {
                    ref.current = forwardedRef;
                }
            } }));
    }, [next.current]);
    (0, react_1.useEffect)(function () {
        console.log("innerRef.current", innerRef.current);
        var animate;
        if (innerRef.current) {
            animate = innerRef.current.animate(keyframes, {
                duration: duration,
                fill: fill,
                direction: direction,
                iterations: iterations,
                easing: easing,
                delay: delay,
                // composite: "accumulate",
            });
            animate.addEventListener("finish", handleFinish);
        }
        function handleFinish(e) {
            if (isNothing(children)) {
                next.current = children;
                update(function (c) { return c + 1; });
            }
            animate === null || animate === void 0 ? void 0 : animate.removeEventListener("finish", handleFinish);
        }
        return function () {
            animate === null || animate === void 0 ? void 0 : animate.removeEventListener("finish", handleFinish);
            animate === null || animate === void 0 ? void 0 : animate.cancel();
        };
    }, [children]);
    return Component;
});
exports.default = Animation;
//# sourceMappingURL=index.js.map