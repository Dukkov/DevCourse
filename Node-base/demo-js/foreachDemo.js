const arr1 = [1, 2, 3, 4, 5];

arr1.forEach((value, idx, arr2) => {
  arr2[idx] = value * 2;
  console.log(arr2);
});

let map = new Map();
map.set(7, "seven");
map.set(8, "eight");
map.set(9, "nine");