# Backend

## API Documentation (Swagger)

In order to view the documentation, open documentation/swagger/dist/index.html in a browser of your choice.

## Developer Installation

Pre-requisites:
- Docker
- Docker-compose
- pgAdmin 4 (Or anything else that allows you to use psql via the CLI)

Docker does not work on windows without HyperV, which requires Win10 Pro or better. An alternative here is to run an alternate OS in a virtual machine. For example, Ubuntu 16.04 LTS via VirtualBox. If you need help setting this up, ask a nearby friendly dev.

Once you have docker and docker-compose installed, running the backend setup locally requires only that you cd to the project folder and run the following commands the first time you start the backend:

```
npm install
npm run dev:local:setup
npm run test:local:setup
```

On following startups, you should only need this command:

```
docker-compose up
```

This will tail the compose logs, and thus free you from having to continually retype docker-compose logs to access them. Terminate the process via Ctrl-c. If you need to run docker and maintain control of the terminal, add the -d flag in (Ex: docker-compose up -d), as this will run docker in the background.

## Sequelize Bugs

### Migrations: Table & Association Creation Bug

This bug appears when a new table is defined, whether a single table or the entire array of tables required by the app.

Due to breakage/changes in Sequelize, tables will be made from their migration file without associations and the associations will then fail to apply. The workaround, at present, is to create the migration and run it, then drop the table and let it be recreated properly next time, as Sequelize has now recorded the full layout of the table.

The table should be dropped through PSQL - either via Heroku CLI:

```
heroku pg:psql --app APP_NAME_HERE
drop table "TABLE_NAME_HERE";
```

Or docker:

```
docker exec -it CONTAINER_NAME_HERE psql -U postgres -d DATABASE_NAME_HERE
drop table "TABLE_NAME_HERE";
```

#### Potential Fixes

1) Define the associations through separate, intermediary tables referencing the ids of the associated tables - this makes the associations structurally independent of the associated tables, but does cause table bloat.
2) Manually define the columns otherwise created by the associations. (Untested, might cause collisions)

### Database Existence

Database is, at present, assumed to exist when the app is initialized.

#### Fix

For local development, it may be necessary to create the relevant database (local_dev as of this writing) manually.
