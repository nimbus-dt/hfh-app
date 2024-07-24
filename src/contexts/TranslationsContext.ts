import { createContext } from 'react';

export type TranslationContextType =
  | Record<string, Record<string, string>>
  | undefined;

const TranslationContext = createContext<TranslationContextType>({});

export default TranslationContext;
