const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Done'), 3000);
})
  .then((result, err) => {
    console.log(result);

    return result + '!!!';
  })
  .then((result, err) => {
    console.log(result);
    return result + '!!!!!';
  })
  .then((result, err) => {
    console.log(result);
  });
