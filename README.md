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

## Use Case Diagram
![image](https://github.com/user-attachments/assets/40c08d57-9ad2-43e0-9c6f-32e05b796144)  

[Table] Actors description  
| Actor | Description | Use cases |
| ----- | ----------- | --------- |
| User | An entity interacting with the system, capable of using strength and caloric demand calculators, creating and generating workout and meal plans, and tracking workout progress, provided successful authorization. | All, except creating workout plan templates for generation, creating meals, and managing user accounts. |
| Administrator | An entity similar to a user, with additional privileges such as creating workout plan templates, creating meals, and managing user accounts. | All |

# System presentation
This section will present the appearance and functionality of all system segments from the administrator's perspective.  

## Login and registration
![Login and registration screenshot](https://github.com/user-attachments/assets/b696bf06-b136-43f4-88bd-a83345e72283)
*Image 1: Registration (on the left) and login (on the right) screen.*  

Image 1 shows the registration and login screen. If the user is unauthorized, they are automatically redirected to the login screen, from where they can also proceed to the registration via the hyperlink marked as number 13 and return to the login screen using the link marked as number 8. All fields (1-6) are required to create an account in the system; after the form is correctly filled out, the submit button (number 7) is unlocked. It is verified whether an account with the given username (number 4) and email (number 5) already exists. To log in, the user must provide the username or email address used during registration in the field marked as number 9, along with the password (number 10). Optionally, the user can choose to stay logged in (number 11), ensuring that they will not be logged out after closing the browser tab. After entering the required data, the button to submit the form (number 12) is unlocked. Upon successful authorization, the user is redirected to the training module view.
