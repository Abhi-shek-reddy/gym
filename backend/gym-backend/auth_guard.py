# This file is the SECURITY CHECKPOINT 🛂
# Every private API must pass through here

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt
from security import SECRET_KEY, ALGORITHM

security = HTTPBearer()

def verify_token(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    """
    This function:
    1. Reads token from request header
    2. Checks if token is valid
    3. Allows or blocks user
    """

    token = credentials.credentials

    try:
        # Decode ID card 🎫
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        return payload

    except:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token ❌"
        )
