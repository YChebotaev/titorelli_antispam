FROM node

ARG database_url=data/db.sqlite3
ARG port=3000
ARG host=::

WORKDIR /titorelli_antispam_service
ADD data/ ./data
RUN rm ${database_url}
ADD lib/ ./lib
ADD migrations/ ./migrations
ADD seeds/ ./seeds
ADD index.ts .
ADD knexfile.ts .
ADD tsconfig.json .
ADD package.json .
# ADD package-lock.json .
RUN npm install --no-save
RUN npm run migrate --all
RUN npm run seed

ENV NODE_ENV=production
ENV DATABASE_URL=${database_url}
ENV PORT=${port}
ENV HOST=${host}

EXPOSE ${port}

CMD [ "npm", "start" ]
