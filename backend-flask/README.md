# Backend Flask - AI Flutter No Code

## Instalación

```powershell
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
```

## Configuración inicial

- Modifica `.env` con tus variables reales para producción.
- Reemplaza `DATABASE_URL` si usas Postgres, MySQL, etc.

## Inicializa la base de datos

```powershell
# En consola interactiva Python:
python
>>> from run import app
>>> from app import db
>>> with app.app_context():
...     db.create_all()
...     exit()
```

## Ejecución

```powershell
$env:FLASK_APP="run.py"
flask run --host=0.0.0.0 --port=8000
```

## Producción

Recomendado usar Gunicorn/UWSGI detrás de un proxy reverso (Nginx), habilitar HTTPS y proteger archivos .env.