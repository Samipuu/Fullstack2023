import {
  NewPatientEntry,
  Gender,
  Entry,
  HealthCheckRating,
  SickLeave,
  Discharge,
  BaseEntry,
} from './types';

const parseString = (obj: unknown): string => {
  if (!obj || !isString(obj)) throw new Error(`Incorrect or missing ${obj}`);
  return obj;
};

export const parseEntry = (obj: unknown): Entry => {
  if (!obj || typeof obj !== 'object')
    throw new Error(`Incorrect or missing ${obj}`);
  if (
    'id' in obj &&
    'description' in obj &&
    'date' in obj &&
    'specialist' in obj &&
    'type' in obj
  ) {
    const base: BaseEntry = {
      id: parseString(obj.id),
      description: parseString(obj.description),
      date: parseString(obj.date),
      specialist: parseString(obj.specialist),
    };
    switch (obj.type) {
      case 'HealthCheck':
        if ('healthCheckRating' in obj && 'diagnosisCodes' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            diagnosisCodes: parseStrings(obj.diagnosisCodes),
            healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
          };
          return newEntry;
        }
        if ('healthCheckRating' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
          };
          return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
      case 'OccupationalHealthcare':
        if (
          'employerName' in obj &&
          'sickLeave' in obj &&
          'diagnosisCodes' in obj
        ) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            diagnosisCodes: parseStrings(obj.diagnosisCodes),
            employerName: parseString(obj.employerName),
            sickLeave: parseSickLeave(obj.sickLeave),
          };
          return newEntry;
        }
        if ('employerName' in obj && 'sickLeave' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            employerName: parseString(obj.employerName),
            sickLeave: parseSickLeave(obj.sickLeave),
          };
          return newEntry;
        }
        if ('employerName' in obj && 'diagnosisCodes' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            employerName: parseString(obj.employerName),
            diagnosisCodes: parseStrings(obj.diagnosisCodes),
          };
          return newEntry;
        }
        if ('employerName' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            employerName: parseString(obj.employerName),
          };
          return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
      case 'Hospital':
        if ('discharge' in obj && 'diagnosisCodes' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            diagnosisCodes: parseStrings(obj.diagnosisCodes),
            discharge: parseDischarge(obj.discharge),
          };
          return newEntry;
        }
        if ('discharge' in obj) {
          const newEntry: Entry = {
            type: obj.type,
            ...base,
            discharge: parseDischarge(obj.discharge),
          };
          return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');
    }

    throw new Error('Incorrect data: some fields are missing');
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseDischarge = (obj: unknown): Discharge => {
  if (!obj || typeof obj !== 'object')
    throw new Error(`Incorrect or missing ${obj}`);
  if ('date' in obj && 'criteria' in obj) {
    const newDischarge: Discharge = {
      date: parseString(obj.date),
      criteria: parseString(obj.criteria),
    };
    return newDischarge;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseSickLeave = (obj: unknown): SickLeave => {
  if (!obj || typeof obj !== 'object')
    throw new Error(`Incorrect or missing ${obj}`);
  if ('startDate' in obj && 'endDate' in obj) {
    const newSickLeave: SickLeave = {
      startDate: parseString(obj.startDate),
      endDate: parseString(obj.endDate),
    };
    return newSickLeave;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseStrings = (obj: unknown): string[] => {
  if (!obj || !Array.isArray(obj))
    throw new Error(`Incorrect or missing ${obj}`);
  const result = obj.map((x) => parseString(x));
  return result;
};
/* 
const parseDiagnoses = (obj: unknown): Diagnosis[] => {
  if (!obj || !Array.isArray(obj))
    throw new Error(`Incorrect or missing ${obj}`);
  const result = obj.map((x) => parseDiagnosis(x));
  return result;
};

const parseDiagnosis = (obj: unknown): Diagnosis => {
  if (!obj || typeof obj !== 'object')
    throw new Error(`Incorrect or missing ${obj}`);
  if ('code' in obj && 'name' in obj && 'latin' in obj) {
    const newDiagnosis: Diagnosis = {
      code: parseString(obj.code),
      name: parseString(obj.name),
      latin: parseString(obj.latin),
    };
    return newDiagnosis;
  }
  if ('code' in obj && 'name' in obj) {
    const newDiagnosis: Diagnosis = {
      code: parseString(obj.code),
      name: parseString(obj.name),
    };
    return newDiagnosis;
  }
  throw new Error('Incorrect data: some fields are missing');
};*/

const isGender = (str: string): str is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(str);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const isHealthCheckRating = (int: number): boolean => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(int);
};

const isNumber = (x: unknown): x is number => {
  return typeof x === 'number' || x instanceof Number;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    (rating !== 0 && rating !== 1 && rating !== 2 && rating !== 3) ||
    !isNumber(rating) ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error(`Incorrect or missing ${rating}`);
  }

  return rating;
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'occupation' in object &&
    'gender' in object &&
    'entries' in object
  ) {
    const newEntry: NewPatientEntry = {
      name: parseString(object.name),
      dateOfBirth: parseString(object.dateOfBirth),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      gender: parseGender(object.gender),
      entries: parseEntries(object.entries),
    };
    return newEntry;
  }

  throw new Error('Incorrect data: some fields are missing');
};

const parseEntries = (obj: unknown): Entry[] => {
  if (!obj || !Array.isArray(obj))
    throw new Error(`Incorrect or missing ${obj}`);
  const result = obj.map((x) => parseEntry(x));
  return result;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
