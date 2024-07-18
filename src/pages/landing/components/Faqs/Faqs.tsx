import { Flex, Text, Accordion } from '@aws-amplify/ui-react';
import { motion, AnimatePresence } from 'framer-motion';
import { random } from 'lodash';
import faqs from './data/faqs';
import style from './Faqs.module.css';

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

const itemVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: 'auto' },
};

const expanderVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function Faqs() {
  return (
    <Flex
      direction="column"
      gap="40px"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
      padding={{ base: '56px 32px', medium: '56px 48px', large: '56px 132px' }}
      backgroundColor="var(--amplify-colors-neutral-10)"
      id="faq"
    >
      <Flex
        width="100%"
        height="fit-content"
        alignItems="center"
        gap="24px"
        padding="0px"
        direction="column"
      >
        <Text
          fontWeight="medium"
          fontSize={{ base: '36px', medium: '48px', large: '54px' }}
          width="100%"
          height="fit-content"
          textAlign="center"
          color="var(--amplify-colors-neutral-100)"
          as={motion.p}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          transition={{ duration: 1.5 }}
        >
          FAQ
        </Text>
      </Flex>
      <Flex width={{ base: '100%', large: '780px' }} padding="0px">
        <Accordion.Container width="100%" boxShadow="large">
          {faqs.map((faq) => (
            <Accordion.Item value={faq.key}>
              <Accordion.Trigger padding="16px 24px">
                <motion.div
                  key={faq.key}
                  initial="hidden"
                  whileInView="visible"
                  exit="hidden"
                  variants={expanderVariants}
                  transition={{ duration: 1, delay: random(0.1, 0.5) }}
                  className={style.accordionTriggerContainer}
                >
                  <Flex width="100%" justifyContent="space-between">
                    <Text>{faq.question}</Text>

                    <Accordion.Icon />
                  </Flex>
                </motion.div>
              </Accordion.Trigger>
              <Accordion.Content
                padding="16px 24px"
                color="var(--amplify-colors-neutral-90)"
              >
                <AnimatePresence>
                  <motion.p
                    key={`${faq.key}-answer`}
                    initial="hidden"
                    whileInView="visible"
                    exit="hidden"
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                  >
                    {faq.answer}
                  </motion.p>
                </AnimatePresence>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Container>
      </Flex>
    </Flex>
  );
}

export default Faqs;
