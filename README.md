ToGather
===========

The ToGather project is an interactive mapping platform that would display events created by a number of users (Event creaters, Event attendees) that would be sent into the interactive Google map through a web browser. The information would include minimum criteria to be determined, such as: Event date, Event type, and Event location. The data will be displayed above a Google Map. The purpose of the interactive map would be to facilitate the huge amount of service problems that exist in large Canadian Cities. Toronto will serve as a pilot site with the aim of broadening the project to Ottawa and eventually nation-wide. Website of [ToGather](https://www.ToGather.org/).

[Live Website](http://t0gather.herokuapp.com)

### Requirements
- Google Maps API
- Oauth Account
- Node 0.12.7
- express 4.13.0
- ejs 2.3.2
- body-parser 1.13.1
- cookie-parser 1.3.5
- debug 2.2.0
- morgan 1.6.1
- -mongodb 1.4.15
- -express-session 1.91
- -connect-mongo 0.4.1
- -connect-flash 0.1.1
- -markdown 0.5.0
- -multer 0.1.6
- -gridfs-stream *
- -formidable *
- -quickthumb *

### Installation

1. Ensure that NodeJS 0.12.7 is installed on the web server.
    - Skip this step if NodeJS is already installed on the web server.
    - See https://nodejs.org/ for installation instructions.

2. Ensure that all modules are installed on the web server.
    - NPM is a NodeJS package manager that will help install the requirements for ToGather.
    - See https://www.npmjs.com/ for installation instructions.

3. Upload the healthyhome files to the server using one of the following steps:
    1. FTP
        - Download an archive of the application from https://github.com/jasonchenzhou/ToGather/archive/master.zip.
        - Upload the archive to server and unzip it.
    2. Git
        - Use URL https://github.com/jasonchenzhou/toGather.git

4. Install the packages required by toGather.
    - SSH into the server.
    - cd into the toGather directory.
    - Run `npm install` to install the requirements.

5. Follow the [Installing and Building NodeJS](https://github.com/joyent/node/wiki/Installation) instructions to setup NodeJS for the current server environment.

### Submitting a Complaint
Go to http://www.github.com/jasonchenzhou/toGather.

1. Report complaints at https://github.com/jasonchenzhou/toGather/issues
2. Click 'New issue'
3. Write at least one problem to complain about as a title.
4. Leave a comment.
5. Click 'Submit new issue'.

### Moderation
Replace http://www.example.com with the base URL (the URL togather is accessible from) in the instructions.

1. Access the admin area of the website at http://www.togather.com/admin
2. Login with default admin account 'admin' and password 'admin'.
3. Delete a Event, a review, or a account.
    - Delete a Event by clicking on the 'Event' link, selecting the Event, and choosing 'Delete selected Events' from the Action dropdown.
    - Delete a review by clicking on the 'Review' link, selecting the review, and choosing 'Delete selected Review' from the Action dropdown.
    - Delete a account by clicking on the 'Account' link, selecting the Account, and choosing 'Delete selected Account' from the Action dropdown.

### Using the application
Replace http://www.example.com with the base URL (the URL togather is accessible from) in the instructions.

Refer to the help page at http://www.example.com/about for instructions on using toGather.

### oAuth
toGather uses oAuth for creating page events and reviews. By default, toGather is setup to work with the 'togather' oAuth account. To change to a new account follow these steps.

1. Setup an oAuth account using http://gmail.com.
2. Login with the account created.
