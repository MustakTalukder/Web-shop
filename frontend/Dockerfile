FROM node:20-alpine3.19 as development

WORKDIR /frontend

COPY .eslintrc.cjs ./
COPY jsconfig.json ./
COPY package.json ./
COPY vercel.json ./
COPY vite.config.js ./

RUN npm install

COPY . ./

# Run the application
CMD ["npm", "run", "preview"]