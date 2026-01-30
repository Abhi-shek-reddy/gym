# -------------------------------------------------
# auth_guard.py 🛡️
# This file protects private routes
# -------------------------------------------------

import base64
import json
import hmac
import hashlib

SECRET_KEY = "gym_super_secret_key"


def verify_token(token: str):
    """
    STORY:
    - User sends token in request header
    - We decode it
    - We verify the signature
    - If valid → allow access
    """

    try:
        # Decode base64 token
        decoded = base64.urlsafe_b64decode(token).decode("utf-8")
        token_data = json.loads(decoded)

        payload = token_data["payload"]
        signature = token_data["signature"]

        # Recreate signature
        payload_bytes = json.dumps(payload).encode("utf-8")
        expected_signature = hmac.new(
            SECRET_KEY.encode("utf-8"),
            payload_bytes,
            hashlib.sha256
        ).hexdigest()

        if signature != expected_signature:
            return None

        return payload  # token is valid

    except Exception:
        return None
