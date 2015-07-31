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

2. Ensure that pip is installed on the web server.
    - Pip is a python package manager that will help install the requirements for healthyhome.
    - See http://www.pip-installer.org for installation instructions.

3. Upload the healthyhome files to the server using one of the following steps:
    1. FTP
        - Download an archive of the application from https://github.com/jasonchenzhou/ToGather/archive/master.zip.
        - Upload the archive to server and unzip it.
    2. Git
        - Use URL https://github.com/CSC301H-Fall2013/healthyhome.git

4. Install the packages required by healthyhome.
    - SSH into the server.
    - cd into the healthyhome directory.
    - Run `pip install -r requirements.txt` to install the requirements.

5. Follow the [Deploying Django](http://www.djangobook.com/en/2.0/chapter12.html) instructions to setup healthyhome for the current server environment.

### Submitting a Complaint
Replace http://www.example.com with the base URL (the URL healthyhome is accessible from) in the instructions below.

1. Report complaints at http://www.example.com/report.
2. Enter in a valid address, city and province. 
3. Select at least one problem to complain about.
4. Click submit.
5. Confirm the complaint, or go back to edit the address.

### Moderation
Replace http://www.example.com with the base URL (the URL healthyhome is accessible from) in the instructions.

1. Access the admin area of the website at http://www.healthyhome.com/admin
2. Login with default admin account 'healthyhome' and password 'fiber'.
3. Delete a building or complaint.
    - Delete a building by clicking on the 'Building' link, selecting the building, and choosing 'Delete selected buildings' from the Action dropdown.
    - Delete a complaint by clicking on the 'Complaint' link, selecting the complaint, and choosing 'Delete selected complaint' from the Action dropdown.

### Using the application
Replace http://www.example.com with the base URL (the URL healthyhome is accessible from) in the instructions.

Refer to the help page at http://www.example.com/help for instructions on using healthyhome.

### Disqus
Healthyhome uses Disqus for building page comments. By default, healthyhome is setup to work with the 'healthyhome' Disqus account. To change to a new account follow these steps.

1. Setup a Disqus account using http://disqus.com.
2. Edit the template page templates/complaints/building\_page.html, replacing the disqus_shortname variable with shortname associated with the new Disqus account.

To moderate comments, login to the Disqus account from (http://disqus.com).
