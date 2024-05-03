import React from 'react';
import { TestCycle } from 'models';
import DOMPurify from 'dompurify';

interface IProperties {
  cycle?: TestCycle;
}

const NoOpenCycle = ({ cycle }: IProperties) => (
  <div
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: DOMPurify.sanitize(cycle?.closedCycleMessage || ''),
    }}
  />
);

export default NoOpenCycle;
