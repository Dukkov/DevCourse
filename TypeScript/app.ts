interface Student {
  stdId: number;
  stdName?: string;
  age?: number;
  gender?: GenderType;
  course?: string;
  completed?: boolean;
  setName?: (name: string) => void;
  getName?: () => string;
}

enum GenderType {
  Male,
  Female
}

class MyStudent implements Student {
  stdId = 10;
  stdName = 'Ko';
  age = 20;
  gender = GenderType.Male;
  course = 'OOP';
  completed = true;

  setName(name: string): void {
    this.stdName = name;
    console.log(`이름 설정: ${this.stdName}`);
  }
}

const getStdInfo = (id: number): Student => {
  return {
    stdId: id,
    stdName: 'Ko',
    gender: GenderType.Male,
    course: 'OOP',
    completed: true
  };
};

const setStdInfo = (student: Student): void => {};

const newStudent = new MyStudent();

newStudent.setName('sparrow');
