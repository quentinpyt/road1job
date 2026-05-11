# Image Node officielle
FROM node:20

# Dossier de travail
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer dépendances
RUN npm install

# Copier tout le code
COPY . .

# Générer Prisma client
RUN npx prisma generate



# Port backend
EXPOSE 3001

# Lancer le serveur
CMD ["npm", "run", "dev"]