import React from 'react';
import Header from '../../components/Header/Header.js';
import './contact_styles.css';

const Contact = () => {
  return (
    <div>
      <Header/>
    <main>
      <section className="contact">
        <h2 className="text1">Контакты</h2>
        <div className="flex_container_for_main">
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11179.91579220192!2d30.341031174736326!3d53.90886193550294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d04e1f7037f623%3A0xd22b2615d815c80c!2z0KHQv9C-0YDRgtC80LDRgdGC0LXRgA!5e0!3m2!1sru!2suk!4v1748201148802!5m2!1sru!2suk"
              className="map-iframe"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex">
            <div className="contact_info">
              <h3>Контакты</h3>
              <p className="phone">+7 (812) 123-45-67</p>
              <p className="phone">+7 (911) 123-45-67</p>
              <p className="adress">Новоостровский проспект, дом 36 лит.</p>
            </div>
            <div className="contact_info">
              <h3>Режим работы</h3>
              <p className="phone">C 10:00 до 21:00 (Пн-Пт)</p>
              <p className="phone">С 11:00 до 20:00 (Сб-Вс)</p>
            </div>
            <div className="contact_info">
              <h3>Дополнительная</h3>
              <p className="phone">Будем рады вас видеть!</p>
              <p className="phone">Не забудьте взять бахилы</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    </div>
  );
};

export default Contact;