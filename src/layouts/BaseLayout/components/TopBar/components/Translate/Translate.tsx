import { useTranslation } from 'react-i18next';
import { CiGlobe } from 'react-icons/ci';

import { Menu, MenuItem } from '@aws-amplify/ui-react';

const Translate = () => {
  const { t, i18n } = useTranslation();
  const lngs: { [key: string]: { nativeName: string } } = {
    en: { nativeName: t('English') },
    es: { nativeName: t('Spanish') },
  };

  return (
    <Menu
      trigger={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '48px',
            width: '48px',
          }}
        >
          <CiGlobe size="24px" color="var(--amplify-colors-neutral-90)" />
        </div>
      }
    >
      {Object.keys(lngs).map((lng) => (
        <MenuItem
          key={lng}
          type="submit"
          onClick={() => {
            i18n.changeLanguage(lng);
          }}
        >
          {lngs[lng].nativeName}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Translate;
