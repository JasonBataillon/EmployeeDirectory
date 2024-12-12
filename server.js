// TODO: this file :)
const express = require('express');
const app = express();
const employees = require('./employees');

const init = async () => {
  app.listen(3000, () => console.log('Listening properly.'));
};

app.get('/', async (req, res) => {
  res.status(200).send('Hello employees!');
});

app.get('/employees', async (req, res) => {
  res.status(200).json(employees);
});

app.get('/employees/random', async (req, res) => {
  try {
    const randomNumber = Math.floor(Math.random() * employees.length);
    const randomEmployeeId = employees[randomNumber];

    res.status(200).json(randomEmployeeId);
  } catch (error) {
    console.error('Error fetching random employee:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/employees/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const filteredArray = employees.filter(
      (element) => Number(id) === element.id
    );
    if (filteredArray.length === 0) {
      throw new Error(`Employee ${id} does not exist.`);
    }
    res.status(200).json(filteredArray);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

init();
