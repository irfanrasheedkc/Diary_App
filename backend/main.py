from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up the MongoDB client and connect to the database
client = pymongo.MongoClient("mongodb+srv://irfanrasheedkc:gTo5RnpsY7mpL2BZ@cluster0.mznznpy.mongodb.net/?retryWrites=true&w=majority")
db = client['Diary']
collection = db['Data']

@app.route('/store', methods=['POST'])
def get_items():
    print("here")
    data = request.json  # Assuming the incoming data is in JSON format
    print(data)
    
    # Store the data in MongoDB
    inserted_id = collection.insert_one(data).inserted_id
    print(f"Data stored in MongoDB with ID: {inserted_id}")

    return "Data received and processed", 200

@app.route('/entries', methods=['GET'])
def get_entries():
    try:
        # Fetch all entries from the MongoDB collection
        entries = list(collection.find({}))

        # Convert the MongoDB ObjectId to a string
        for entry in entries:
            entry['_id'] = str(entry['_id'])

        return jsonify(entries)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
