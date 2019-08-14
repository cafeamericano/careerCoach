# **Career Coach**
> Created by Matthew Farmer

## About
Career Coach is an application created to allow users to simultaneously track the status of multiple job applications. Job applications are represented as cards on the home screen with easy-to-understand progress indicators, and these cards may be sorted/filtered by the user's specified criteria. ©2019 Matthew Farmer

## Walkthrough

The login screen. From here, users may enter their credentials into the form at the top of the page to sign in. If users do not already have an account, they may create one by clicking on 'Create Account'.
![login](/app/public/demoMedia/login.png)

The form for creating a new account. Users are to provide their first name, last name, email address, desired username and password, and a link to a profile picture (if desired). If users fail to provide any mandatory information, choose a username that has already been taken, or provide less than six characters for their username or password, a notification will appear to alert the user of what changes must be made before an account can be created.
![createAccount](/app/public/demoMedia/createAccount.png)

The screen with which a user is presented upon login. This screen lists all job applications that a user has submitted in the form of informative cards. Each card indicates the name of the company, the job position, the number of days since the application was submitted, and a progress bar indicating where at in the job hunting process a user is for a particular position. By default, applications are listed in chronological descending order. However, users may sort this data by date or name and in either ascending or descending order by clicking the 'Sort Records' button at the top of the page. Likewise, a user may select a filter from the left side of the screen to limit results to applications that meet a specified criteria.
![allApps](/app/public/demoMedia/allApps.png)

The outstanding applications filter. By clicking this link on the left side of the screen, users may limit the visible job applications to only those that have not been denied, accepted, withdrawn, or otherwise concluded.
![outstandingApps](/app/public/demoMedia/outstandingApps.png)

The form for recording a new job application. Input validation (particularly in the form of dropdown boxes) is utilized here to accept input where appropriate.
![add](/app/public/demoMedia/addRecord.png)

The form for editing the an existing record for a job application. Input validation (particularly in the form of dropdown boxes) is utilized here to accept input where appropriate. Users also have the ability to delete records from this page.
![edit](/app/public/demoMedia/editRecord.png)

## Technologies Used

This application is built on NodeJS and hosted via Heroku. It uses MongoDB for its database and Express for routing. HandlebarsJS serves as the templating engine; jQuery and AJAX calls are heavily used throughout the application.
