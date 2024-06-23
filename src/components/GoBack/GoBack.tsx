import { Link } from 'react-router-dom';
import { MdOutlineArrowBack } from 'react-icons/md';

import IconButton from 'components/IconButton';

const GoBack = ({ to = '..' }: { to?: string }) => (
  <Link to={to}>
    <IconButton variation="not-outlined">
      <MdOutlineArrowBack />
    </IconButton>
  </Link>
);

export default GoBack;
