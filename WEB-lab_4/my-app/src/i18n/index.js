import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      masterClasses: "Мастер-классы",
      addMasterClass: "Добавить мастер-класс",
      title: "Название",
      description: "Описание",
      price: "Цена",
      duration: "Длительность",
      category: "Категория",
      difficulty: "Сложность",
      instructor: "Преподаватель",
      participants: "Участники",
      content: "Содержание",
      addParticipant: "Добавить участника",
      participantName: "Имя участника",
      save: "Сохранить",
      cancel: "Отмена",
      edit: "Редактировать",
      delete: "Удалить",
      filters: "Фильтры",
      search: "Поиск",
      all: "Все",
      beginner: "Начальный",
      intermediate: "Средний",
      advanced: "Продвинутый",
      basics: "Основы",
      desserts: "Десерты",
      breakfast: "Завтраки",
      mainCourses: "Основные блюда",
      sortBy: "Сортировать по",
      newest: "Новинки",
      priceLow: "Цена (низкая)",
      priceHigh: "Цена (высокая)",
      noMasterClasses: "Мастер-классы не найдены",
      addNewMasterClass: "Добавить новый мастер-класс"
    }
  },
  en: {
    translation: {
      masterClasses: "Master Classes",
      addMasterClass: "Add Master Class",
      title: "Title",
      description: "Description",
      price: "Price",
      duration: "Duration",
      category: "Category",
      difficulty: "Difficulty",
      instructor: "Instructor",
      participants: "Participants",
      content: "Content",
      addParticipant: "Add Participant",
      participantName: "Participant Name",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      filters: "Filters",
      search: "Search",
      all: "All",
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      basics: "Basics",
      desserts: "Desserts",
      breakfast: "Breakfast",
      mainCourses: "Main Courses",
      sortBy: "Sort by",
      newest: "Newest",
      priceLow: "Price (Low)",
      priceHigh: "Price (High)",
      noMasterClasses: "No master classes found",
      addNewMasterClass: "Add new master class"
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