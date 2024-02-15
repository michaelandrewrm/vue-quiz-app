FROM node:18.19.0

WORKDIR /app

COPY . .

RUN npm install \
	&& npm run build

CMD [ "npm", "run", "preview" ]

EXPOSE 5173