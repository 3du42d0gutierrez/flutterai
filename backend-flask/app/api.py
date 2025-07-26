from flask import Blueprint, request, jsonify
from .models import db, User, Project

api_bp = Blueprint('api', __name__)

@api_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'}), 200

@api_bp.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify({
        'projects': [
            {'id': p.id, 'name': p.name}
            for p in projects
        ]
    }), 200

# Aquí irán otros endpoints: crear proyecto, usuarios, generación IA, etc.