# How To
Install all dependencies
> npm install

Generate the project
> npx prisma generate

Migrate DB schema
> npx prisma migrate dev --name init

Check DB from your browser
> npx prisma studio

Run the app
> npm run dev


# Unit Test
Run unit test
> npm run test


# Env
Create a new file and name it as ".env". Put the file in the root of the project. Paste the following snippet inside the file:
> DATABASE_URL="file:./dev.db"

