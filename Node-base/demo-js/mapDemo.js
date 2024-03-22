const arr = [1, 2, 3, 4, 5];

const arr2 = arr.map((a, b, c) => {
  console.log(`a: ${a}, b: ${b}, c: ${c}`);
  return (a * 2);
});

console.log(arr2);