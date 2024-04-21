const f = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('done'), 3000);
  });
  const result = await promise;

  console.log(result);
};
