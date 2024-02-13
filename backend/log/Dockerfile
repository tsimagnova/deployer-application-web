FROM python

WORKDIR /app

COPY ./app /app
COPY ./database.py /app

RUN pip install uvicorn fastapi mysql-connector-python

EXPOSE 8000

CMD [ "uvicorn", "app.app:app", "--host", "0.0.0.O", "--port", "8000" ]