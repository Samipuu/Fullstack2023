import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnosis } from './types';

import patientService from './services/patients';
import diagnosesService from './services/diagnoses';
import PatientListPage from './components/PatientListPage';
import PatientPage from './components/Patient';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const match = useMatch('/api/patients/:id');
  const patientProfile = match
    ? patients.find((profile) => profile.id === match.params.id)
    : null;

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
    void fetchDiagnoses();
  }, []);

  return (
    <div className='App'>
      <Container>
        <Typography variant='h3' style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to='/' variant='contained' color='primary'>
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path='/'
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path='/api/patients/:id'
            element={
              <PatientPage patient={patientProfile} diagnoses={diagnoses} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
