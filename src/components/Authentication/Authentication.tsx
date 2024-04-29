import { ScrollView } from '@aws-amplify/ui-react';

import Auth from './Auth';
import Gallery from './Gallery';
import GalleryProps from './Gallery/types';
import styles from './styles.module.css';

interface AuthenticationProps {
  authenticationHeader: string;
  gallery: GalleryProps['data'];
  affiliate?: boolean;
  habitat?: string;
}

const Authentication = ({
  authenticationHeader,
  gallery,
  affiliate,
  habitat,
}: AuthenticationProps) => (
  <ScrollView height="100vh" className={styles.container}>
    <div className={styles.authentification}>
      <Auth header={authenticationHeader} />
    </div>
    {!affiliate && gallery && <Gallery data={gallery} habitat={habitat} />}
  </ScrollView>
);

export default Authentication;
