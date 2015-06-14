var SomethingElse;
(function (SomethingElse) {
    var OhHey = (function () {
        function OhHey() {
        }
        OhHey.prototype.doStuff = function () {
            alert('hi');
        };
        return OhHey;
    })();
    SomethingElse.OhHey = OhHey;
})(SomethingElse || (SomethingElse = {}));
//# sourceMappingURL=somthing-else.js.map