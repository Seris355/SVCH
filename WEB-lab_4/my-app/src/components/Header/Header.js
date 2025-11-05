import React from 'react';
import { NavLink } from 'react-router-dom';
import './header_and_footer_styles.css'; 

const Header = () => {
  return (
    <header className="h_items">
      <div className="h_nav">
        <NavLink to="/" className="hn_link">
          Главная
        </NavLink>
        <NavLink to="/service" className="hn_link">
          Услуги
        </NavLink>
        <NavLink to="/щвкшпорзвкщлр" className="hn_link">
          404
        </NavLink>
      </div>
      <div className="h_nav_2">
        <img src="/images/images_foote_header/logo.svg" alt="Логотип салона красоты" className="logo_header" />
      </div>
      <div className="h_nav">
        <NavLink to="/our_team" className="hn_link">
          Мастера
        </NavLink>
        <NavLink to="/contact" className="hn_link">
          Контакты
        </NavLink>

        <NavLink to="/masterclass" classname= "hn_link">
        Мастер-классы
        </NavLink>
      </div>
    </header>
  );
};

export default Header;