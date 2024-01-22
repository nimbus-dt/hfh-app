import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';

const WrittenTable = ({ questions, answers }) => (
  <DataTable
    heading="Written questions"
    data={questions.map((question) => ({
      header: question.label,
      value: answers[question.name] || '',
    }))}
  />
);

WrittenTable.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.object,
};

export default WrittenTable;
