import patients from '../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, Gender, NonSensitivePatient, Entry } from '../src/types';
import { toNewPatientEntry, parseEntry } from '../src/utils';

let data: Patient[] = patients.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});
const getEntries = (): Patient[] => {
  return data;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return data.map((entry) => {
    const result = {
      id: entry.id,
      name: entry.name,
      dateOfBirth: entry.dateOfBirth,
      gender: entry.gender,
      occupation: entry.occupation,
    };
    return result;
  });
};

const getPatient = (id: string): Patient => {
  console.log(data);
  return data.find((entry) => entry.id === id) as Patient;
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
): Patient => {
  const id = uuid();
  const newPatient: Patient = {
    name: name,
    dateOfBirth: dateOfBirth,
    ssn: ssn,
    gender: gender,
    occupation: occupation,
    id: id,
    entries: [],
  };
  data.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, obj: Object): Entry => {
  const entryId = uuid();
  const object = parseEntry({ ...obj, id: entryId }) as Entry;
  console.log(`Adding ${object} to the database`);
  console.log(object);
  console.log(data);
  data = data.map((person) =>
    person.id === id
      ? { ...person, entries: person.entries.concat(object) }
      : person
  );
  console.log(data);
  return object;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  getPatient,
  addEntry,
};
