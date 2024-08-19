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
*Image 2: Strength calculator view.*  

*Image 2* shows the view of the one-rep max calculator. This panel allows the user to estimate their maximum strength result or determine the approximate weights they should use during training to meet their workout goals. To calculate this, the user needs to input the weight (excluding the unit) in the field marked as number 2, the number of repetitions (number 3), and the RPE value (number 4) achieved during the exercise, and then confirm with the button (number 6). The results will be displayed in the table (number 7), where the first column contains consecutive RPE values from 10 to 5 with a step of 0.5, and the first row shows the number of repetitions from 1 to 15. The inner cells represent the estimated weight with which the user should be able to perform the exercise. The exercise selection is made in the field marked as number 5, with options including squat, bench press, and deadlift. Based on this selection, a specific RPE scale will be used, which can be customized by navigating to the view shown in *Image 3* using the button marked as number 1.  

![Image 3: RPE scale personalization view](https://github.com/user-attachments/assets/bef00723-7e90-4949-8a12-c7f6d8c3c9c1)  
*Image 3: RPE scale personalization view.*  

*Image 3* shows the view of the RPE scale customization. The default scale is calculated for 4 repetitions at 85% of the maximum weight and 8 repetitions at 70%. In the fields marked as numbers 2 and 3, the user can enter these repetition counts for 85% and 70% of the maximum weight, respectively. To calculate a new scale for the given exercise, both fields (2 and 3) must be filled out. Otherwise, upon submitting the form with the button (number 4), the user will be informed of an error and the need to fill out the fields correctly. The buttons for switching the tab containing the scale table (number 6) for the given exercise are marked as number 5. After making changes, the user can save the new scales, which will be used in the strength calculator and progress tracking module.  

## Training plans module  
![Image 4: Training plans module view](https://github.com/user-attachments/assets/4e97750f-b9a0-4c95-860d-0a508ed4134c)  
*Image 4: Training plans module view.*  

![Image 5: Modal windows for the training plans module options](https://github.com/user-attachments/assets/86769dec-3544-4ed8-97c9-d0a009c2040c)  
*Image 5: Modal windows for the training plans module options.*  

*Image 4* shows the view of the training plans module. It includes three segments: creating training plans (number 1), generating training plans (number 2), and the training plan editor (number 3). Upon selecting the first option, a modal window marked as number 1 in *Image 5* will open, where the user can choose between a blank workbook or previously saved training plans to create a new one. Selecting the training plan editor opens window number 2 from *Image 5*, where the available options are the user-assigned training plans that can be edited and updated. The final option is generating training plans, which opens window number 3 from *Image 5*. Here, the user can select parameters such as the primary training goal, the body segment they want to focus on, the priority (e.g., specific exercises for strength building or specific muscle groups for muscle building), and the skill level. If a plan that meets the exact requirements is generated, it will be displayed in the window, offering plans or a specific training plan for selection (number 5, *Image 5*). Otherwise, the most closely matched plan will be found, and the user will be informed (number 4, *Image 5*). After selecting a plan from any option, the user will be redirected to the training plan view (*Image 6*).  

![Image 6: Training plan view](https://github.com/user-attachments/assets/f31d53d0-3661-4d8e-8ba2-0932a95db4ea)  
*Image 6: Training plan view.*  

*Image 6* shows the view of a training plan. Number 1 indicates the options for customizing columns according to the user's needs. The table (number 6) permanently includes only the basic columns, such as exercise name, series number, weight, and the number of repetitions. In the field marked as number 2, the user can adjust the number of workouts per week (from 1 to 7), and in the field marked as number 3, the duration of the plan (from 1 to 20 weeks). Additionally, the user has the option to export the plan to a PDF or Excel file (number 4). Number 5 indicates the save button, where an administrator can save the plan for all users or just for themselves, while a regular user can only choose the latter option (a similar situation applies when editing a plan, where the options include updating the data). Right-clicking on a row in the table opens a context menu (number 7) from which the user can add or remove exercises and series or copy the weekly plan to the next week. Number 8 indicates the paginator, where each number corresponds to the week number of the training plan.  

## Dieting module  
![Image 7: Dieting module view](https://github.com/user-attachments/assets/cb93bfb1-4d32-4ab0-9026-7500ac189010)  
*Image 7: Dieting module view.*  

*Image 7* shows the view of the nutrition module, where four options are available: a calorie needs calculator, meal creation, nutrition plan creation, and diet generation. Selecting the first option will redirect the user to the view shown in *Image 6*, the second option to the view in *Image 7*, and the third to the view in *Image 8*. For the diet plan generation option, a modal window shown in *Image 9* will open.  

![Image 8: Caloric demand calculator view](https://github.com/user-attachments/assets/8a8b6fa8-4a97-432f-a3a3-71bc641a7137)  
*Image 8: Caloric demand calculator view.*  

*Image 8* shows the caloric demand calculator. At the top of the screen is a form (number 2) where the user enters their gender, age, height, weight, physical activity level, and goal. After correctly filling out the form, it can be submitted using the button (number 3), which will then display the results in the form of a chart (number 4). The chart shows the total number of calories to be consumed in a day and a breakdown of macronutrients (carbohydrates, proteins, fats). When hovering the cursor over a specific segment of the chart, the corresponding weight in grams will be shown. At the bottom of the screen, there are panels with information (number 5) such as basal metabolic rate (BMR), total daily energy expenditure (TDEE), calorie requirements, and the recommended minimum amount of water to drink per day. The user can save this data using the button marked as number 5 and use it later when generating a diet plan.  

![Image 9: Meal creator view](https://github.com/user-attachments/assets/6083266c-100d-4aea-a79a-846f98ccabd5)  
*Image 9: Meal creator view.*  

*Image 9* shows the meal creator view, where meals are prepared for use in generating nutrition plans (when saved by the administrator, with the corresponding buttons labeled as number 4). Number 2 indicates the fields for the meal name and type (e.g., breakfast, lunch, dinner). Below that, under number 3, are fields for selecting food items and their quantities. Further down (number 4) are the fields displaying information about the meal's calorie content and macronutrient breakdown. At the bottom of the view, there are cards for added ingredients, where users can remove or adjust the quantities and view the calorie content.  

![Image 10: Diet plan creator view](https://github.com/user-attachments/assets/548223bd-e74e-4396-b0ea-66f710874a43)  
*Image 10: Diet plan creator view.*  

*Image 10* shows the view for creating a diet plan. At the top, part of the meal list is displayed (number 1). When hovering over a meal option, information about the meal's macronutrients will appear (number 3). The selection is confirmed by a button (number 2), after which the meal is added to the list in the form of a card (number 6), which includes a list of ingredients, calorie content, a delete option, and allergen information that appears when hovering over it (number 7). Number 4 indicates the total calorie content of the entire diet. Additionally, the plan can be exported to a PDF file using the button labeled as number 5.  

![Image 11: Diet plan generator form view](https://github.com/user-attachments/assets/f3d8563b-54ff-4de4-83f6-efc121f9d08d)  
*Image 11: Diet plan generator form view.*  

*Image 11* shows the form window used for generating a nutrition plan. In field number 1, the user enters the maximum number of calories to consume, with the option to use the calorie needs calculated by the calculator (*Image 8*) via the field labeled as number 2. Next, in field number 3, there is a list of allergens to be excluded from the plan. The next option (number 4) allows for selecting preferences such as low carbohydrates, low fats, or high protein content. The final option is to choose the number of meals per day (number 5), ranging from 1 to 7. After correctly filling out the form, the submit button (number 6) becomes active, redirecting the user to the diet plan view (*Image 12*).  

![Image 12: Generated diet plan view](https://github.com/user-attachments/assets/c86f3cad-2e1f-43ae-85b1-d54b27a8a65c)  
*Image 12: Generated diet plan view.*  

*Image 12* shows the view of a generated diet plan. At the top of the screen, there is information about the plan's calorie content (number 1) and a button for exporting the plan to a PDF file. The list of meals is presented as cards, which include a list of ingredients (number 4) and calorie information (number 5). The user has the option to randomly swap a meal using the button labeled as number 3.  

## Progress tracking module  
![Image 13: Progress tracking module view](https://github.com/user-attachments/assets/1b55f5d3-a9a2-4b13-8e96-1bf95bb91ce1)  
*Image 13: Progress tracking module view.*  

*Image 13* illustrates the view of the training progress tracking module. First, the user selects a training plan from the list (number 1), from which they can choose exercises (number 2) for tracking progress. Using the button or buttons labeled as number 3, the user can enter training data, which must be completed for at least 2 weeks of training; otherwise, access to the charts view (*Image 15*) will be restricted.  

![Image 14: Modal window for entering training data for the selected exercise](https://github.com/user-attachments/assets/39e546c3-0aaf-4615-9f29-82d5ed321454)  
*Image 14: Modal window for entering training data for the selected exercise.*  

*Image 14* illustrates the window used for entering training data for the selected exercise to track progress. The table (number 1) functions the same way as in the training plan view (*Image 6*). Number 2 denotes the paginator, where each number corresponds to a training week. Data is saved by pressing the button labeled as number 3.  

![Image 15: Progress tracking view](https://github.com/user-attachments/assets/b86f25cf-8f4a-45a9-a889-845ea84f3667)  
*Image 15: Progress tracking view.*    

*Image 15* shows the view for tracking training progress. Number 1 indicates the button where each option corresponds to a selected exercise, changing the chart tab. The first chart (number 2) displays the estimated one-rep max (in black) and the user's weight (in red) on a weekly scale. The second chart (number 3) illustrates the training tonnage on a weekly scale.  

## Administrator panel module  
![Image 16: Administrator panel view (account management)](https://github.com/user-attachments/assets/2d07ef17-0c46-43da-9569-e3be40c03b78)  
*Image 16: Administrator panel view (account management).*  

*Image 16* shows the administrator panel. Access is restricted to users with administrator permissions, and the view is only visible in the navigation for those users. Number 1 indicates the fields for changing user permissions, which are saved after confirmation with the button labeled as number 2. It is also possible to delete a user account using the button (number 3), with confirmation required in a modal window added to prevent accidental deletion of the account.  










