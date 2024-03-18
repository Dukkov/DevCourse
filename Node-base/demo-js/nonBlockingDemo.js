const first = () => {
  console.log("The first");
}

const second = () => {
  console.log("The second");
}

const third = () => {
  console.log("The third");
}

first();
setTimeout(() => {
  second();
}, 2000);
third();