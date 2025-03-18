import jwt
import bcrypt
import uvicorn
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, field_validator
from sqlalchemy import select

from models import User, Item
from db import session


SECRET_KEY = "secret-key"

app = FastAPI()


class UserRegister(BaseModel):
    username: str
    password: str

    @field_validator("password")
    @classmethod
    def password_length(cls, v):
        if len(v) < 8:
            raise ValueError("password cannot be less than 8 characters")
        return v


class UserLogin(BaseModel):
    username: str
    password: str


class TokenRequest(BaseModel):
    token: str


class ItemRequest(BaseModel):
    name: str
    description: str


def generate_jwt(user_id):
    return {"token": jwt.encode({"id": user_id}, SECRET_KEY, algorithm="HS256")}


@app.post("/register")
def register(user_data: UserRegister):
    username = user_data.username.strip().lower()
    password = user_data.password

    query = select(User).where(User.username == username)
    existing_user = session.execute(query).scalar_one_or_none()

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="username already exists"
        )

    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    user = User(username=username, password=hashed_password)

    session.add(user)
    session.commit()

    return generate_jwt(user.id)


@app.post("/login")
def login(user_data: UserLogin):
    username = user_data.username.strip().lower()
    password = user_data.password

    query = select(User).where(User.username == username)
    user = session.execute(query).scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="username or password incorrect",
        )

    if not bcrypt.checkpw(password.encode(), user.password.encode()):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="username or password incorrect",
        )

    return generate_jwt(user.id)


@app.post("/token")
def token(token_data: TokenRequest):
    try:
        user_data = jwt.decode(token_data.token, SECRET_KEY, algorithms=["HS256"])
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid JWT Token"
        )

    query = select(User).where(User.id == user_data["id"])
    user = session.execute(query).scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return {"id": user.id, "username": user.username}


@app.post("/items")
def create_item(item_data: ItemRequest):

    item = Item(name=item_data.name, description=item_data.description)
    session.add(item)
    session.commit()

    return {"detail": "successfully created item"}


@app.get("/items")
def items():
    query = select(Item)
    items = session.execute(query).all()
    return [item[0] for item in items]


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
