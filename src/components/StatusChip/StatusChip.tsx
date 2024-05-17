import React from 'react';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import { ReviewStatus } from 'models';

const StatusChip = ({ status }: { status: keyof typeof ReviewStatus }) => {
  switch (status) {
    case ReviewStatus.PENDING:
      return <Chip variation="warning" text={stringToHumanReadable(status)} />;
    case ReviewStatus.ACCEPTED:
      return <Chip variation="success" text={stringToHumanReadable(status)} />;
    case ReviewStatus.DENIED:
      return <Chip variation="danger" text={stringToHumanReadable(status)} />;
    case ReviewStatus.RETURNED:
      return <Chip variation="disabled" text={stringToHumanReadable(status)} />;
    default:
      return <Chip variation="disabled" text={stringToHumanReadable(status)} />;
  }
};

export default StatusChip;
