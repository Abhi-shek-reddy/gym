# ==================================================
# dashboard.py 📊
# ==================================================
#
# STORY:
#
# This file powers the ADMIN DASHBOARD of the gym.
#
# The dashboard does NOT manage members directly.
# It only OBSERVES the gym and answers questions like:
#
# - How many total members are there?
# - How many are active?
# - How many are inactive?
# - Which plans are most used?
# - Whose membership is expiring soon?
# - Whose membership is already expired?
#
# All logic here is READ-ONLY and ADMIN-ONLY.
# ==================================================

from fastapi import APIRouter, Request, HTTPException
from datetime import datetime, timedelta

from auth_guard import verify_token
from database import cursor

router = APIRouter()


# --------------------------------------------------
# HELPER: Calculate expiry date based on plan
# --------------------------------------------------
def calculate_expiry(joined_on: str, plan: str) -> datetime:
    joined_date = datetime.fromisoformat(joined_on)

    if plan == "Monthly":
        return joined_date + timedelta(days=30)
    elif plan == "Quarterly":
        return joined_date + timedelta(days=90)
    else:  # Yearly
        return joined_date + timedelta(days=365)


# ==================================================
# DASHBOARD STATS 📊
# ==================================================
@router.get("/dashboard/stats")
def dashboard_stats(request: Request):
    """
    STORY:
    This endpoint gives HIGH-LEVEL NUMBERS to admin.
    No member details, only summary counts.
    """

    # -------------------------------
    # STEP 1: Verify admin token 🔐
    # -------------------------------
    auth = request.headers.get("Authorization")
    if not auth:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = auth.replace("Bearer ", "")
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")

    # -------------------------------
    # STEP 2: Fetch member data
    # -------------------------------
    cursor.execute("SELECT plan, joined_on FROM members")
    rows = cursor.fetchall()

    total_members = len(rows)
    active_members = 0
    inactive_members = 0

    plan_count = {
        "Monthly": 0,
        "Quarterly": 0,
        "Yearly": 0
    }

    today = datetime.now()

    # -------------------------------
    # STEP 3: Calculate stats
    # -------------------------------
    for plan, joined_on in rows:
        expiry_date = calculate_expiry(joined_on, plan)

        if expiry_date >= today:
            active_members += 1
        else:
            inactive_members += 1

        plan_count[plan] += 1

    # -------------------------------
    # STEP 4: Return summary
    # -------------------------------
    return {
        "total_members": total_members,
        "active_members": active_members,
        "inactive_members": inactive_members,
        "plans": plan_count
    }


# ==================================================
# DASHBOARD EXPIRY ⏰
# ==================================================
@router.get("/dashboard/expiry")
def dashboard_expiry(request: Request):
    """
    STORY:
    This endpoint tells admin:
    - Who is EXPIRING SOON (next 7 days)
    - Who is already EXPIRED
    """

    # -------------------------------
    # STEP 1: Verify admin token 🔐
    # -------------------------------
    auth = request.headers.get("Authorization")
    if not auth:
        raise HTTPException(status_code=401, detail="Unauthorized")

    token = auth.replace("Bearer ", "")
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Invalid token")

    # -------------------------------
    # STEP 2: Fetch members
    # -------------------------------
    cursor.execute(
        "SELECT id, name, plan, joined_on FROM members"
    )
    rows = cursor.fetchall()

    today = datetime.now()
    soon_limit = today + timedelta(days=7)

    expiring_soon = []
    expired = []

    # -------------------------------
    # STEP 3: Classify members
    # -------------------------------
    for member_id, name, plan, joined_on in rows:
        expiry_date = calculate_expiry(joined_on, plan)

        member_info = {
            "id": member_id,
            "name": name,
            "plan": plan,
            "expiry_date": expiry_date.date().isoformat()
        }

        if expiry_date < today:
            expired.append(member_info)
        elif today <= expiry_date <= soon_limit:
            expiring_soon.append(member_info)

    # -------------------------------
    # STEP 4: Return expiry info
    # -------------------------------
    return {
        "expiring_soon": expiring_soon,
        "expired": expired
    }
