import random
from flask import Flask, request, jsonify
import pymongo
from flask_cors import CORS
from predictor import emotion_pred
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up the MongoDB client and connect to the database
client = pymongo.MongoClient("mongodb+srv://irfanrasheedkc:gTo5RnpsY7mpL2BZ@cluster0.mznznpy.mongodb.net/?retryWrites=true&w=majority")
db = client['Diary']
collection = db['Data']

positive_responses = [
    "That's fantastic to hear!",
    "I'm thrilled for you!",
    "It's wonderful to see you so happy.",
    "Your happiness is contagious!",
    "What a great reason to celebrate!",
    "I can tell you're over the moon!",
    "Happiness suits you well.",
    "Your joy is truly infectious.",
    "I'm so glad to see you smiling.",
    "Keep that happiness shining!"
]

negative_responses = [
    "I'm sorry to hear that.",
    "That's unfortunate.",
    "I can imagine how tough that must be.",
    "It's a difficult situation.",
    "Stay strong, better days will come.",
    "I'm here for you if you need to talk.",
    "I wish I could make it better.",
    "I understand, life has its challenges.",
    "Things will improve, keep your head up.",
    "I'm sending positive thoughts your way."
]

neutral_responses = [
    "I see.",
    "That's interesting.",
    "Tell me more.",
    "I understand.",
    "That's a valid point.",
    "Thanks for sharing.",
    "It's good to know.",
    "I'm listening.",
    "I'll take note of that.",
    "Neutral ground is sometimes best."
]




def get_random_sentiment_response(sentiment_category):
    
    positive_response = random.choice(positive_responses)
    negative_response = random.choice(negative_responses)
    neutral_response = random.choice(neutral_responses)

    if sentiment_category == "POSITIVE":
        return positive_response
    elif sentiment_category == "NEGATIVE":
        return negative_response
    else:
        return neutral_response








def sentiment(entry):
    pred=emotion_pred(entry)
    print(pred)

    random_emotion = pred
    # Initialize lists for emotions and responses
    
    responses = ["Why are you so sad?","That's great to hear!", "I'm here for you.","A response related to the other emotion."]

    # Select a random emotion and its corresponding response
    
    
    random_response =  get_random_sentiment_response(pred)

    return random_emotion,random_response

@app.route('/', methods=['GET'])
def home():
    return "LIVE", 200

@app.route('/store', methods=['POST'])
def get_items():
    print("here")
    data = request.json  # Assuming the incoming data is in JSON format
    print(data)
    data['emotion'],data['response']=sentiment(data['entry'])
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
