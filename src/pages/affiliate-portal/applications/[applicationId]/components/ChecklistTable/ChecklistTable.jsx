import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';

const ChecklistTable = ({ questions, answers }) => (
  <DataTable
    heading="Checklist questions"
    data={questions.map((question) => ({
      header: question.label,
      value: answers[question.name] || '',
    }))}
  />
);

ChecklistTable.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.object,
};

export default ChecklistTable;
