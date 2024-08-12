# Training Support System

## [EN]
A strength training support system developed as part of an engineering thesis.
The system was built using Angular 16 (front-end) and Strapi (back-end).
The system offers the following features:
* Creation and generation of workout plans
* Creation and generation of nutrition plans
* Creation of custom recipes
* Calculation of caloric needs
* Calculation of strength performance based on the RPE scale with customization options
* Tracking training progress with charts
* User management (administrators only)

## [PL]
System wspierający trening siłowy wykonany w ramach pracy inżynierskiej.
System został wykonany przy użyciu Angular 16 (front-end) i Strapi (back-end).
System umożliwia:
* Tworzenie i generowanie planów treningowych
* Tworzenie i generowanie planów żywieniowych
* Tworzenie własnych przepisów
* Obliczanie zapotrzebowania kalorycznego
* Obliczanie wyników siłowych na podstawie skali RPE i jej personalizację
* Śledzenie progresu treningowego na wykresach
* Zarządzanie użytkownikami (tylko administratorzy)

## [EN] Adding data to database | [PL] Dodanie danych do bazy
cd server/training-support-system  
npm run strapi import -- -f my-strapi-export.tar.gz.enc  
key: 123
