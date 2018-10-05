# Required variables to start the api service:

export **<CONNECTION_STRING>** - use your connection string to mongodb;

export **<BUSINESSAPP_PRIVATE_KEY>** - secret key for Json Web Token;

export **<NODE_ENV>** - production or development - It makes difference at log level;

# Installing packages:

Install node packages
```bash
$ npm install
```

Start the application. You need to set environment variables first, otherwise the api won't run.
```bash
$ npm start
```