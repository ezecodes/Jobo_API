## Getting started
### Installation
* Run `git clone https://github.com/bnkcrft/backend` to download the repo. <br />
* Run `npm ci` to install the required npm packages.

### Populating `.env` file
After installing the packages,  create a '.env' file in the root directory. <br />
These variables are required in the '.env' file created above, use any value of you choice. <br />
  `PORT` `NODE_ENV` `DB_URL` `USER_JWT_SECRET` `USER_COOKIE_SECRET`. <br />
The `DB_URL` variable represents a URI to a mongoDB database cluster.

### Running the project
After creating the reqired env variables, type `npm run dev` to run the project in development mode.

### Using the APIs
A list of all available APIs and documentation can be found <a href='https://bankcraft.postman.co/workspace/My-Workspace~4b6f3538-9378-4f3f-84dd-ed39ddb72cad/request/30807885-c75c0572-103b-47b1-acdf-9e27c38fa110'> here </a>

## Backend Implementation
### Athentication and authorisation
Upon successfull login, the server stores a secured cookie on the client. This cookie will be used to authencate and authorise the user when making requests to the protected routes.

