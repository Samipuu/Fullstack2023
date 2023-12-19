export interface results {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

/*const calculate = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const array = args.map((arg) => {
    if (isNaN(Number(arg)))
      throw new Error('Provided values were not numbers!');
    return Number(arg);
  });
  console.log(array);
  console.log(calculateExercises(array.slice(3, array.length), array[2]));
};*/

export const calculateExercises = (
  hours: number[],
  target: number
): results => {
  const trainingDays = hours.filter((d) => d != 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / hours.length;
  let rating = 1;
  if (target * 0.8 < average) {
    rating = 2;
  }
  if (average > target) {
    rating = 3;
  }
  let ratingDescription = 'More work is needed';
  if (rating === 2) {
    ratingDescription = 'Good job, you are almost there!';
  }
  if (rating === 3) {
    ratingDescription = 'Wonderful! You reached the target.';
  }
  return {
    periodLength: hours.length,
    trainingDays: trainingDays,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

//calculate(process.argv);
