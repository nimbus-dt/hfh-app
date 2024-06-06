import { Habitat } from 'models';
import Auth from './Auth';
import Gallery from './Gallery';
import GalleryProps from './Gallery/types';
import styles from './styles.module.css';

interface AuthenticationProps {
  habitat: Habitat;
  gallery: GalleryProps['data'];
  type: 'applicant' | 'affiliate';
}

const Authentication = ({ habitat, gallery, type }: AuthenticationProps) => (
  <div className={styles.container}>
    <div className={styles.authentification}>
      <Auth
        type={type}
        habitat={habitat}
        header={habitat?.authenticationHeader || ''}
      />
    </div>
    {!(type === 'affiliate') && gallery && <Gallery data={gallery} />}
  </div>
);

export default Authentication;
