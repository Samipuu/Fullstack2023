import { useState } from 'react';
import { weather, visibility } from './types';

const DiaryForm = ({ newDiaryEntry }: { newDiaryEntry: Function }) => {
  const [weatherVal, setWeatherVal] = useState<weather>(
    Object.values(weather)[0]
  );
  const [visibilityVal, setVisibilityVal] = useState<visibility>(
    Object.values(visibility)[0]
  );
  const [date, setDate] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    newDiaryEntry({
      date: date,
      weather: weatherVal,
      visibility: visibilityVal,
      comment: comment,
    });
    setDate('');
    setComment('');
    setWeatherVal(Object.values(weather)[0]);
    setVisibilityVal(Object.values(visibility)[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      Date:
      <input
        value={date}
        onChange={({ target }) => setDate(target.value)}
        type='date'
      ></input>
      <br />
      Weather:
      <select
        value={weatherVal}
        onChange={({ target }) => setWeatherVal(target.value as weather)}
      >
        {Object.values(weather).map((val) => {
          return (
            <option value={val} key={val}>
              {val}
            </option>
          );
        })}
      </select>
      <br />
      Visibility:{' '}
      <select
        value={visibilityVal}
        onChange={({ target }) => setVisibilityVal(target.value as visibility)}
      >
        {Object.values(visibility).map((val) => {
          return (
            <option value={val} key={val}>
              {val}
            </option>
          );
        })}
      </select>
      <br />
      Comment:{' '}
      <input
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></input>
      <button type='submit'>Submit</button>
    </form>
  );
};

export default DiaryForm;
