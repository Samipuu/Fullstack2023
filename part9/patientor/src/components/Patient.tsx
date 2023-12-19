import { Box, Button, Typography } from '@mui/material';
import { Patient, Diagnosis, Entry, EntryFormValues } from '../types';
import patientService from '../services/patients';
import { useEffect, useState } from 'react';
import HospitalEntry from './Entries/HospitalEntry';
import HealthCheckEntry from './Entries/HealthCheckEntry';
import OccupationalHealthcareEntry from './Entries/OccupationalHealthcareEntry';
import EntryForm from './Entries/EntryForm';
import personService from '../services/patients';

const PatientPage = ({
  patient,
  diagnoses,
}: {
  patient: Patient;
  diagnoses: Diagnosis[];
}) => {
  const [hidden, setHidden] = useState(false);
  const visibility = hidden ? '' : 'none';
  const [patientProfile, setPatientProfile] = useState<Patient>();
  useEffect(() => {
    const fetchPatient = async () => {
      const result = await patientService.getPatient(patient.id);
      setPatientProfile(result);
      console.log('Calling');
    };
    void fetchPatient();
  }, []);
  if (!patientProfile || !patient) return <div></div>;

  const EntryDetails = ({
    entry,
    diagnoses,
  }: {
    entry: Entry;
    diagnoses: Diagnosis[];
  }) => {
    switch (entry.type) {
      case 'Hospital':
        return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
      case 'HealthCheck':
        return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />;
      case 'OccupationalHealthcare':
        return (
          <OccupationalHealthcareEntry entry={entry} diagnoses={diagnoses} />
        );
      default:
        return null;
    }
  };

  const handleClick = () => {
    setHidden(!hidden);
  };

  const handleSubmit = async (entry: EntryFormValues) => {
    const result = await personService.addEntry(patient.id, entry);
    setPatientProfile({
      ...patientProfile,
      entries: patientProfile.entries.concat(result),
    });
  };
  return (
    <div>
      <Box>
        <Typography variant='h5'>{patient.name}</Typography>
        ssh: {patientProfile.ssn}
        <br />
        occupation: {patient.occupation}
        <br />
        gender: {patient.gender}
        <Typography variant='h6'>Entries</Typography>
        <Button color='primary' onClick={handleClick}>
          Add Entry
        </Button>
        <div style={{ display: visibility }}>
          <EntryForm
            diagnoses={diagnoses}
            onCancel={handleClick}
            onSubmit={handleSubmit}
          />
        </div>
        {patientProfile.entries.map((entry) => {
          return <EntryDetails entry={entry} diagnoses={diagnoses} />;
        })}
      </Box>
    </div>
  );
};

export default PatientPage;
