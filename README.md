# iChef api

iChef api, powered by serverless-framework and graphql

## Development instructions

```
docker-compose up -d
npm install

npm run knex -- migrate:latest
npm run knex -- seed:run

npm start
```
