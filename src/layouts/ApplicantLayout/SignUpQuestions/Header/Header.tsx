import { Habitat } from 'models';
import { MdClose } from 'react-icons/md';

import ProgressBar from 'components/ProgressBar';

import styles from './Header.module.css';

interface HeaderProps {
  current: number;
  sections: string[];
  habitat: Habitat;
}

const pages = [
  {
    number: 1,
    step: 1,
    section: 'General',
  },
  {
    number: 2,
    step: 1,
    section: 'General',
  },
  {
    number: 3,
    step: 2,
    section: 'Household',
  },
  {
    number: 32,
    step: 2,
    section: 'Household',
  },
  {
    number: 42,
    step: 3,
    section: 'Employment',
  },
  {
    number: 43,
    step: 3,
    section: 'Employment',
  },
  {
    number: 4,
    step: 3,
    section: 'Employment',
  },
  {
    number: 5,
    step: 4,
    section: 'Habitat',
  },
  {
    number: 6,
    step: 5,
    section: 'Habitat',
  },
  {
    number: 7,
    step: 6,
    section: 'Habitat',
  },
  {
    number: 8,
    step: 7,
    section: 'Habitat',
  },
  {
    number: 9,
    step: 8,
    section: 'Habitat',
  },
  {
    number: 10,
    step: 9,
    section: 'Habitat',
  },
  {
    number: 11,
    step: 11,
    section: 'Habitat',
  },
];

const Header = ({ current, sections, habitat }: HeaderProps) => (
  <div className={styles.background}>
    <div className={styles.banner}>
      <div className={styles.logo}>
        <img
          src="https://s3-alpha-sig.figma.com/img/0911/f9e5/dc1f565af2e9efb02a0e981b6a2d31f1?Expires=1714953600&amp;Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&amp;Signature=EtC-0uI3Lr8pka571KClmaKwySYk9jxi1EwOD3c7EAJzN5VG3D42rw58ilsv3LW7PQMONUWYKrhwGqz-YvNSrdmp-7bhKHtMDHmh0yD23Y9W5BzZYG4d6epYXptWOFWHz7J8s0XLn79h3AmT6WePQfjyzQxydFCYOHGZceg4hUyiw5LQCaANDWErezlCyqy8v40Oj6yNz4QPXOvupNU4iMC-bfWjxuAv6~-D7PzA4qwAG2gPxkJrDesPi1rzZogc8m2CU08B7murH0LsZJuVOK4bR1goZvAwf-cCBS-sb0lzlZvnCf14aNEcOmVN2zw1~fM1ZxLnm5yQUOoZpmnZsg__"
          alt="logo"
          className={styles.img}
        />
        <h1 className="theme-subtitle-s2">{habitat.name}</h1>
      </div>
      <ProgressBar current={current} pages={pages} />
      <div className={styles.close}>
        <MdClose size="1.5rem" />
      </div>
    </div>
  </div>
);

export default Header;
