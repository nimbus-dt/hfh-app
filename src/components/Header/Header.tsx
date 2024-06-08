import { Habitat } from 'models';
import { MdClose } from 'react-icons/md';

import ProgressBar from 'components/ProgressBar';

import Loading from 'components/Loading';
import styles from './Header.module.css';

type PageProps = {
  section: string;
  step: number;
  number: number;
}[];

interface HeaderProps {
  current: number;
  pages?: PageProps;
  habitat?: Habitat;
  cancel?: boolean;
}

const Header = ({ current, pages, habitat, cancel }: HeaderProps) => {
  if (!habitat) return <Loading />;
  if (!pages) return null;
  return (
    <div className={styles.background}>
      <div className={styles.banner}>
        <div className={styles.logo}>
          <img
            src="https://hfh-app-storage-bucket134315-formio.s3.amazonaws.com/public/habitat.png"
            alt="logo"
            className={styles.img}
          />
          <h1 className="theme-subtitle-s2">{habitat?.name}</h1>
        </div>
        <ProgressBar current={current} pages={pages} />
        <div className={styles.close}>
          {cancel && <MdClose size="1.5rem" />}
        </div>
      </div>
    </div>
  );
};

export default Header;
