# Sequelize CLI - Migrations

Migrations are run on app startup - not restart via nodemon (for example).

## Create New Table - Model & Migration

Navigate to the project in the terminal, and use the following command to generate a migration and a model scaffold file. Name can (and should) be changed to be representative of what you're doing. You can define table attributes via CLI, but can also generate a barebones file and modify it in your editor of choice.

While largely unimportant for functionality, for developer sanity, bear in mind that Sequelize pluralizes for you, sometimes silently. Defining a model's name as "Member" will probably make you see a table named "Members" if you check your database. Defining "ItemsSold" will probably result in a table named "ItemsSolds"

```
node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

## Modify Existing Table - Migration Only

Navigate to the project in the terminal, and use the following command to generate a migration scaffold file. Name can (and should) be changed to be representative of what you're doing.

```
node_modules/.bin/sequelize migration:create --name add-password-to-user
```
