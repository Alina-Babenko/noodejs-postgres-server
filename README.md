# A secured example of RESTful API
Built with NodeJS, TypeScript, Postgres, TypeORM, Class Validator, and JWT. It provides CRUD functionality for posts and users, and users can register and log in to access the protected routes.

## Features

- CRUD operations for posts, authors and users
- Authentication and authorization with JWT
- Validation with Class Validator
- Pagination support
- Error handling
- PgAdmin for administrating database
- Swagger doc for testing

## Start via Docker
1. Copy the `.env.example` file to `.env`
2. Install the dependencies: `yarn install` or `yarn`
3. Run `yarn docker:up`
4. Open pgAdmin `http://localhost:5050/browser/` and login
5. Access to swagger doc through `http://localhost:3000/api-docs`

## Show migrations in docker
1. View the list of running containers `docker ps`
2. Get the container id for our app, and login into the container using the command `docker exec -it 382fdc62d530 /bin/sh`
3. `yarn migration:show`

## Create migrations
1. Run with custom name `yarn migration:create <name>`
2. Using `queryRunner.createTable` create needed tables
