# =================================================
# 🧠 BACKEND BRAIN — main.py
# =================================================
#
# STORY:
# This file is the BRAIN of our Gym Management System.
#
# Responsibilities:
# 1. Start the FastAPI server
# 2. Allow frontend to talk (CORS)
# 3. Handle authentication (register, login)
# 4. Protect private APIs using JWT token
# 5. Manage gym members (CRUD)
#
# If frontend is the FACE 🙂
# then this file is the BRAIN 🧠
# =================================================


# -------------------------
# IMPORTS
# -------------------------

from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

# Our own modules (our team members 👥)
from database import cursor, conn
from security import hash_password, verify_password, create_token
from auth_guard import verify_token
from members import router as members_router


# -------------------------
# CREATE FASTAPI APP
# -------------------------

# This creates the backend application
# Think of it as "opening the office"
app = FastAPI()


# -------------------------
# 🌍 CORS SECURITY GATE
# -------------------------
#
# STORY:
# Browser is very strict.
# It will NOT allow frontend (React) to talk to backend
# unless backend says: "Yes, I trust you"
#
# This block tells browser:
# "Allow requests from my frontend"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React app address
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE...
    allow_headers=["*"],
)

app.include_router(members_router)
# -------------------------
# 🏥 HEALTH CHECK API
# -------------------------

@app.get("/")
def home():
    """
    STORY:
    This is a simple test endpoint.

    When you open:
    http://127.0.0.1:8000/

    Backend replies:
    "Yes, I am alive and running"
    """
    return {"message": "Backend is alive 🚀"}


# =================================================
# 🔐 AUTHENTICATION SECTION
# =================================================

# -------------------------
# 📝 REGISTER API
# -------------------------

@app.post("/register")
def register(data: dict):
    """
    STORY:
    A new user comes to the gym 🏋️

    They give:
    - name
    - email
    - password

    What we do:
    1. Hide (hash) the password 🔒
    2. Save user safely in database 🗄️
    """

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Step 1: Convert password into unreadable format
    hashed_password = hash_password(password)

    # Step 2: Save user in database
    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        (name, email, hashed_password)
    )
    conn.commit()

    return {"message": "User registered successfully 🎉"}


# -------------------------
# 🔑 LOGIN API
# -------------------------

@app.post("/login")
def login(data: dict):
    """
    STORY:
    User comes to login desk 🪪

    They give:
    - email
    - password

    What we do:
    1. Find user in database
    2. Verify password
    3. Generate JWT token (digital ID card 🎫)
    """

    email = data.get("email")
    password = data.get("password")

    # Step 1: Find user by email
    cursor.execute(
        "SELECT name, email, password FROM users WHERE email=?",
        (email,)
    )
    user = cursor.fetchone()

    # If user not found
    if not user:
        return {"status": "error", "message": "User not found ❌"}

    # Step 2: Verify password
    if not verify_password(password, user[2]):
        return {"status": "error", "message": "Wrong password ❌"}

    # Step 3: Create JWT token
    token = create_token({"email": user[1]})

    return {
        "status": "success",
        "user": {
            "name": user[0],
            "email": user[1]
        },
        "token": token
    }


# =================================================
# 🔒 PROTECTED ROUTES
# =================================================

# -------------------------
# 🏠 DASHBOARD (PRIVATE)
# -------------------------

@app.get("/dashboard")
def dashboard(user=Depends(verify_token)):
    """
    STORY:
    This is a PRIVATE room 🔐

    Only users with:
    - valid JWT token
    can enter.

    Security guard (verify_token) checks ID 🎫
    """

    return {
        "message": "Welcome to dashboard 💪",
        "logged_in_user": user
    }


# =================================================
# 🏋️ MEMBERS MANAGEMENT (CRUD)
# =================================================

# -------------------------
# ➕ ADD MEMBER
# -------------------------

@app.post("/members")
def add_member(data: dict, user=Depends(verify_token)):
    """
    STORY:
    Gym staff adds a new member 🏋️

    Steps:
    1. Take member details
    2. Save them in members table
    """

    name = data.get("name")
    phone = data.get("phone")
    plan = data.get("plan")

    join_date = datetime.now().strftime("%Y-%m-%d")

    cursor.execute(
        "INSERT INTO members (name, phone, plan, join_date) VALUES (?, ?, ?, ?)",
        (name, phone, plan, join_date)
    )
    conn.commit()

    return {"message": "Member added successfully ✅"}


# -------------------------
# 📄 GET ALL MEMBERS
# -------------------------

@app.get("/members")
def get_members(user=Depends(verify_token)):
    """
    STORY:
    Gym owner wants to see all members 👀

    We:
    - Read members table
    - Convert rows into JSON
    """

    cursor.execute("SELECT * FROM members")
    rows = cursor.fetchall()

    members = []

    for row in rows:
        members.append({
            "id": row[0],
            "name": row[1],
            "phone": row[2],
            "plan": row[3],
            "join_date": row[4]
        })

    return members


# -------------------------
# ✏️ UPDATE MEMBER
# -------------------------

@app.put("/members/{member_id}")
def update_member(member_id: int, data: dict, user=Depends(verify_token)):
    """
    STORY:
    Member wants to update details ✍️
    (phone number / plan change)
    """

    cursor.execute(
        "UPDATE members SET name=?, phone=?, plan=? WHERE id=?",
        (
            data.get("name"),
            data.get("phone"),
            data.get("plan"),
            member_id
        )
    )
    conn.commit()

    return {"message": "Member updated successfully ✨"}


# -------------------------
# 🗑 DELETE MEMBER
# -------------------------

@app.delete("/members/{member_id}")
def delete_member(member_id: int, user=Depends(verify_token)):
    """
    STORY:
    Member leaves the gym ❌

    We:
    - Find member by ID
    - Remove from database
    """

    cursor.execute(
        "DELETE FROM members WHERE id=?",
        (member_id,)
    )
    conn.commit()

    return {"message": "Member deleted successfully 🗑️"}
