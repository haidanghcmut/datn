from datetime import datetime, timezone
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from pydantic import ValidationError
from datetime import datetime, timedelta
from typing import Union, Any
import jwt

SECURITY_ALGORITHM = 'HS256'
SECRET_KEY = '123456'

reusable_oauth2 = HTTPBearer(
    scheme_name='Authorization'
)


def validate_token(http_authorization_credentials=Depends(reusable_oauth2)) -> str:
    """
    Decode JWT token to get username => return email
    """
    try:
        payload = jwt.decode(http_authorization_credentials.credentials, 
                             SECRET_KEY, 
                             algorithms=[SECURITY_ALGORITHM])
        current_time = datetime.now(timezone.utc)
        current_timestamp = int(current_time.timestamp())
        if payload.get('exp') < current_timestamp:
            raise HTTPException(status_code=403, detail="Token expired")
        return payload.get('email')
    except (jwt.PyJWTError, ValidationError):
        raise HTTPException(
            status_code=403,
            detail="Could not validate credentials",
        )

def generate_token(email: Union[str, Any]) -> str:
    expire = datetime.utcnow() + timedelta(
        seconds=60 * 60 * 24 * 3  # Expired after 3 days
    )
    to_encode = {
        "exp": expire, "email": email
    }
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, 
                             algorithm=SECURITY_ALGORITHM)
    return encoded_jwt