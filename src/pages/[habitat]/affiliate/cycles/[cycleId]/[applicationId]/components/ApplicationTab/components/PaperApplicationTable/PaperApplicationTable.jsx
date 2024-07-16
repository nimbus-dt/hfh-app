import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify/datastore';
import { Loader } from '@aws-amplify/ui-react';

const Links = ({ loading, links }) => {
  if (loading > 0) {
    return <Loader size="large" />;
  }

  return links.map((linkObject) => (
    <li key={linkObject.link}>
      <a href={linkObject.link} download>
        {linkObject.fileName}
      </a>
    </li>
  ));
};

Links.propTypes = {
  loading: PropTypes.number,
  links: PropTypes.array,
};

const PaperApplicationTable = ({ application }) => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const getDownloadLinks = async () => {
      setLoading((previousLoading) => previousLoading + 1);
      let arrayOfLinks = [];

      if (application.props.paperApplicationKeys) {
        for (const s3key of application.props.paperApplicationKeys) {
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
      }
      setLinks(arrayOfLinks);
      setLoading((previousLoading) => previousLoading - 1);
    };

    getDownloadLinks();
  }, [application]);

  return (
    <DataTable
      heading="Paper Application Information"
      headingTextAlign="left"
      divider
      data={[
        {
          header: 'Name',
          value: application.props.name,
        },
        {
          header: 'Files',
          value: (
            <ul>
              <Links links={links} loading={loading} />
            </ul>
          ),
        },
      ]}
    />
  );
};

PaperApplicationTable.propTypes = {
  application: PropTypes.object,
};

export default PaperApplicationTable;
