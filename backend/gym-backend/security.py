# -------------------------------------------------
# security.py 🔐
# This file is the "security guard" of our app
# -------------------------------------------------

import hashlib
import hmac
import time
import base64
import json

# A secret key known only to the server
# (like a private stamp the server uses)
SECRET_KEY = "gym_super_secret_key"


def hash_password(password: str) -> str:
    """
    STORY:
    User gives us a plain password (1234).
    We NEVER store it directly.
    We convert it into a scrambled version (hash).
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(plain: str, hashed: str) -> bool:
    """
    STORY:
    - User tries to login
    - We hash the entered password again
    - Compare it with stored hash
    """
    return hmac.compare_digest(
        hash_password(plain),
        hashed
    )


def create_token(email: str) -> str:
    """
    STORY:
    This function creates a LOGIN TOKEN 🎟️

    Think of it like:
    - Gym issues a membership card
    - Card contains member info + timestamp
    - Card is signed by the gym (SECRET_KEY)
    """

    payload = {
        "email": email,
        "issued_at": int(time.time())
    }

    # Convert payload to JSON → bytes
    payload_bytes = json.dumps(payload).encode("utf-8")

    # Sign the payload using secret key
    signature = hmac.new(
        SECRET_KEY.encode("utf-8"),
        payload_bytes,
        hashlib.sha256
    ).hexdigest()

    # Combine payload + signature
    token_data = {
        "payload": payload,
        "signature": signature
    }

    # Encode as base64 so it looks like a token
    token = base64.urlsafe_b64encode(
        json.dumps(token_data).encode("utf-8")
    ).decode("utf-8")

    return token
