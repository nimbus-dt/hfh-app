import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';

const RecordsTable = ({ questions, answers }) => {
  const [linksObject, setLinksObject] = useState({});

  useEffect(() => {
    const getDownloadLinks = async () => {
      const newLinksObject = {};

      for (const [key, value] of Object.entries(answers)) {
        let arrayOfLinks = [];
        for (const s3key of value) {
          const getUrlResult = await Storage.get(s3key, {
            expires: 3600,
            validateObjectExistence: true,
          });
          const fileNameArray = s3key.split('/');
          arrayOfLinks = [
            ...arrayOfLinks,
            {
              link: getUrlResult,
              fileName: fileNameArray[fileNameArray.length - 1],
            },
          ];
        }
        newLinksObject[key] = arrayOfLinks;
      }
      setLinksObject(newLinksObject);
    };

    getDownloadLinks();
  }, [questions, answers]);

  return (
    <DataTable
      heading="Records"
      data={questions.map((question) => ({
        header: question.label,
        value: (
          <ul>
            {linksObject[question.name]
              ? linksObject[question.name].map((linkObject) => (
                  <li key={linkObject.link}>
                    <a href={linkObject.link} download>
                      {linkObject.fileName}
                    </a>
                  </li>
                ))
              : ''}
          </ul>
        ),
      }))}
    />
  );
};

RecordsTable.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  answers: PropTypes.object,
};

export default RecordsTable;
