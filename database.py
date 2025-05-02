from sqlalchemy import create_engine, Column, Integer, String, DECIMAL, Text, TIMESTAMP, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
import urllib.parse

# Database Configurations
DB_USER = "postgres"
DB_PASSWORD = urllib.parse.quote("Sushilnancy@23")
DB_HOST = "localhost"  # Use "postgres" if running in Docker
DB_PORT = "5432"

# Separate databases
USER_DB_NAME = "user_db"
TRANSACTION_DB_NAME = "transaction"

# Database URLs
USER_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{USER_DB_NAME}"
TRANSACTION_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{TRANSACTION_DB_NAME}"

# Create database engines
user_engine = create_engine(USER_DATABASE_URL)
transaction_engine = create_engine(TRANSACTION_DATABASE_URL)

# Create separate session factories
UserSessionLocal = scoped_session(sessionmaker(bind=user_engine, autoflush=False, autocommit=False))
TransactionSessionLocal = scoped_session(sessionmaker(bind=transaction_engine, autoflush=False, autocommit=False))

# Base classes for each database
UserBase = declarative_base()
TransactionBase = declarative_base()

# ✅ Define User Model (In user_db)
class User(UserBase):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    phone_number = Column(String(15), unique=True, nullable=True)
    username = Column(String(50), unique=True, nullable=False)

# ✅ Define Transaction Model (In transaction_db)
class Transaction(TransactionBase):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    amount = Column(DECIMAL(10, 2), nullable=False)
    transaction_date = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")
    category = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    type = Column(String(50), nullable=False)  # Credit or Debit

# ✅ Create Tables in Respective Databases
UserBase.metadata.create_all(bind=user_engine)
TransactionBase.metadata.create_all(bind=transaction_engine)

# ✅ Fetch User Details from user_db
def fetch_user_by_email(email: str):
    session = UserSessionLocal()
    try:
        user = session.query(User).filter(User.email == email).first()
        return user
    finally:
        session.close()

# ✅ Fetch Transactions from transaction_db using user_id
def fetch_user_transactions(user_id: int):
    session = TransactionSessionLocal()
    try:
        transactions = session.query(Transaction).filter(Transaction.user_id == user_id).all()
        return transactions
    finally:
        session.close()

# from sqlalchemy import create_engine, Column, Integer, String, DECIMAL, Text, Date, TIMESTAMP, ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import os
# import urllib.parse

# # PostgreSQL Database URL
# DB_USER = "postgres"
# DB_PASSWORD = urllib.parse.quote("Sushilnancy@23")
# DB_HOST = "localhost"  # Change to "postgres" if using Docker
# DB_PORT = "5432"
# DB_NAME = "testing"

# DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# # SQLAlchemy setup
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
# Base = declarative_base()

# # Define Database Models
# class User(Base):
#     __tablename__ = "users"
#     user_id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), unique=True, nullable=False)
#     created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")

# class Transaction(Base):
#     __tablename__ = "transactions"
#     transaction_id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     amount = Column(DECIMAL(10, 2), nullable=False)
#     category = Column(String(50), nullable=False)
#     description = Column(Text)
#     transaction_date = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")

# class FinancialGoal(Base):
#     __tablename__ = "financial_goals"
#     goal_id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     goal_name = Column(String(255), nullable=False)
#     target_amount = Column(DECIMAL(10, 2), nullable=False)
#     current_savings = Column(DECIMAL(10, 2), default=0)
#     target_date = Column(Date, nullable=False)

# # Create Tables
# Base.metadata.create_all(bind=engine)

# # Function to Fetch User ID by Email
# def get_user_id_by_email(email: str):
#     session = SessionLocal()
#     try:
#         user = session.query(User).filter(User.email == email).first()
#         return user.user_id if user else None
#     finally:
#         session.close()

# # Function to Fetch Transactions for RAG (Using Email)
# def fetch_user_transactions(email: str):
#     session = SessionLocal()
#     try:
#         user_id = get_user_id_by_email(email)
#         if not user_id:
#             return []
#         return session.query(Transaction).filter(Transaction.user_id == user_id).all()
#     finally:
#         session.close()

# # Function to Fetch Financial Goals for RAG (Using Email)
# def fetch_financial_goals(email: str):
#     session = SessionLocal()
#     try:
#         user_id = get_user_id_by_email(email)
#         if not user_id:
#             return []
#         return session.query(FinancialGoal).filter(FinancialGoal.user_id == user_id).all()
#     finally:
#         session.close()

# from sqlalchemy import create_engine, Column, Integer, String, DECIMAL, Text, Date, TIMESTAMP, ForeignKey
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# import os

# # PostgreSQL Database URL
# DB_USER = "postgres"
# DB_PASSWORD = "Sushilnancy@23"
# DB_HOST = "localhost"  # or "postgres" if using Docker
# DB_PORT = "5432"
# DB_NAME = "testing"

# DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# # SQLAlchemy setup
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
# Base = declarative_base()

# # Define Database Models
# class User(Base):
#     __tablename__ = "users"
#     user_id = Column(Integer, primary_key=True, index=True)
#     name = Column(String(255), nullable=False)
#     email = Column(String(255), unique=True, nullable=False)
#     created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")

# class Transaction(Base):
#     __tablename__ = "transactions"
#     transaction_id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     amount = Column(DECIMAL(10, 2), nullable=False)
#     category = Column(String(50), nullable=False)
#     description = Column(Text)
#     transaction_date = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")

# class FinancialGoal(Base):
#     __tablename__ = "financial_goals"
#     goal_id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.user_id", ondelete="CASCADE"))
#     goal_name = Column(String(255), nullable=False)
#     target_amount = Column(DECIMAL(10, 2), nullable=False)
#     current_savings = Column(DECIMAL(10, 2), default=0)
#     target_date = Column(Date, nullable=False)

# # Create Tables
# Base.metadata.create_all(bind=engine)

# # Function to Fetch Transactions for RAG
# def fetch_user_transactions(user_id: int):
#     session = SessionLocal()
#     try:
#         transactions = session.query(Transaction).filter(Transaction.user_id == user_id).all()
#         return transactions
#     finally:
#         session.close()

# # Function to Fetch Financial Goals for RAG
# def fetch_financial_goals(user_id: int):
#     session = SessionLocal()
#     try:
#         goals = session.query(FinancialGoal).filter(FinancialGoal.user_id == user_id).all()
#         return goals
#     finally:
#         session.close()
