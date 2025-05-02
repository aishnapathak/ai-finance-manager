import psycopg2
from langchain.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document

# Database Configuration
DB_CONFIG = {
    "dbname": "testing",
    "user": "postgres",
    "password": "Sushilnancy@23",
    "host": "localhost",
    "port": "5432"
}

def fetch_data():
    """Fetch transaction history and financial goals from PostgreSQL."""
    conn = psycopg2.connect(**DB_CONFIG)
    cursor = conn.cursor()

    # Fetch transaction data
    cursor.execute("SELECT transaction_id, user_id, category, amount, description FROM transactions;")
    transactions = cursor.fetchall()

    # Fetch financial goals data
    cursor.execute("SELECT goal_id, user_id, goal_name, target_amount, current_savings, target_date FROM financial_goals;")
    financial_goals = cursor.fetchall()

    conn.close()
    
    return transactions, financial_goals

def create_faiss_index():
    """Fetch data from DB and create a FAISS vector store."""
    
    transactions, financial_goals = fetch_data()
    docs = []

    # Convert transactions into documents
    for txn in transactions:
        txn_text = f"Transaction ID: {txn[0]}, User ID: {txn[1]}, Category: {txn[2]}, Amount: {txn[3]}, Description: {txn[4]}"
        docs.append(Document(page_content=txn_text))

    # Convert financial goals into documents
    for goal in financial_goals:
        goal_text = f"Goal ID: {goal[0]}, User ID: {goal[1]}, Goal: {goal[2]}, Target Amount: {goal[3]}, Current Savings: {goal[4]}, Target Date: {goal[5]}"
        docs.append(Document(page_content=goal_text))

    # Initialize Embedding Model
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

    # Create FAISS Index
    vector_store = FAISS.from_documents(docs, embedding_model)
    
    # Save Index Locally
    vector_store.save_local("faiss_index")
    print("FAISS index created successfully!")

# Run the FAISS index creation
create_faiss_index()
