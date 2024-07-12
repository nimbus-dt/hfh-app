import Auth from './Auth';
import Gallery from './Gallery';
import GalleryProps from './Gallery/types';
import styles from './styles.module.css';

interface AuthenticationProps {
  gallery: GalleryProps['data'];
  type: 'applicant' | 'affiliate';
}

const Authentication = ({ gallery, type }: AuthenticationProps) => {
  <div className={styles.container}>
    <div className={styles.authentification}>
      <Auth type={type} />
    </div>
    {!(type === 'affiliate') && gallery && <Gallery data={gallery} />}
  </div>;
};

export default Authentication;
