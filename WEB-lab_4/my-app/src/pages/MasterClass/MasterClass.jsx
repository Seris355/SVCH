import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Header from '../../../components/Header/Header.js';
import Footer from '../../../components/Footer/Footer.js';
import MasterClassList from '../../../components/MasterClassList/MasterClassList.jsx';
import AddMasterClassForm from '../../../components/AddMasterClassForm/AddMasterClassForm.jsx';
import MasterClassDetails from '../../../components/MasterClassDetails/MasterClassDetails.jsx';
import './MasterClass.css';

const MasterClass = () => {
  const { t } = useTranslation();
  const { currentClass } = useSelector(state => state.masterClasses);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [language, setLanguage] = useState('ru');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // i18n.changeLanguage(lang); - это будет работать когда подключим i18n в главный компонент
  };

  return (
    <div className="master-class-page">
      <Header />
      
      <main className="main-content">
        <section className="page-header">
          <div className="container">
            <h1 className="page-title">{t('masterClasses')}</h1>
            <div className="page-controls">
              <button 
                onClick={() => setShowAddForm(true)}
                className="btn-add"
              >
                {t('addMasterClass')}
              </button>
              
              <div className="language-switcher">
                <button 
                  onClick={() => handleLanguageChange('ru')}
                  className={language === 'ru' ? 'active' : ''}
                >
                  RU
                </button>
                <button 
                  onClick={() => handleLanguageChange('en')}
                  className={language === 'en' ? 'active' : ''}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="master-classes-section">
          <div className="container">
            <MasterClassList />
          </div>
        </section>

        {/* Модальное окно добавления */}
        {showAddForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <AddMasterClassForm onClose={() => setShowAddForm(false)} />
            </div>
          </div>
        )}

        {/* Модальное окно деталей */}
        {currentClass && (
          <div className="modal-overlay">
            <div className="modal-content">
              <MasterClassDetails 
                masterClass={currentClass}
                onClose={() => {/* dispatch action to clear currentClass */}}
              />
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default MasterClass;