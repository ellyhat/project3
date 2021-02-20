# Project 3 - Date completed: 20/02/2021 

## A note on file organisation

### I am not confident enough with Github yet to manage the projects separately yet, and this is hopefully something I can learn in Project 4. Working directory called "3A" however do not want to change it in case it affects folder routing in code; original plan was to have three separate folders 3A, 3B and 3C. 

### I am still not confident to make branches and merge them back into master folder, and still finding Github interface confusing to navigate, so I am not confident to be able to try and be sure to find my project if it fails. All scripts are here for project components A, B and C in index_3a.js, index_3b.js, index_3c.js respectively. To launch any project, please go to launch.json file and change name of script under "program" to one of the above.

## Databases

### Projects A and B rely on a hard-coded JSON data file (data.js). 

### Project C introduces an SQL database; scripts can be run from the command line (see scripts in package.json). Please note they are customised for Windows users running Ubuntu terminal. To adapt these scripts for Mac, the code: 'sudo -u postgres psql' needs to be replaced with simply the code: 'psql'.

## HTML and CSS

### All projects use the same layout template (./views/pages/layout.ejs) and partials (./views/partials). Specific pages for Project 3 were created with SQL_ prefix in .ejs filename, however pages from Project A and B (such as error.ejs) were also reused in Project C when the requirements were similar. templates.css contains all CSS needed for all projects.

## SQL folder

### Contains SQL scripts that will be executed from the command line using npm run <insert script name as written in package.json> 