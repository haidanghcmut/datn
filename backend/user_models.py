from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    username: Optional[str]
    email: str
    password: str
