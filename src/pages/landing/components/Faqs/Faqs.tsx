import { Flex, Text, Expander, ExpanderItem } from '@aws-amplify/ui-react';
import { motion, AnimatePresence } from 'framer-motion';
import { random } from 'lodash';
import faqs from './data/faqs';

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
        <Expander isCollapsible>
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.key}
              initial="hidden"
              whileInView="visible"
              exit="hidden"
              variants={expanderVariants}
              transition={{ duration: 1, delay: random(0.3, 1) }}
            >
              <ExpanderItem value={faq.key} title={faq.question}>
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
              </ExpanderItem>
            </motion.div>
          ))}
        </Expander>
      </Flex>
    </Flex>
  );
}

export default Faqs;
