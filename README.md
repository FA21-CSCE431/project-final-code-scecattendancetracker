# README

## Introduction ##

SCECAttendanceTracker

This project was the cumulative work of six students in Pauline Wade's CSCE 431 class in the Fall of 2021. We have built a web application that acts as a portal for the Student Council for Exceptional Children that allows its members to view upcoming events, mark their attendance, and keep track of various other points of interest.

## Requirements ##

This code has been run and tested on:

* Ruby - 3.0.2p107
* Rails - 6.1.4.1
* Ruby Gems - Listed in `Gemfile`
* PostgreSQL - 13.3
* Nodejs - v16.7
* Yarn - 1.22.11
* React


## External Deps  ##

* Docker - Download latest version at https://www.docker.com/products/docker-desktop
* Heroku CLI - Download latest version at https://devcenter.heroku.com/articles/heroku-cli
* Git - Download latest version at https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

## Installation ##

Download this code repository by using git:

 `git clone https://github.com/SCEC-Attendance-Tracker/SCECAttendanceTracker.git`


## Tests ##

An RSpec test suite is available and can be ran using:

  `rspec spec/`

## Execute Code ##

Run the following code in Powershell if using windows or the terminal using Linux/Mac

  `cd SCECAttendanceTracker`

  `docker run --rm -it --volume "$(pwd):/SCECAttendanceTracker" -e DATABASE_USER=test_app -e DATABASE_PASSWORD=test_password -p 3000:3000 dmartinez05/ruby_rails_postgresql:latest`

  `cd SCECAttendanceTracker`

Install the app

  `bundle install && rails webpacker:install && rails db:create && db:migrate`

Run the app
  `rails server --binding:0.0.0.0`

The application can be seen using a browser and navigating to http://localhost:3000/

To create admin credentials after signing in to the site, turn off the server, and open the rails console in your terminal. 

 `rails console`
 `member = Member.find(USER_EMAIL_HERE)`
 `member.admin = true`
 `member.is_member = true`
 `member.update()`

Then exit the console and start the rails server.

## Environmental Variables/Files ##



## Deployment ##

https://www.codecademy.com/articles/deploy-rails-to-heroku


## CI/CD ##

CI/CD is built into this repository. Simply copy the workflow.yml file into another project if you intend on moving/forking this repository. This project is no longer connected to the Heroku pipeline we used during active development to deploy changes. You will want to hook up your Heroku account to this repository such that changes to the main branch will automatically redeploy to the production instance. Further instructions for achieving this can be found via Google.

Additional resource:
https://web.microsoftstream.com/video/c6b12d75-c824-4f87-bea2-f8ec0c9323ff

## Support ##

Admins looking for support should first look at the application help page.
Users looking for help seek out assistance from the customer.
