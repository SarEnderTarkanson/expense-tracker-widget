# Expense Tracker Widget

## *Introduction*

This is an interactive expense tracker widget that enables users to add, edit, visualize and track their expenses over time.

## *How to Run the Application Locally?*

1 - In order to run the application, Node should be already installed on any local machine. 

In order to install on either Windows, Linux or MacOS, please follow the link below and specify the suitable parameters for your operating system:

https://nodejs.org/en/download

2 - After having Node installed, please clone the repo with the following command (make sure to have git installed in your computer and have a GitHub account authenticated in your computer):

git clone https://github.com/SarEnderTarkanson/expense-tracker-widget.git

3 - When the project is cloned to your computer, please navigate to the project directory (expense-tracker-widget) in the command prompt (*for Windows*) or in the terminal (*for MacOS*).

4 - Once inside the project directory, run the following command in the command prompt (*for Windows*) or in the terminal (*for MacOS*):

*npm install*

5 - Once all the necessary dependencies are installed, please run the following commands in to start the json-server in two separate command prompts (*for Windows*) or terminals (*for MacOS*):

*npx json-server -p 3500 -w data/categories.json*

*npx json-server -p 3501 -w data/expense-list.json*

These two commands will start two endpoints that will be our mock REST APIs.

While using the client application, please do not close these two command prompts (*for Windows*) or terminals (*for MacOS*) and make sure that they continue to run.

*PS: If the console asks for additional dependency regarding the json-server, please accept it by typing y and then pressing enter to install the necessary dependency for the json-server.*

6 - After seeing that the json-server is running for both endpoints, please run the following command in another separate command prompt (*for Windows*) or terminal (*for MacOS*):

*npm start*

This will start the local server for the client applicaiton and the client application should start running in a prompted browser window.

After seeing that the new browser window is on in your browser, you can start interacting with the client application.

Finally, we will have three separate command prompts (*for Windows*) or terminals (*for MacOS*) in total that will be running simultaneously.

## Description of Design Choices:

The client application has four main sections:

1 - Add Expense:

It allows the users to input their expenses with Name, Amount, Category and Date.

2 - Expense List:

It allows users to see their expenses in a list. Users can filter, sort and edit the values that they had earlier inserted.

3 - Expense Summary:

This section visualizes the inserted expenses in terms of amount and percentage based on category in a pie chart.

4 - Expense Trend:

The section visualizes the expenses of the user based on date in a line chart. With the line chart, users can track the trend of their spending. 

There is a "*dark mode (🌙)* / *light mode (☀️)*" button at the top right corner of the page, which enables the user to choose between the two themes.

In the application's design modern, clean, user-friendly and simplistic UI has been the priority.

User interactions such as adding and updating an expense is interactive throughout the application both in the UI and in the mock API endpoints (*Please observe the expense-list.json file after adding or updating an expense, data in the json file will be changed along with the UI in the client application. Additionally, please also observe that adding and updating any value will immediately be reflected in the charts and expense list*)

## Challenges Faced:

1 - While implementing validations, more specifically when covering the edge cases such as decimals in the amount field in the Add Expense section.

2 - For increasing the accessibility of the client application, some additional research needed to be carried out.

3 - Initiating the pie chart with "No data available" text was challenging since we are also initiating the categories with predefined colors, to keep consistency in colors any time the app is reloaded.

4 - Improving the responsiveness of the UI for different screen sizes.
