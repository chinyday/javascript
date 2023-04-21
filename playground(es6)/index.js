// 1. ternerty operator

// Bad code
function getResult(score) {
  let result;
  if (score > 5) {
    result = '👍';
  } else {
    result = '👎';
  }
  return result;
}
// Good code!
function getResult1(score) {
  return score > 5 ? '👍' : '👎';
}


// 2.nullish coalescing operator

// Bad code
function printMessage(text) {
  let message = text;
  if (message === null || message === undefined) {
    message = 'do not find text!';
  }
  console.log(message);
}
// Good code!
function printMessage1(text) {
  let message = text ?? 'do not find text!';
  console.log(message);
  // null, undefined만 체크가 가능!
}

function printMessage2(text = 'do not find text!') {
  let message = text ?? 'do not find text!';
  console.log(message);
  // 디폴트 값을 설정을 할 수 있지만, null의 경우에는 체크가 불가능함!
}

// 3. logical OR operator
function printMessage3(text) {
  let message = text || 'do not find text!';
  console.log(message);
  // falsy 인 경우에만 체크 
  // 0, -1, false, null, undefined, NaN, 빈문자열
}


// 4. object destructuring
const person = {
  name: 'jin',
  age: 10,
  tel: '01012345678',
}

// Bad code
function displayPerson(person) {
  displayName(person.name);
  displayAge(person.age);
  displayTel(person.tel);
}
// Good code!
function displayPerson1(person) {
  const { name, age, tel } = person;
  displayName(name);
  displayAge(age);
  displayTel(tel);
}


// 5. spread syntax -object
const item = { type: 'car', detail: '🚗' };
const made = { nation: 'Korea', year: '2023' };

const combined = { ...item, ...made };

// spread syntax -array
let animals = ['🐶', '🐱', '🐭'];
const animals1 = ['🐰', '🦊'];

// 맨 뒤에 추가하는 두가지 방법
animals.push('🐻');
animals = [...animals, '🐻'];

// 맨 앞에 추가하는 두가지 방법
animals.unshift('🐨');
animals = ['🐨', ...animals,];

// 배열들 합치기~
const combined2 = [...animals, ...animals1]


// 6. 옵셔널 체이닝
const bob = {
  name: 'bob',
  age: 10,
}
const anna = {
  name: 'anna',
  age: 10,
  job: {
    title: 'office worker',
  }
}
// Bad code
function getJob(person) {
  if (person.job && person.job.title) {
    console.log(person.job.title);
  }
}
// Good code!
function getJob1(person) {
  // job이 있다면!
  if (person.job?.title) {
    console.log(person.job.title);
  }
}
// better!
function getJob1(person) {
  const title = person.job?.title ?? 'no job yet!';
  console.log(title);
}


// 7. template literals
console.log(`${person.name}! your age is ${person.age}`);
// good!
const { name, age } = person;
console.log(`${name}! your age is ${age}`);
//better!!
function greating(person) {
  const { name, age } = person;
  console.log(`${name}! your age is ${age}`);
}

