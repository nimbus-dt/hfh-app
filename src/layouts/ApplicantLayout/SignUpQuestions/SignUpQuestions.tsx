import FormSections from 'components/FormSections';
import React from 'react';

const SignUpQuestions = () => (
  <div>
    <FormSections
      current={0}
      sections={['General', 'Household', 'Employment', 'Habitat']}
    />
  </div>
);

export default SignUpQuestions;
