import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi?', (req, res) => {
  console.log(req.query);
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    throw new Error('malformatted parameters');
  }
  res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
});

app.post('/exercises', (req, res) => {
  if (!(req.body.target as number) || !(req.body.daily_exercises as number))
    throw new Error('parameters missing');

  if (isNaN(Number(req.body.target)))
    throw new Error('malformatted parameters');
  const array = req.body.daily_exercises.map((val: any) => {
    if (isNaN(Number(val)))
      throw new Error('Provided values were not numbers!');
    return Number(val);
  });
  const result = calculateExercises(
    array as Array<number>,
    req.body.target as number
  );
  res.send(JSON.stringify(result));
  //console.log(req.params);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
