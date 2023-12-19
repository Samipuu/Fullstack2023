import { CoursePart } from './types';

const Part = (coursePart: CoursePart) => {
  switch (coursePart.kind) {
    case 'basic':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} <br />{' '}
          {coursePart.description}
        </p>
      );
    case 'group':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} <br />
          Group projects: {coursePart.groupProjectCount}
        </p>
      );
    case 'background':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} <br />{' '}
          {coursePart.description}
          <br />
          Background Material: {coursePart.backgroundMaterial}
        </p>
      );
    case 'special':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount} <br />{' '}
          {coursePart.description}
          <br />
          Requirements: {coursePart.requirements}
        </p>
      );
  }
  return null;
};

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return courses.map((coursePart) => Part(coursePart));
};

export default Content;
