import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      "masterClasses": "Мастер-классы",
      "addNewClass": "Добавить новый мастер-класс", 
      "title": "Название",
      "price": "Цена",
      "doctor": "Врач",
      "description": "Описание",
      "addClass": "Добавить мастер-класс",
      "searchPlaceholder": "Поиск по названию, врачу или описанию...",
      "sortBy": "Сортировать по",
      "sortTitle": "по названию",
      "sortPrice": "по цене",
      "sortDoctor": "по врачу", 
      "resetFilters": "Сбросить фильтры",
      "delete": "Удалить",
      "edit": "Редактировать",
      "priceFrom": "Цена от",
      "priceTo": "до",
      "editMasterClass": "Редактировать мастер-класс",
      "save": "Сохранить",
      "cancel": "Отмена",
      "fillAllFields": "Заполните все поля",
      "priceCannotBeNegative": "Цена не может быть отрицательной",
      "masterClassUpdated": "Мастер-класс обновлен!",
      "confirmDelete": "Удалить мастер-класс?"
    }
  },
  en: {
    translation: {
      "masterClasses": "Master Classes",
      "addNewClass": "Add New Master Class",
      "title": "Title", 
      "price": "Price",
      "doctor": "Doctor",
      "description": "Description",
      "addClass": "Add Master Class",
      "searchPlaceholder": "Search by title, doctor or description...",
      "sortBy": "Sort by",
      "sortTitle": "by title",
      "sortPrice": "by price",
      "sortDoctor": "by doctor",
      "resetFilters": "Reset Filters", 
      "delete": "Delete",
      "edit": "Edit",
      "priceFrom": "Price from",
      "priceTo": "to",
      "editMasterClass": "Edit Master Class",
      "save": "Save",
      "cancel": "Cancel",
      "fillAllFields": "Please fill all fields",
      "priceCannotBeNegative": "Price cannot be negative",
      "masterClassUpdated": "Master class updated!",
      "confirmDelete": "Delete master class?"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;