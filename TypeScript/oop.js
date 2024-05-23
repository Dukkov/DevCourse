var Employee = /** @class */ (function () {
    function Employee(_empName, _age, _empJob) {
        if (_empJob === void 0) { _empJob = 'Freshman'; }
        var _this = this;
        this._empName = _empName;
        this._age = _age;
        this._empJob = _empJob;
        this.printEmp = function () {
            console.log("".concat(_this._empName, "\uC758 \uB098\uC774\uB294 ").concat(_this._age, "\uC774\uACE0, \uC9C1\uC5C5\uC740 ").concat(_this._empJob, "\uC785\uB2C8\uB2E4."));
        };
    }
    Object.defineProperty(Employee.prototype, "empName", {
        get: function () {
            return this._empName;
        },
        set: function (name) {
            this._empName = name;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var newEmp = new Employee('Ko', 20, 'IT');
newEmp.printEmp();
