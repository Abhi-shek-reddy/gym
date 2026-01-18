# This is the ENTRY GATE of backend 🚪
# FastAPI starts from here

# This is the BRAIN 🧠 of backend

# -------------------------------------------------
# This file is the BRAIN 🧠 of our backend
# Everything starts from here
#
# Responsibilities:
# - Receive requests from frontend
# - Talk to database
# - Check security (tokens)
# - Send responses back
# -------------------------------------------------

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

# Our own files
from database import cursor, conn
from security import hash_password, verify_password, create_token
from auth_guard import verify_token

# Create backend app
app = FastAPI()

# -------------------------------------------------
# SECURITY GATE (CORS)
# -------------------------------------------------
# This allows frontend (React) to talk to backend
# Without this, browser blocks the request 🚫

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # frontend address
    allow_credentials=True,
    allow_methods=["*"],  # allow GET, POST, PUT, DELETE...
    allow_headers=["*"],  # allow all headers
)

# -------------------------------------------------
# TEST API
# -------------------------------------------------
@app.get("/")
def home():
    """
    This is a health check 🏥

    When we open backend URL:
    http://127.0.0.1:8000/

    We should see:
    "Backend alive"
    """
    return {"message": "Backend alive 🚀"}


# -------------------------------------------------
# REGISTER API
# -------------------------------------------------
@app.post("/register")
def register(data: dict):
    """
    STORY:
    User comes to register office 🏢

    Gives:
    - name
    - email
    - password

    We:
    - hide password 🔐
    - save user in database
    """

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Step 1: Hide password
    hashed_password = hash_password(password)

    # Step 2: Save user
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (name, email, hashed_password)
    )

    conn.commit()

    return {"message": "User registered safely 🎉"}


# -------------------------------------------------
# LOGIN API
# -------------------------------------------------
@app.post("/login")
def login(data: dict):
    """
    STORY:
    User comes to login desk 🪪

    Gives:
    - email
    - password

    We:
    - find user in DB
    - check password
    - give TOKEN (ID card 🎫)
    """

    email = data.get("email")
    password = data.get("password")

    # Step 1: Find user
    cursor.execute(
        "SELECT name, email, password FROM users WHERE email=?",
        (email,)
    )

    user = cursor.fetchone()

    # Step 2: If user not found
    if not user:
        return {"status": "error", "message": "User not found ❌"}

    # Step 3: Check password
    if not verify_password(password, user[2]):
        return {"status": "error", "message": "Wrong password ❌"}

    # Step 4: Create TOKEN (digital ID 🎫)
    token = create_token({"email": user[1]})

    return {
        "status": "success",
        "user": {
            "name": user[0],
            "email": user[1]
        },
        "token": token
    }


# -------------------------------------------------
# PRIVATE API (PROTECTED)
# -------------------------------------------------
@app.get("/dashboard")
def dashboard(user=Depends(verify_token)):
    """
    STORY:
    This is a PRIVATE room 🔐

    Only users with:
    - valid TOKEN
    can enter

    Security guard checks ID 🎫
    """

    return {
        "message": "Welcome to protected dashboard 💪",
        "logged_in_user": user
    }

# Register:

# hide password

# save in DB

# Login:

# fetch user

# compare password

# create token

# Token = digital ID card 🎫