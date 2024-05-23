class Employee {
  constructor(
    private _empName: string,
    private _age: number,
    private _empJob: string = 'Freshman'
  ) {}

  get empName(): string {
    return this._empName;
  }

  set empName(name: string) {
    this._empName = name;
  }

  printEmp(): void {
    console.log(
      `${this._empName}의 나이는 ${this._age}이고, 직업은 ${this._empJob}입니다.`
    );
  }
}

const newEmp = new Employee('Ko', 20, 'IT');

newEmp.printEmp();
