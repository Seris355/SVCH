import React from 'react';
import { NavLink } from 'react-router-dom';
import './header_and_footer_styles.css'; 

const Header = () => {
  return (
    <header>
      <div className="h_items">
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
          <NavLink to="/masterclass" className="hn_link">
            Мастер-классы
          </NavLink>
        </div>
      </div>
      <div className="h_nav_admin">
        <NavLink to="/admin/instructors" className="hn_link_admin" end>
          Инструкторы
        </NavLink>
        <NavLink to="/admin/participants" className="hn_link_admin" end>
          Участники
        </NavLink>
        <NavLink to="/admin/masterclasses" className="hn_link_admin" end>
          Управление мастер-классами
        </NavLink>
      </div>
    </header>
  );
};

export default Header;