from flask import Flask, request, jsonify
from keybert import KeyBERT
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

app = Flask(__name__)

# Initialize your transformer model (you can change the model as needed)
model = SentenceTransformer('all-MiniLM-L6-v2')
kw_model = KeyBERT(model)


@app.route('/compute_similarity', methods=['POST'])
def compute_similarity():
    data = request.get_json()
    new_doc = data.get('new_doc', '')
    workspace_docs = data.get('workspace_docs', [])

    if not new_doc:
        return jsonify({'error': 'Invalid input: new_doc is required'}), 400

    # If no workspace docs are provided, return a default similarity score of 0.
    if not workspace_docs:
        return jsonify({'average_similarity': 0, 'individual_scores': []}), 200

    # Compute embeddings.
    new_embedding = model.encode([new_doc])[0]
    embeddings = model.encode(workspace_docs)

    # Compute cosine similarity for each workspace doc.
    scores = cosine_similarity([new_embedding], embeddings)[0]
    average_score = float(np.mean(scores))

    # If the average score is negative, return 0 instead.
    if average_score < 0:
        average_score = 0

    return jsonify({'average_similarity': average_score, 'individual_scores': scores.tolist()})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
