import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    load_dotenv()
    app = Flask(__name__)

    # Configuración segura para producción
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'change_this')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///db.sqlite3')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    CORS(app, origins=os.environ.get('CORS_ORIGINS', '*'), supports_credentials=True)

    # Importar e registrar Blueprints
    from .api import api_bp
    app.register_blueprint(api_bp, url_prefix='/api')

    return app