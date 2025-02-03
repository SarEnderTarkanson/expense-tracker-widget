# Expense Tracker Widget

## **Introduction**

This is an interactive expense tracker widget that enables users to add, edit, visualize and track their expenses over time. Each user interaction (add, update, sort, filter) is reflected on the UI instantly.

## How to Run the Application Locally?

1 - In order to run the application, Node should be already installed on any local machine. 

In order to install on either Windows, Linux or MacOS, please follow the link below and specify the suitable parameters for your operating system:

https://nodejs.org/en/download

The project used yarn as the package manager, therefore it is highly recommended to use yarn as the package manager. In case of using npm, please make sure to delete yarn.lock file in order to avoid warnings regarding package manager in the Code Editor.

2 - After having Node installed, please clone the repo with the following command (make sure to have git installed in your computer and have a GitHub account authenticated in your computer):

git clone https://github.com/SarEnderTarkanson/expense-tracker-widget.git

3 - When the project is cloned to your computer, please navigate to the project directory (expense-tracker-widget).

4 - Once inside the project directory, run the following command:

yarn install

(if npm is going to be used as the package manager, please replace the word "yarn" with "npm" in the command above -> npm install)

5 - Once all the necessary dependencies are installed, please run the following commands in the command prompt to start the json-server :

npx json-server -p 3500 -w data/categories.json

npx json-server -p 3501 -w data/expense-list.json

These two commands will start two endpoints that will be our mock REST APIs.

While using the client application, please do not close these two command prompt windows and make sure that they continue to run.

6 - After seeing that the json-server is running for both endpoints, please run the following command:

yarn start

(in case of using npm as the package manager, please replace the word "yarn" with "npm" in the command above -> npm start)

This will start the local server for the client applicaiton and the client application should start running a prompted browser window.

After seeing that the new window is opened in your browser, you can start interacting with the client application.

## Description of Design Choices:

The client application has four main sections:

1 - Add Expense:

It allows the users to input their expenses with Name, Amount and Category.

Every new input's default date value becomes the date when the insertion is executed (For example, if the user input the value on 2025-02-03, then the date is instantly submitted as 2025-02-03 as will be observed both in the Expense List section in the UI and also in expense-list.json file)

2 - Expense List:

It allows users to see their expenses in a list. Users can filter, sort and edit the values that they had earlier inserted.

3 - Expense Summary:

This section visualizes the inserted expenses in terms of amount and percentage based on category in a pie chart.

4 - Expense Trend:

The section visualizes the expenses of the user based on date in a line chart. With the line chart, users can track the trend of their total spending on any date. 

There is a "dark mode / light mode" button at the top right corner of the page, which enables the user to choose between the two themes.

The application is built with as clean and simple as possible UI. Advanced and futuristic animations or elements are avoided to provide the user with a clean, simple and non-complex UI.

User interactions involving adding and updating an expense is interactive throughout the application both in the client application and in the mock API endpoints (please observe the expense-list.json file after adding or updating an expense, data in the json file will be changed along with the UI in the client application)

Additionally, any chnage in the data which is the result of the user interaction is reflected in the UI instantly (Please observe adding and updating any value will immediately be reflected in the charts and expense list)

## Challenges Faced:

1 - While implementing validations, more specifically when covering the edge cases such as decimals in the amount field in the Add Expense section, I faced minor challenges.

2 - For increasing the accessibility of the client application, I needed to do more research.

3 - Initiating the pie chart with "No data available" text was challenging since we are also initiating the categories with predefined colors, to keep consistency in colors any time the app is reloaded.
