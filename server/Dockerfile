FROM node:14-alpine

# Install dependencies with NPM Install cache
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Copy the source code
COPY . .

CMD ["npm", "start"]
