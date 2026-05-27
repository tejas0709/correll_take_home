from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid

app = Flask(__name__)
CORS(app)

# In-memory storage
statuses = []
VALID_SEVERITIES = {'low', 'medium', 'high', 'warning', 'critical', 'info'}


@app.route('/api/statuses', methods=['GET'])
def get_statuses():
    """Fetch all statuses sorted by creation time (newest first)."""
    return jsonify(sorted(statuses, key=lambda s: s['createdAt'], reverse=True))


@app.route('/api/statuses', methods=['POST'])
def post_status():
    """Create a new status."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body is required'}), 400

        title = data.get('title', '').strip()
        message = data.get('message', '').strip()
        severity = data.get('severity', '').lower()

        # Validation
        if not title:
            return jsonify({'error': 'Title is required'}), 400
        if not message:
            return jsonify({'error': 'Message is required'}), 400
        if severity not in VALID_SEVERITIES:
            return jsonify({'error': f'Severity must be one of {VALID_SEVERITIES}'}), 400

        # Create status
        status = {
            'id': str(uuid.uuid4()),
            'title': title,
            'message': message,
            'severity': severity,
            'createdAt': int(datetime.now().timestamp() * 1000),
        }
        statuses.append(status)
        return jsonify(status), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)
