# This file is our SECURITY OFFICE 🔐
# It handles:
# - password hiding
# - token creation

from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

# Password hasher machine
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Secret key (keep this secret!)
SECRET_KEY = "gym_super_secret"
ALGORITHM = "HS256"

# -------------------------
# Hide password
# -------------------------
def hash_password(password: str):
    """
    This function:
    - Takes real password
    - Converts to random text
    - So no one can read it
    """
    return pwd_context.hash(password)

# -------------------------
# Check password
# -------------------------
def verify_password(real, hashed):
    """
    Compares:
    - User password
    - DB password
    """
    return pwd_context.verify(real, hashed)

# -------------------------
# Create token
# -------------------------
def create_token(data: dict):
    """
    This creates:
    - digital ID card 🎫
    """

    expire = datetime.utcnow() + timedelta(minutes=30)

    data.update({"exp": expire})

    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return token
