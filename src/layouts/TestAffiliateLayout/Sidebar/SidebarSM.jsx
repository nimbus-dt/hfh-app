import { useEffect, useState } from 'react';
import { Button, Card, Flex, Image, View } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
import { COLORS } from '../../../utils/constants';
import logoHabitat from '../../../assets/images/trace.svg';
import styles from './SidebarSM.module.css';
import { SidebarActions } from './SidebarActions';

export function SidebarSM() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((currVal) => !currVal);
  };

  // close sidebar after navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <View
        width="100%"
        variation="elevated"
        height="6rem"
        backgroundColor={COLORS.SECONDARY.DEFAULT}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <View
            height="100%"
            width="fit-content"
            padding="0"
            backgroundColor="black"
          >
            <Image
              alt="Habitat Logo"
              src={logoHabitat}
              height="100%"
              margin="0"
              objectFit="fill"
            />
          </View>

          <Flex
            width="25%"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variation="link"
              className={styles.barsBtn}
              onClick={toggleIsOpen}
              padding="0.5rem"
            >
              <HiBars3 size={32} />
            </Button>
          </Flex>
        </Flex>
      </View>

      {isOpen && (
        <Card variation="elevated" margin="1rem">
          <Flex className={styles.sidebarSM} direction="column">
            <SidebarActions />

            <Flex justifyContent="center">
              <Button
                onClick={toggleIsOpen}
                padding="0.25rem"
                borderRadius="large"
              >
                <MdClose size="1.5rem" />
              </Button>
            </Flex>
          </Flex>
        </Card>
      )}
    </>
  );
}
