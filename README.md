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
![Use case diagram image](https://github.com/user-attachments/assets/40c08d57-9ad2-43e0-9c6f-32e05b796144)  

[Table] Actors description  
| Actor | Description | Use cases |
| ----- | ----------- | --------- |
| User | An entity interacting with the system, capable of using strength and caloric demand calculators, creating and generating workout and meal plans, and tracking workout progress, provided successful authorization. | All, except creating workout plan templates for generation, creating meals, and managing user accounts. |
| Administrator | An entity similar to a user, with additional privileges such as creating workout plan templates, creating meals, and managing user accounts. | All |

# System presentation
This section will present the appearance and functionality of all system segments.

## Login and registration
![Image 1: Login and registration views](https://github.com/user-attachments/assets/1a197b21-d2f2-485f-8caa-acd26536e676)  
*Image 1: Registration (on the left) and login (on the right) screen.*  

*Image 1* shows the registration and login screen. If the user is unauthorized, they are automatically redirected to the login screen, from where they can also proceed to the registration via the hyperlink marked as number 13 and return to the login screen using the link marked as number 8. All fields (1-6) are required to create an account in the system; after the form is correctly filled out, the submit button (number 7) is unlocked. It is verified whether an account with the given username (number 4) and email (number 5) already exists. To log in, the user must provide the username or email address used during registration in the field marked as number 9, along with the password (number 10). Optionally, the user can choose to stay logged in (number 11), ensuring that they will not be logged out after closing the browser tab. After entering the required data, the button to submit the form (number 12) is unlocked. Upon successful authorization, the user is redirected to the training module view.

## Strength calculator and RPE scale customization
![Image 2: Strength calculator view](https://github.com/user-attachments/assets/ee52c75f-c02a-4a71-8788-ee6d73e49d9f)  
*Image 2: Strength calculator view*  

*Image 2* shows the view of the one-rep max calculator. This panel allows the user to estimate their maximum strength result or determine the approximate weights they should use during training to meet their workout goals. To calculate this, the user needs to input the weight (excluding the unit) in the field marked as number 2, the number of repetitions (number 3), and the RPE value (number 4) achieved during the exercise, and then confirm with the button (number 6). The results will be displayed in the table (number 7), where the first column contains consecutive RPE values from 10 to 5 with a step of 0.5, and the first row shows the number of repetitions from 1 to 15. The inner cells represent the estimated weight with which the user should be able to perform the exercise. The exercise selection is made in the field marked as number 5, with options including squat, bench press, and deadlift. Based on this selection, a specific RPE scale will be used, which can be customized by navigating to the view shown in *Image 3* using the button marked as number 1.  

![Image 3: RPE scale personalization view](https://github.com/user-attachments/assets/bef00723-7e90-4949-8a12-c7f6d8c3c9c1)  
*Image 3: RPE scale personalization view*  

*Image 3* shows the view of the RPE scale customization. The default scale is calculated for 4 repetitions at 85% of the maximum weight and 8 repetitions at 70%. In the fields marked as numbers 2 and 3, the user can enter these repetition counts for 85% and 70% of the maximum weight, respectively. To calculate a new scale for the given exercise, both fields (2 and 3) must be filled out. Otherwise, upon submitting the form with the button (number 4), the user will be informed of an error and the need to fill out the fields correctly. The buttons for switching the tab containing the scale table (number 6) for the given exercise are marked as number 5. After making changes, the user can save the new scales, which will be used in the strength calculator and progress tracking module.

