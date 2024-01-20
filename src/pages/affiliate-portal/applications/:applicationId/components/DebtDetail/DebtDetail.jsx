import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import RecordDetail from 'components/RecordDetail';
import { Storage } from 'aws-amplify';

/**
 * DebtDetail is a component that manages the debt detail. It provides a way to add / remove items from the database without relying on data store.
 *
 *
 * @return { ReactElement } React element that manages the debt detail and allows you to interact with it
 */
export function DebtDetail({ item, sizeRenderer }) {
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
      renderBody={() => (
        <>
          <Flex gap="5px">
            <Text fontWeight="bold">Type of debt:</Text>
            <Text>{item.props.type}</Text>
          </Flex>
          <Flex gap="5px">
            <Text fontWeight="bold">Debt description:</Text>
            <Text>{item.props.description}</Text>
          </Flex>
          <Flex gap="5px">
            <Text fontWeight="bold">Monthly payment:</Text>
            <Text>${item.props.monthlyPayment}</Text>
          </Flex>
          <Flex gap="5px">
            <Text fontWeight="bold">Unpaid balance:</Text>
            <Text>${item.props.unpaidBalance}</Text>
          </Flex>
          <Flex gap="5px">
            <Text fontWeight="bold">months left to paid:</Text>
            <Text>{item.props.monthsLeftToPaid}</Text>
          </Flex>
          <Flex direction="column" gap="5px" width="100%">
            <Text fontWeight="bold">Proof of debt:</Text>

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

DebtDetail.propTypes = {
  item: PropTypes.object,
  sizeRenderer: PropTypes.bool,
};
