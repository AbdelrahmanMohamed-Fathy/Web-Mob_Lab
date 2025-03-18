from db import Base, engine
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, autoincrement=True, primary_key=True, nullable=False)

    name = Column(String, unique=True, nullable=False)
    description = Column(String, nullable=True)


if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
