npm i typescript @types/node -D

npx tsc --init

https://github.com/tsconfig/bases?tab=readme-ov-file

{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "20.1.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  },
  "include": ["src"]

}

npx i tsx -D

npm i fastify

npm install prisma -D

npx prisma init --datasource-provider SQLite

npm i zod