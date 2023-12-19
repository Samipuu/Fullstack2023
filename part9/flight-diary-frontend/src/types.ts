export interface Diary extends newEntry {
  id: number;
}

export interface newEntry {
  date: string;
  weather: weather;
  visibility: visibility;
  comment: string;
}

export enum weather {
  Sunny = 'sunny',
  Rainy = 'rainy',
  Cloudy = 'cloudy',
  Stormy = 'stormy',
  Windy = 'windy',
}

export enum visibility {
  Great = 'great',
  Good = 'good',
  Ok = 'ok',
  Poor = 'poor',
}
