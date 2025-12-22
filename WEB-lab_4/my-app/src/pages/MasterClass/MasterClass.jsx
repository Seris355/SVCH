import React from 'react';
import { useTranslation } from 'react-i18next';
import MasterClassList from '../../components/MasterClassList/MasterClassList.jsx';
import AddMasterClassForm from '../../components/AddMasterClassForm/AddMasterClassForm.jsx';
import Switcher from '../../components/LanguageSwitcher/LanguageSwitcher.jsx'
import './MasterClass.css';

const MasterClass = () => {
  const { t } = useTranslation();

  return (
    <div className="master-class-page">
      <div className="container">
        <h1>Мастер-классы</h1>
        <p className="page-description">
          Профессиональные мастер-классы от лучших врачей по диабету, 
          инсулинорезистентности и здоровому питанию
        </p>
        <></>
        <Switcher/>
        <AddMasterClassForm />
        <MasterClassList />
      </div>
    </div>
  );
};

export default MasterClass;