import ru from '../locales/ru.json';
import en from '../locales/en.json';
import store from '../store';

const locales = {
  'ru-RU': ru,
  'en-US': en,
};

function localizeFilter(key) {
  const locale = store.getters.info.locale || 'ru-RU';
  return locales[locale][key] || `[Localize error]: key ${key} not found`;
}

export default localizeFilter;
