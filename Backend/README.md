# Required variables to start the api service:

export **<CONNECTION_STRING>** - use your connection string to mongodb;

export **<BUSINESSAPP_PRIVATE_KEY>** - secret key for Json Web Token - Any alpha numeric value;

export **<NODE_ENV>** - production or development - It makes difference at log level;

export **<ORIGIN_URL>** - Url who will call this api for Cors propuses

# Installing:

Install node packages
```bash
$ npm install
```

# Running:

Example of the command line to execute in development mode:

**For mac users**
```bash
$ export NODE_ENV=development export BUSINESSAPP_PRIVATE_KEY=arCm7e5fdseArbmnseGz export CONNECTION_STRING=MONGO_URL=mongodb://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE> export ORIGIN_URL=http://localhost:4200 && npm run dev
```

**For windows users (untested)**
```cmd
$ set NODE_ENV=development set BUSINESSAPP_PRIVATE_KEY=arCm7e5fdseArbmnseGz set CONNECTION_STRING=MONGO_URL=mongodb://<USER>:<PASSWORD>@<HOST>:<PORT>/<DATABASE> set ORIGIN_URL=http://localhost:4200 && npm run dev
```