# This is the ENTRY GATE of backend 🚪
# FastAPI starts from here

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ---------------------------
# CORS SETTINGS
# ---------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # allow all methods (GET, POST, OPTIONS)
    allow_headers=["*"],  # allow all headers
)

# Fake users
FAKE_USERS = [
    {"email": "admin@gmail.com", "password": "1234", "name": "Admin"}
]

@app.post("/login")
def login(data: dict):

    email = data.get("email")
    password = data.get("password")

    for user in FAKE_USERS:
        if user["email"] == email and user["password"] == password:
            return {
                "status": "success",
                "user": {
                    "name": user["name"],
                    "email": user["email"]
                }
            }

    return {"status": "error", "message": "Invalid credentials"}
