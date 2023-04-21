// 짝수의 경우에만 4를 곱해서 합을 구하기 
const num = [1, 2, 3, 4, 5, 6];

// 짝수를 구해서 
function getAllEven(items) {
  return items.filter(item => item % 2 === 0);
}
// 거기에 4를 곱해서
function mutiple(items) {
  return items.map(item => item * 4);
}
// 걔들의 합을 구하기 
function gettotal(items) {
  items.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

const even = num.filter(item => item % 2 === 0);
const mutiple1 = even.map(item => item * 4);
const gettotal1 = mutiple1.reduce((a, b) => a + b, 0);
// 체이닝으로 변경!
const results = num
  .filter(item => item % 2 === 0)
  .map(item => item * 4)
  .reduce((a, b) => a + b, 0);





const animals = [
  { name: '사자', size: 'big', isAggressive: true, weight: 200 },
  { name: '고양이', size: 'small', isAggressive: false, weight: 2 },
  { name: '원숭이', size: 'medium', isAggressive: true, weight: 10 },
  { name: '낙타', size: 'big', isAggressive: false, weight: 90 },
]

// forEach
animals.forEach((animal, index) => {
  // console.log(animal, index);
})

// map : 특정 값으로 새로운 배열을 재생산
const animalName = animals.map((animal) => {
  return animal.name;
})
// console.log('animalName', animalName);

// filter : 특정 조건만 가진 값만 뽑아냄
const getSmallAnimals = animals.filter((animal) => {
  return animal.size === 'small'
})
// console.log('getSmallAnimals', getSmallAnimals);


// reduce : 배열안의 값들이 합을 구할때 사용 (0으로 초기값을 초기화 시켜줘야 함!!)
const getAllWeight = animals.reduce((acc, cur) => {
  return acc + cur.weight
}, 0);
// console.log('getAllWeight', getAllWeight);

