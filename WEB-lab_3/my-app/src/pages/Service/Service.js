import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import servicesData from '../../data/services.json';
import './service_style.css'; 

const Services = () => {
  const cards = [
    { id: 1, image: "/images/images_for_service/image1.png", className: "price_card1" },
    { id: 2, image: "/images/images_for_service/image2.png", className: "price_card2" },
    { id: 3, image: "/images/images_for_service/image3.png", className: "price_card3" },
  ];

  return (
    <div>
    <main>
      
      <section className="services">
        <h2 className="h2_underh">Цены на услуги</h2>
        <div className="services_section">
          {cards.map((card) => (
            <div key={card.id} className={card.className}>
              <img src={card.image} alt="Наши услуги" className={`service_img img${card.id}`} />
              <div className={`service_price service_price${card.id}`}>
                {servicesData
                  .filter((service) => {
                    if (card.id === 1) return service.id <= 4;
                    if (card.id === 2) return service.id > 4 && service.id <= 8;
                    if (card.id === 3) return service.id > 8;
                    return false;
                  })
                  .map((service) => (
                    <div key={service.id}>
                      <h3 className="flex_price">
                        <span>{service.name}</span>
                        <span className="price_money">{service.price}</span>
                      </h3>
                      <p className="services">{service.description}</p>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    
    </div>
  );
};

export default Services;