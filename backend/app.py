from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import database
import logging

app = FastAPI()

logging.basicConfig(filename='log/app.log', level=logging.DEBUG)

origins = [
    "http://localhost",
    "http://ec2-44-221-49-17.compute-1.amazonaws.com:31000",
    "http://localhost:3000",  # Remplacez ceci par l'URL de votre frontend React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Etudiant(BaseModel):
    nom: str
    prenom: str
    niveau: str
    matiere: str
    matricule: str
    date: str
    status: str

@app.post("/etudiant/")
def create_etudiant(etudiant: Etudiant):
    try:
        cursor = database.connection.cursor() 
        query = "INSERT INTO Etudiant (nom, prenom, niveau, matiere, matricule, date, status) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        values = (etudiant.nom, etudiant.prenom, etudiant.niveau, etudiant.matiere, etudiant.matricule, etudiant.date, etudiant.status)
        cursor.execute(query, values)
        database.connection.commit()
        logging.info("Étudiant créé avec succès!")
        return {"message": "Étudiant créé"}
    except Exception as e:
        logging.error(f"Erreur lors de la création de l'étudiant: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la création de l'étudiant")

@app.get("/etudiant/{id_etudiant}")
def read_etudiant(id_etudiant: int):
    cursor = database.connection.cursor(dictionary=True)
    query = "SELECT * FROM Etudiant WHERE id = %s"
    cursor.execute(query, (id_etudiant,))
    etudiant = cursor.fetchone()
    logging.info("Étudiant récupéré avec succès")
    if etudiant is None:
        raise HTTPException(status_code=404, detail="Étudiant non trouvé")
    return etudiant

@app.get("/etudiants/")
def read_etudiants():
    cursor = database.connection.cursor(dictionary=True)
    query = "SELECT * FROM Etudiant"
    cursor.execute(query)
    etudiants = cursor.fetchall()
    logging.info("Liste des étudiants récupérée avec succès")
    if not etudiants:
        raise HTTPException(status_code=404, detail="Aucun étudiant trouvé")
    return etudiants

@app.delete("/etudiant/{id_etudiant}")
def delete_etudiant(id_etudiant: int):
    try:
        cursor = database.connection.cursor()
        query = "DELETE FROM Etudiant WHERE id = %s"
        cursor.execute(query, (id_etudiant,))
        database.connection.commit()
        return {"message": "Étudiant supprimé avec succès"}
    except Exception as e:
        logging.error(f"Erreur lors de la suppression de l'étudiant: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la suppression de l'étudiant")

@app.put("/etudiant/{id_etudiant}")
def update_etudiant(id_etudiant: int, etudiant: Etudiant):
    try:
        cursor = database.connection.cursor()
        query = "UPDATE Etudiant SET nom=%s, prenom=%s, niveau=%s, matiere=%s, matricule=%s, date=%s, status=%s WHERE id=%s"
        values = (etudiant.nom, etudiant.prenom, etudiant.niveau, etudiant.matiere, etudiant.matricule, etudiant.date, etudiant.status, id_etudiant)
        cursor.execute(query, values)
        database.connection.commit()
        cursor.close()  # N'oubliez pas de fermer le curseur
        return {"message": "Étudiant mis à jour avec succès"}
    except Exception as e:
        logging.error(f"Erreur lors de la mise à jour de l'étudiant: {str(e)}")
        raise HTTPException(status_code=500, detail="Erreur lors de la mise à jour de l'étudiant")


#@app.get("/log")
# def read_log():
#     logging.debug("Ceci est un message de débogage.")
#     logging.info("Ceci est un message d'information.")
#     logging.warning("Ceci est un message d'avertissement.")
#     logging.error("Ceci est un message d'erreur.")
#     return {"message": "Journal des logs"}
