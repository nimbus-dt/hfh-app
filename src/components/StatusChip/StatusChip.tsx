import React from 'react';
import { SubmissionStatus } from 'models';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';

const StatusChip = ({ status }: { status: keyof typeof SubmissionStatus }) => {
  switch (status) {
    case SubmissionStatus.PENDING:
      return <Chip variation="warning" text={stringToHumanReadable(status)} />;
    case SubmissionStatus.ACCEPTED:
      return <Chip variation="success" text={stringToHumanReadable(status)} />;
    case SubmissionStatus.REJECTED:
      return <Chip variation="danger" text={stringToHumanReadable(status)} />;
    case SubmissionStatus.RETURNED:
      return <Chip variation="disabled" text={stringToHumanReadable(status)} />;
    default:
      return <Chip variation="disabled" text={stringToHumanReadable(status)} />;
  }
};

export default StatusChip;
