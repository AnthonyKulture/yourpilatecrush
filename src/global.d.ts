import fr from './messages/fr.json';

type Messages = typeof fr;

declare global {
  // Use type safe message keys with `useTranslations`
  interface IntlMessages extends Messages {}
}
