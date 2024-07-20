import { TranslationContextType } from 'contexts/TranslationsContext';

interface translatorProps {
  language: string;
  translations: TranslationContextType;
}

const translator =
  ({ language, translations }: translatorProps) =>
  (key?: string) => {
    console.log('key', key);
    if (!key) return '';
    if (!translations) return key;
    return translations[language]?.[key] || key;
  };

export default translator;
