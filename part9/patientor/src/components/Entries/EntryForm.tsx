import {
  Button,
  Input,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
} from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import { Diagnosis, EntryFormValues, HealthCheckRating } from '../../types';

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const EntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [entryType, setEntryType] = useState('Hospital');
  const [dischargeDate, setDischarge] = useState('');
  const [selected, setSelected] = useState(false);
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const emptyForm = () => {
    setEntryType('Hospital');
    setDescription('');
    setDate('');
    setSpecialist('');
    setRating('');
    setDiagnosisCodes([]);
    setDischarge('');
    setSelected(false);
    setEmployer('');
    setStartDate('');
    setEndDate('');
    setCriteria('');
    onCancel();
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    let newEntry;
    if (entryType === 'Hospital') {
      const discharge = { date: dischargeDate, criteria: criteria };
      newEntry = {
        type: entryType,
        description: description,
        date: date,
        specialist: specialist,
        diagnosisCodes: diagnosisCodes,
        discharge: discharge,
      };
    }
    if (entryType === 'HealthCheck') {
      newEntry = {
        type: entryType,
        description: description,
        date: date,
        specialist: specialist,
        diagnosisCodes: diagnosisCodes,
        healthCheckRating: rating,
      };
    }
    if (entryType === 'OccupationalHealthcare') {
      const sickLeave = { startDate: startDate, endDate: endDate };
      if (startDate === '') {
        newEntry = {
          type: entryType,
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          employerName: employer,
        };
      } else {
        newEntry = {
          type: entryType,
          description: description,
          date: date,
          specialist: specialist,
          diagnosisCodes: diagnosisCodes,
          employerName: employer,
          sickLeave: sickLeave,
        };
      }
    }

    onSubmit(newEntry);

    emptyForm();
  };

  const handleCancel = () => {
    emptyForm();
  };

  return (
    <div>
      <Select
        value={entryType}
        onChange={({ target }) => setEntryType(target.value)}
      >
        <MenuItem value='Hospital'>Hospital Entry</MenuItem>
        <MenuItem value='OccupationalHealthcare'>
          Occupational Healthcare Entry
        </MenuItem>
        <MenuItem value='HealthCheck'>Health Check Entry</MenuItem>
      </Select>
      <form onSubmit={addEntry}>
        <TextField
          label='Description'
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        Entry date:
        <Input
          type='date'
          value={date}
          fullWidth
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label='Specialist'
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        Diagnosis codes:
        <Select
          fullWidth
          multiple
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
        >
          {diagnoses.map((diagnosis) => (
            <MenuItem value={diagnosis.code}>{diagnosis.code}</MenuItem>
          ))}
        </Select>{' '}
        <br />
        {entryType === 'Hospital' ? (
          <div>
            Discharge:{' '}
            <Input
              name='Discharge'
              type='date'
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischarge(target.value)}
            />
            <TextField
              label='Discharge criteria'
              value={criteria}
              fullWidth
              onChange={({ target }) => setCriteria(target.value)}
            />
          </div>
        ) : (
          ''
        )}
        {entryType === 'OccupationalHealthcare' ? (
          <div>
            <TextField
              label='Employer'
              fullWidth
              value={employer}
              onChange={({ target }) => setEmployer(target.value)}
            />
            Sick leave?{' '}
            <ToggleButton
              value='check'
              selected={selected}
              onChange={() => {
                setSelected(!selected);
              }}
            ></ToggleButton>{' '}
            <br />
            {selected ? (
              <div>
                {' '}
                Start date:{' '}
                <Input
                  name='StartDate'
                  type='date'
                  fullWidth
                  value={startDate}
                  onChange={({ target }) => setStartDate(target.value)}
                />
                End date:{' '}
                <Input
                  name='EndDate'
                  type='date'
                  fullWidth
                  value={endDate}
                  onChange={({ target }) => setEndDate(target.value)}
                />
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
        {entryType === 'HealthCheck' ? (
          <div>
            {' '}
            Health check rating:
            <Select
              value={rating}
              fullWidth
              onChange={({ target }) => setRating(target.value)}
            >
              {Object.values(HealthCheckRating).map((rating) => {
                if (Number(rating) || Number(rating) === 0)
                  return <MenuItem value={rating}>{rating}</MenuItem>;
                return;
              })}
            </Select>
          </div>
        ) : (
          ''
        )}
        <br />
        <Button onClick={handleCancel}>Cancel</Button>
        <Button
          type='submit'
          variant='contained'
          style={{
            float: 'right',
          }}
        >
          Add
        </Button>
      </form>
    </div>
  );
};

export default EntryForm;
