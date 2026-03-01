import os
from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
from dotenv import load_dotenv

# Load API keys
load_dotenv()

app = Flask(__name__)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# THE WRITER PERSONA
SYSTEM_PROMPT = """
You are a skilled creative writing partner and editor. Your goal is to help the user write a story.
- Help with brainstorming, outlining, character development, and scene writing.
- Maintain the tone and style the user prefers.
- If the user asks you to write a scene, write vividly and show, don't tell.
- If the user asks for feedback, be constructive but encouraging.
"""

# Initialize the model with the system instruction
# 'gemini-1.5-flash' is fast and good for chat; use 'gemini-1.5-pro' for complex reasoning
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=SYSTEM_PROMPT
)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    # Get previous history from frontend (list of {role: ..., content: ...})
    raw_history = data.get('history', [])

    try:
        # 1. Convert Frontend History (OpenAI style) to Gemini History
        gemini_history = []
        for turn in raw_history:
            role = "user" if turn['role'] == "user" else "model"
            gemini_history.append({
                "role": role,
                "parts": [turn['content']]
            })

        # 2. Start a chat session with the previous context
        chat_session = model.start_chat(history=gemini_history)

        # 3. Send the new message
        response = chat_session.send_message(user_message)
        bot_reply = response.text

        # 4. Update the history lists to send back to frontend
        # (We keep the frontend format consistent so index.html doesn't break)
        updated_history = raw_history + [
            {"role": "user", "content": user_message},
            {"role": "assistant", "content": bot_reply}
        ]

        return jsonify({
            "reply": bot_reply,
            "history": updated_history
        })

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)