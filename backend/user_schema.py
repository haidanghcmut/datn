def invidiual_serial(user) -> dict:
    return {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "password": user["password"],
    } 
    
def list_serial(users) -> list:
    return [invidiual_serial(user) for user in users]