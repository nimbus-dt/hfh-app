import PropTypes from 'prop-types';
import { Flex, Text } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import RecordDetail from 'components/RecordDetail';

export function IncomeDetail({ item, sizeRenderer, isEditable }) {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const getDownloadLinks = async () => {
      let newLinks = [];
      for (const s3key of item.props.proofs) {
        const getUrlResult = await Storage.get(s3key, {
          expires: 3600,
          validateObjectExistence: true,
        });
        const fileNameArray = s3key.split('/');
        newLinks = [
          ...newLinks,
          {
            link: getUrlResult,
            fileName: fileNameArray[fileNameArray.length - 1],
          },
        ];
      }

      setLinks(newLinks);
    };

    getDownloadLinks();
  }, [item]);

  return (
    <RecordDetail
      sizeRenderer={sizeRenderer}
      isEditable={isEditable}
      renderBody={() => (
        <>
          <Flex gap="5px">
            <Text fontWeight="bold">Type of income:</Text>
            <Text>{item.props.type}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Source of income:</Text>
            <Text>{item.props.source}</Text>
          </Flex>

          <Flex gap="5px">
            <Text fontWeight="bold">Montly income:</Text>
            <Text>${item.props.monthlyIncome}</Text>
          </Flex>

          <Flex direction="column" gap="5px" width="100%">
            <Text fontWeight="bold">Proof of Income:</Text>

            <Flex
              direction="column"
              gap="0.25rem"
              maxHeight="7rem"
              overflow="hidden"
            >
              <ul style={{ margin: 0 }}>
                {links.map((fileObject) => (
                  <li key={fileObject.link}>
                    <a
                      href={fileObject.link}
                      style={{ wordBreak: 'break-word' }}
                    >
                      {fileObject.fileName}
                    </a>
                  </li>
                ))}
              </ul>
            </Flex>
          </Flex>
        </>
      )}
    />
  );
}

IncomeDetail.propTypes = {
  item: PropTypes.object,
  sizeRenderer: PropTypes.bool,
  isEditable: PropTypes.bool,
};
