# --------------------------------------------------
# database.py 🗄️
# --------------------------------------------------
#
# STORY:
# This file is the STORAGE ROOM of our gym 🏋️‍♂️
#
# Anything we want to REMEMBER permanently
# (even if the server stops or restarts)
# is stored here.
#
# Examples:
# - Users (admins / staff)
# - Members (gym members)
#
# This file:
# ✅ Connects to the database
# ✅ Creates tables if they don't exist
# ❌ Does NOT contain API logic
# ❌ Does NOT contain authentication logic
# --------------------------------------------------

import sqlite3

# --------------------------------------------------
# STEP 1️⃣: Connect to the database
# --------------------------------------------------
#
# STORY:
# If "gym.db" does not exist → SQLite creates it
# If it exists → SQLite opens it
#
# check_same_thread=False allows FastAPI
# to use the same DB connection across requests
#
conn = sqlite3.connect("gym.db", check_same_thread=False)

# Cursor is like a PEN ✏️
# We use it to write/read data in the DB
cursor = conn.cursor()

# --------------------------------------------------
# STEP 2️⃣: USERS table (Admin / Login users)
# --------------------------------------------------
#
# STORY:
# This table stores people who can LOGIN
# (not gym members, but system users)
#
# Password is stored as HASH (never plain text)
#
cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
)
""")

# --------------------------------------------------
# STEP 3️⃣: MEMBERS table (Gym Members)
# --------------------------------------------------
#
# STORY:
# This is the GYM REGISTER BOOK 📒
#
# Each row = one gym member
#
# id        → unique member number
# name      → member name
# phone     → contact number
# plan      → Monthly / Quarterly / Yearly
# joined_on → date they joined the gym
#
cursor.execute("""
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    plan TEXT NOT NULL,
    joined_on TEXT NOT NULL
)
""")

# --------------------------------------------------
# STEP 4️⃣: Save changes
# --------------------------------------------------
#
# STORY:
# conn.commit() means:
# "Okay, database, save everything permanently 💾"
#
conn.commit()

# --------------------------------------------------
# FINAL STORY SUMMARY 📖
#
# database.py = Storage Room 🗄️
#
# Responsibilities:
# ✅ Connect to DB
# ✅ Create tables
# ✅ Keep data safe
#
# NOT responsible for:
# ❌ Login logic
# ❌ API routes
# ❌ Token verification
#
# Other files (main.py, members.py)
# will USE this database.
# --------------------------------------------------
