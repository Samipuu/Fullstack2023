export const calculateBmi = (a: number, b: number) => {
  const val = b / (a * 0.01) ** 2;

  switch (true) {
    case val < 18.5:
      return 'underweight';
    case val < 25:
      return 'normal weight';
    case val < 30:
      return 'overweight';
    case val >= 30:
      return 'obese';
  }

  return null;
};

/*const cal = (args: string[]) => {
  if (args.length > 4) {
    throw new Error('Too many arguments')
  }
  if (args.length < 4) throw new Error('Not enough arguments')

  let array = args.map((arg) => {
    if (isNaN(Number(arg))) throw new Error('Provided values were not numbers!')
    return Number(arg)
  })

  console.log(calculateBmi(array[2], array[3]))
}

if (process.argv) cal(process.argv)
*/
//console.log(calculateBmi(180, 74))
