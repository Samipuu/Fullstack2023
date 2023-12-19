import { HealthCheckEntry, Diagnosis } from '../../types';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const HealthCheckPage = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  const Heart = () => {
    if (entry.healthCheckRating === 3)
      return <FavoriteBorderIcon sx={{ color: 'black' }} />;
    if (entry.healthCheckRating === 2)
      return <FavoriteBorderIcon sx={{ color: 'red' }} />;
    if (entry.healthCheckRating === 1)
      return <FavoriteBorderIcon sx={{ color: 'yellow' }} />;
    if (entry.healthCheckRating === 0)
      return <FavoriteBorderIcon sx={{ color: 'green' }} />;
    return <FavoriteBorderIcon sx={{ color: 'green' }} />;
  };
  return (
    <div key={entry.id}>
      {entry.date} <MedicalServicesIcon /> {entry.description} <br />
      {entry.diagnosisCodes?.map((diagnosis) => {
        const extended = diagnoses.find((val) => val.code === diagnosis);
        return (
          <li key={diagnosis}>
            {diagnosis} {extended?.name}
          </li>
        );
      })}
      <Heart />
      <br />
      Diagnosed by: {entry.specialist}
    </div>
  );
};

export default HealthCheckPage;
