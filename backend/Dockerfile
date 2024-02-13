# Utilisez une image Python officielle
FROM python:3.10-alpine

# Définit le répertoire de travail
WORKDIR /app

# Copie le répertoire backend avec app.py et database.py dans le conteneur
COPY . /app

# Installez les dépendances (vous devez avoir un fichier requirements.txt)
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Exposez le port sur lequel FastAPI écoute
EXPOSE 8000

# Commande pour exécuter l'application FastAPI
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]