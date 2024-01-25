import { useEffect, useState } from 'react';
import { Button, Flex, Image, View } from '@aws-amplify/ui-react';
import { useLocation } from 'react-router-dom';
import { HiBars3 } from 'react-icons/hi2';
import { AiOutlineCloseCircle } from 'react-icons/ai';
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
        paddingLeft="0.5rem"
        height="6rem"
        backgroundColor={COLORS.SECONDARY.DEFAULT}
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          width="100%"
        >
          <View height="5rem" width="75%">
            <Image
              alt="Habitat Logo"
              src={logoHabitat}
              height="5rem"
              margin={0}
              objectFit="fill"
            />
          </View>

          <Flex width="25%" height="100%" justifyContent="center">
            <Button
              variation="link"
              className={styles.barsBtn}
              onClick={toggleIsOpen}
            >
              <HiBars3 size={32} />
            </Button>
          </Flex>
        </Flex>
      </View>

      {isOpen && (
        <Flex className={styles.sidebarSM}>
          <SidebarActions />

          <Flex
            direction="column"
            grow={1}
            alignItems="center"
            justifyContent="center"
            maxWidth="25%"
            height="100%"
          >
            <button
              className={styles.sidebarSMCloseBtn}
              type="button"
              onClick={toggleIsOpen}
            >
              <AiOutlineCloseCircle size={48} />
            </button>
          </Flex>
        </Flex>
      )}
    </>
  );
}
