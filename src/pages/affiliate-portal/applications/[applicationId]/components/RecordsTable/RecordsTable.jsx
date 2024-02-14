import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import { Loader } from '@aws-amplify/ui-react';

const Links = ({ loading, linksObject, question }) => {
  if (loading > 0) {
    return <Loader size="large" />;
  }

  if (linksObject[question.name]) {
    return linksObject[question.name].map((linkObject) => (
      <li key={linkObject.link}>
        <a href={linkObject.link} download>
          {linkObject.fileName}
        </a>
      </li>
    ));
  }
};

Links.propTypes = {
  loading: PropTypes.number,
  linksObject: PropTypes.object,
  question: PropTypes.object,
};

const RecordsTable = ({ questions, answers }) => {
  const [linksObject, setLinksObject] = useState({});
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const getDownloadLinks = async () => {
      setLoading((previousLoading) => previousLoading + 1);
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
      setLoading((previousLoading) => previousLoading - 1);
    };

    getDownloadLinks();
  }, [questions, answers]);

  return (
    <DataTable
      heading="Records"
      headingTextAlign="left"
      divider
      data={questions.map((question) => ({
        header: question.label,
        value: (
          <ul>
            {question.name ? (
              <Links
                linksObject={linksObject}
                loading={loading}
                question={question}
              />
            ) : (
              ''
            )}
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
