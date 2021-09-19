FROM node:14-alpine

# Set working directory to /app
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the source code
COPY . .

# Expose port to the outside world
EXPOSE 5000

CMD ["npm", "start"]
