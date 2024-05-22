var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType || (GenderType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
        this.stdId = 10;
        this.stdName = 'Ko';
        this.age = 20;
        this.gender = GenderType.Male;
        this.course = 'OOP';
        this.completed = true;
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log("\uC774\uB984 \uC124\uC815: ".concat(this.stdName));
    };
    return MyStudent;
}());
var getStdInfo = function (id) {
    return {
        stdId: id,
        stdName: 'Ko',
        gender: GenderType.Male,
        course: 'OOP',
        completed: true
    };
};
var setStdInfo = function (student) { };
var newStudent = new MyStudent();
newStudent.setName('sparrow');
