import diagnoses from '../data/diagnoses';

import { Diagnosis } from '../src/types';

const data: Diagnosis[] = diagnoses;

const getEntries = (): Diagnosis[] => {
  return data;
};

export default {
  getEntries,
};
