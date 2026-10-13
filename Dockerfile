FROM node:18-alpine

WORKDIR /app

# Copia os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package*.json ./

# Instala apenas as dependências de produção
RUN npm ci --only=production

# Copia o restante do código da aplicação
COPY . .

EXPOSE 8080

CMD ["npm", "start"]