# --------------------------------------------------
# members.py 🏋️‍♂️
# --------------------------------------------------
#
# STORY:
# This file manages GYM MEMBERS.
#
# Only LOGGED-IN users (with valid token)
# are allowed to:
# - View members
# - Add members
#
# This file:
# ✅ Defines API routes related to members
# ❌ Does NOT start the server
# --------------------------------------------------

from fastapi import APIRouter, Request, HTTPException
from datetime import date

from database import cursor, conn
from auth_guard import verify_token

# --------------------------------------------------
# STEP 1️⃣: Create a router
# --------------------------------------------------
#
# STORY:
# router is like a SUB-ROUTER 🚏
# main.py will plug this router into the app
#
router = APIRouter()

# --------------------------------------------------
# STEP 2️⃣: GET all members (PROTECTED)
# --------------------------------------------------
@router.get("/members")
def get_members(request: Request):
    """
    STORY:
    - User asks: "Show me all gym members"
    - We first check their TOKEN
    - If token is valid → return members list
    - If not → deny access
    """

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = auth_header.replace("Bearer ", "")

    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")

    cursor.execute("SELECT * FROM members")
    members = cursor.fetchall()

    return members


# --------------------------------------------------
# STEP 3️⃣: ADD a new member (PROTECTED)
# --------------------------------------------------
@router.post("/members")
def add_member(data: dict, request: Request):
    """
    STORY:
    - Admin adds a new gym member
    - Token is checked
    - Member is saved in database
    """

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = auth_header.replace("Bearer ", "")

    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")

    cursor.execute(
        """
        INSERT INTO members (name, phone, plan, joined_on)
        VALUES (?, ?, ?, ?)
        """,
        (
            data["name"],
            data["phone"],
            data["plan"],
            date.today().isoformat()
        )
    )

    conn.commit()

    return {"message": "Member added successfully 💪"}
