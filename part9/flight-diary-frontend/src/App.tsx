import axios from 'axios';
import { useEffect, useState } from 'react';
import { Diary, newEntry } from './types';
import DiaryForm from './DiaryForm';
import Notification from './Notification';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [notification, setNotification] = useState('');
  const baseUrl = 'http://localhost:3000/api/diaries';

  useEffect(() => {
    const fetchDiaries = async () => {
      const result = await axios.get(baseUrl);
      console.log(result);
      setDiaries(result.data);
    };
    void fetchDiaries();
  }, []);

  const newDiaryEntry = async (diaryEntry: newEntry) => {
    try {
      const result = await axios.post(baseUrl, diaryEntry);
      setDiaries(diaries.concat(result.data));
      setNotification(
        `Diary entry ${result.data} has been added on the server`
      );
      setTimeout(() => {
        setNotification('');
      }, 10000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(`error: ${error.response.data}`);
        setTimeout(() => {
          setNotification('');
        }, 10000);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>Diary Entries:</h2>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            {diary.date} {diary.visibility} {diary.weather}
          </div>
        );
      })}
      <h2>Add new entry</h2>
      <DiaryForm newDiaryEntry={newDiaryEntry} />
    </div>
  );
};

export default App;
