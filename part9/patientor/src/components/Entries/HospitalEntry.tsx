import { HospitalEntry, Diagnosis } from '../../types';
import LocalHospitalIcon from '@mui/icons-material/MedicalServices';

const HospitalPage = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  console.log(entry);

  return (
    <div key={entry.id}>
      {entry.date} <LocalHospitalIcon /> <br />
      {entry.description} <br />
      {entry.diagnosisCodes?.map((diagnosis) => {
        const extended = diagnoses.find((val) => val.code === diagnosis);
        return (
          <li key={diagnosis}>
            {diagnosis} {extended?.name}
          </li>
        );
      })}
      Discharged: {entry.discharge.date} {entry.discharge.criteria} <br />
      Diagnosed by: {entry.specialist}
    </div>
  );
};

export default HospitalPage;
