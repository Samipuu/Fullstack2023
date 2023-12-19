import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = patientService.getNonSensitiveEntries();
  res.send(result);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const result = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );
  res.json(result);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const result = patientService.getPatient(id);
  res.send(result);
});

router.post('/:id/entries', (req, res) => {
  const entry = req.body;
  const id = req.params.id;
  const result = patientService.addEntry(id, entry);
  res.send(result);
});

export default router;
