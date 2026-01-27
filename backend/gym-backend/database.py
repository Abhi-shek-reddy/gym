# This file is the MEMORY ROOM 🗄️
# It connects backend to database

# -------------------------------------------------
# This file is the MEMORY ROOM 🗄️
# It creates and manages database tables
# -------------------------------------------------

import sqlite3

# Connect to database file
conn = sqlite3.connect("gym.db", check_same_thread=False)

# Cursor = pen ✏️ to write/read data
cursor = conn.cursor()

def create_tables():
    """
    STORY:
    This function prepares shelves in our library 📚

    If shelf already exists:
    - do nothing
    If shelf does not exist:
    - create it
    """

    # -------------------------
    # USERS TABLE
    # -------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)

    # -------------------------
    # MEMBERS TABLE
    # -------------------------
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS members (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            phone TEXT,
            plan TEXT,
            join_date TEXT
        )
    """)

    # Save changes permanently
    conn.commit()

# Run table creation when backend starts
create_tables()


# database.py is librarian
# It creates shelves
# Stores books (data)