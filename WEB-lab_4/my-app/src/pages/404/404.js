import React from 'react';
import './404.css';
import '../Index/style.css'; 
import '../../components/Header/header_and_footer_styles.css';

const NotFound = () => {
  const handleMouseMove = (e) => {
    const spotlight = document.getElementById('spotlight');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, transparent 0  100px, rgba(0, 0, 0, 0.95) 200px)`;
    }
  };

  return (
    <div>
      <main className="page-container nf-page-container" onMouseMove={handleMouseMove}>
        <div id="spotlight" className="spotlight" />
        <section className="H1_sec">
          <div className="H1_scroll">
            <h1 className="nf-title">404</h1>
            <p className="text_main_huge">Страница не найдена</p>
            <p className="nf-description">Такой страницы не существует</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NotFound;