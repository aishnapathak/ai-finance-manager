from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from mistralai import Mistral
import logging
from database import fetch_user_by_email, fetch_user_transactions

# Initialize FastAPI
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging setup
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Mistral AI Setup
API_KEY = "2hdfUl0wTFbstkDdMsQjASCsUI0VvHWd"
MODEL_NAME = "mistral-large-latest"
client = Mistral(api_key=API_KEY)

# Request Model
class FinancialChatRequest(BaseModel):
    email: str
    query: str

# Financial Chat API
@app.post("/financial-rag-chat")
def financial_chat_with_rag(request: FinancialChatRequest):
    """Handles user-specific financial queries using AI and transaction history."""
    
    # Verify it's our hardcoded user (additional security)
    if request.email != "sushil@gmail.com":
        raise HTTPException(status_code=403, detail="Unauthorized access")

    # 1. Fetch user details
    user = fetch_user_by_email(request.email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Fetch transactions
    transactions = fetch_user_transactions(user.id)
    
    # Prepare context
    context = "No transaction history available."
    if transactions:
        context = "\n".join([
            f"{t.transaction_date}: {t.type} - {t.category} - {t.amount} (Description: {t.description})"
            for t in transactions
        ])

    # 3. Generate AI response
    try:
        response = client.chat.complete(
            model=MODEL_NAME,
            messages=[
                {
                    "role": "system",
                    "content": "You are a financial assistant for Sushil. Use his transaction history to answer queries."
                },
                {
                    "role": "user", 
                    "content": f"Context: {context}\n\nQuestion: {request.query}"
                }
            ],
        )

        answer = response.choices[0].message.content
        logger.info(f"AI Response generated for {request.email}")
        
        return {
            "response": answer,
            "retrieved_context": context
        }

    except Exception as e:
        logger.error(f"AI Service Error: {str(e)}")
        raise HTTPException(status_code=500, detail="AI service unavailable")

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "healthy"}
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from mistralai import Mistral
# import logging
# from database import fetch_user_by_email, fetch_user_transactions

# # Initialize FastAPI
# app = FastAPI()

# # Logging setup
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Mistral AI Setup
# API_KEY = "2hdfUl0wTFbstkDdMsQjASCsUI0VvHWd"
# MODEL_NAME = "mistral-large-latest"
# client = Mistral(api_key=API_KEY)

# # ✅ Request Model
# class FinancialChatRequest(BaseModel):
#     email: str
#     query: str

# # --------------------------------------
# # ✅ Financial Chat API
# # --------------------------------------
# @app.post("/financial-rag-chat")
# def financial_chat_with_rag(request: FinancialChatRequest):
#     """Handles user-specific financial queries using AI and transaction history."""

#     # ✅ 1. Fetch user details from user_db
#     user = fetch_user_by_email(request.email)
#     if not user:
#         raise HTTPException(status_code=404, detail="User not found")

#     # ✅ 2. Fetch transactions from transaction_db using user_id
#     transactions = fetch_user_transactions(user.id)
    
#     if not transactions:
#         context = "No transaction history available."
#     else:
#         context = "\n".join([
#             f"{t.transaction_date}: {t.type} - {t.category} - {t.amount} (Description: {t.description})"
#             for t in transactions
#         ])

#     # ✅ 3. AI Response using Mistral
#     try:
#         response = client.chat.complete(
#             model=MODEL_NAME,
#             messages=[
#                 {"role": "system", "content": "You are a financial assistant. Use the transaction history to answer user queries."},
#                 {"role": "user", "content": f"Context: {context}\n\nQuestion: {request.query}"}
#             ],
#         )

#         answer = response.choices[0].message.content
#         logger.info(f"AI Response: {answer}")

#         return {"response": answer, "retrieved_context": context}

#     except Exception as e:
#         logger.error(f"AI Service Error: {str(e)}")
#         raise HTTPException(status_code=500, detail="AI Service Error")


# import os

# import logging

# from fastapi import FastAPI, HTTPException, Request

# from pydantic import BaseModel

# from mistralai import Mistral

# from langchain_community.vectorstores import FAISS

# from langchain_huggingface import HuggingFaceEmbeddings



# # Initialize FastAPI app

# app = FastAPI()



# # Setup logging

# logging.basicConfig(level=logging.INFO)

# logger = logging.getLogger(__name__)



# # Load API Key & Model Name

# API_KEY = "2hdfUl0wTFbstkDdMsQjASCsUI0VvHWd"

# MODEL_NAME = "mistral-large-latest"



# # Initialize Mistral Client

# client = Mistral(api_key=API_KEY)



# # Load FAISS Index

# embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

# vector_store = FAISS.load_local("faiss_index", embedding_model, allow_dangerous_deserialization=True)



# # Request Models

# class ChatRequest(BaseModel):

#     prompt: str



# class FinancialChatRequest(BaseModel):

#     query: str



# # --------------------------------------

# # ✅ Chat Endpoint (Basic)

# # --------------------------------------

# @app.post("/chat")

# async def chat(request: Request, chat_data: ChatRequest):

#     try:

#         data = await request.json()

#         print("Received Request:", data)



#         chat_response = client.chat.complete(

#             model=MODEL_NAME,

#             messages=[{"role": "user", "content": chat_data.prompt}],

#         )



#         return {"response": chat_response.choices[0].message.content}

#     except Exception as e:

#         return {"error": str(e)}



# # --------------------------------------

# # ✅ Health Check Endpoint

# # --------------------------------------

# @app.get("/health")

# async def health_check():

#     """Check if the AI service is running"""

#     return {"status": "AI Service is running"}



# # --------------------------------------

# # ✅ Financial Chat with RAG (FAISS + Mistral)

# # --------------------------------------

# @app.post("/financial-rag-chat")

# def financial_chat_with_rag(request: FinancialChatRequest):

#     """Handles user financial queries with relevant transaction history using RAG"""



#     if not request.query.strip():

#         raise HTTPException(status_code=400, detail="Query cannot be empty")



#     logger.info(f"Received financial query: {request.query}")



#     try:

#         # Retrieve relevant transaction history from FAISS

#         docs = vector_store.similarity_search(request.query, k=3)

#         context = "\n".join([doc.page_content for doc in docs]) if docs else "No relevant context found."



#         # Ask Mistral AI using retrieved data

#         response = client.chat.complete(

#             model=MODEL_NAME,

#             messages=[

#                 {"role": "system", "content": "You are a financial assistant. Use the provided transaction history to answer user queries."},

#                 {"role": "user", "content": f"Context: {context}\n\nQuestion: {request.query}"}

#             ],

#         )



#         answer = response.choices[0].message.content

#         logger.info(f"AI Response: {answer}")



#         return {"response": answer, "retrieved_context": context}



#     except Exception as e:

#         logger.error(f"AI Service Error: {str(e)}")

#         raise HTTPException(status_code=500, detail="AI Service Error")



# # Run FastAPI Server

# if __name__ == "__main__":

#     import uvicorn

#     uvicorn.run(app, host="0.0.0.0", port=8001)
