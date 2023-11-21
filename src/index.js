import './index.scss';

const myObj = () => {
  return {
    a: 1,
    b: 2,
    c: 3,
  };
};

const name = 'My name is';

const age = 48;

console.log(name, ':', myObj());

function getAge(age) {
  return `Мне: ${age} года ))`;
}

console.log(getAge(age));
