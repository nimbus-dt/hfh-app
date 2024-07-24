import { resolvePath } from 'react-router-dom';

interface HandleCopyToClipboardProps {
  cycleId?: string;
  pathname?: string;
}

export const handleCopyToClipboard = ({
  cycleId,
  pathname,
}: HandleCopyToClipboardProps) => {
  const pathToForm = resolvePath(`../../../applicant/${cycleId}`, pathname);
  const { origin } = window.location;
  const applicantLink = `${origin}${pathToForm.pathname}`;
  navigator.clipboard.writeText(applicantLink);
};

export const redirectToApplicant = ({
  cycleId,
  pathname,
}: HandleCopyToClipboardProps) => {
  const pathToForm = resolvePath(`../../../applicant/${cycleId}`, pathname);
  const { origin } = window.location;
  const applicantLink = `${origin}${pathToForm.pathname}`;
  window.open(applicantLink, '_blank');
};
