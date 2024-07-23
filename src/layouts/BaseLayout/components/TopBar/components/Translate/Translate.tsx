import { useTranslation } from 'react-i18next';
import { CiGlobe } from 'react-icons/ci';

import { Menu, MenuItem } from '@aws-amplify/ui-react';

import IconButton from 'components/IconButton';

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
          <IconButton variation="not-outlined">
            <CiGlobe />
          </IconButton>
        </div>
      }
      style={{ position: 'absolute', top: '1rem', right: '0' }}
      menuAlign="end"
    >
      {Object.keys(lngs).map((lng) => (
        <MenuItem
          key={lng}
          type="submit"
          onClick={() => {
            i18n.changeLanguage(lng);
            localStorage.setItem('lng', lng);
          }}
        >
          {lngs[lng].nativeName}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Translate;
