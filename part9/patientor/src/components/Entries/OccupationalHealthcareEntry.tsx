import { OccupationalHealthcareEntry, Diagnosis } from '../../types';
import WorkIcon from '@mui/icons-material/MedicalServices';

const OccupationalHealthcarePage = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  console.log(entry);
  return (
    <div key={entry.id}>
      {entry.date} <WorkIcon /> {entry.employerName} <br />
      {entry.description} <br />
      {entry.diagnosisCodes?.map((diagnosis) => {
        const extended = diagnoses.find((val) => val.code === diagnosis);
        return (
          <li key={diagnosis}>
            {diagnosis} {extended?.name}
          </li>
        );
      })}
      Sick leave: {entry.sickLeave?.startDate} {entry.sickLeave?.endDate} <br />
      Diagnosed by: {entry.specialist}
    </div>
  );
};

export default OccupationalHealthcarePage;
