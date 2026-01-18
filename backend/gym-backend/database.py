# This file is the MEMORY ROOM 🗄️
# It connects backend to database

import sqlite3

# Create / connect database file
# If file not exist → it will be created
conn = sqlite3.connect("gym.db", check_same_thread=False)

# This is like a PEN ✏️
# Used to write / read data
cursor = conn.cursor()

def create_tables():
    """
    This function builds our database structure
    Like:
    - Creating shelves
    - Creating drawers
    """

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE,
            password TEXT
        )
    """)

    # Save changes
    conn.commit()

# Run table creation
create_tables()

# database.py is librarian
# It creates shelves
# Stores books (data)