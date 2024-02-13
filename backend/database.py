import mysql.connector

db_config = {
    "host": "mysql-service.default",
    "user": "root",
    "password": "root",
    "database": "GestionsdesEtudiant"
}

connection = mysql.connector.connect(**db_config)
cursor = connection.cursor()