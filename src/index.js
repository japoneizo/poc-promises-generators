
require('console-stamp')(console, '[HH:MM:ss.l]');
var co = require('co');

const promise1 = () => {
  return new Promise(((resolve, reject) => {
    setTimeout(() => resolve("Promise 1"), 5000);
  }));
};

const promise2 = () => {
  return new Promise(((resolve, reject) => {
    setTimeout(() => resolve("Promise 2"), 10000);
  }));
};


// function usingPromises() {
//   promise1().then(res => {
//     console.log(`in a(), after promise1()`);
//     promise2().then(res2 => {
//       console.log(`in a(): ${res} || ${res2}`);
//     });
//   });
// }


function usingPromises() {
  return new Promise(((resolve, reject) => {
    promise1().then(res => {
      console.log(`in a(), after promise1()`);
      promise2().then(res2 => {
        //console.log(`in a(): ${res} || ${res2}`);
        resolve(`in a(): ${res} || ${res2}`);
      });
    });
  }));
}

async function usingAsyncAwait() {
  const a1 = await promise1();
  console.log(`in b(), after promise1()`);
  const a2 = await promise2();
  //console.log(`in b(): ${a1} || ${a2}`);
  return `in b(): ${a1} || ${a2}`;
}

function* usingGenerators() {
  const a1 = yield promise1();
  console.log(`in c(), after promise1()`);
  const a2 = yield promise2();

  //console.log(`in c(): ${a1} || ${a2}`);
  return `in c(): ${a1} || ${a2}`;
}


// usingPromises();
// usingAsyncAwait();
// co(usingGenerators);

const usingPromisesResult = usingPromises();
const usingAsynAwaitResult = usingAsyncAwait();
const usingGeneratorsResult = co(usingGenerators);

usingPromisesResult.then(a => console.log(`usingPromisesResult: ${a}`));
usingAsynAwaitResult.then(a => console.log(`usingAsynAwaitResult: ${a}`));
usingGeneratorsResult.then(a => console.log(`usingGeneratorsResult: ${a}`));

