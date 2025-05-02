import time
from langchain_community.vectorstores import FAISS
from mistralai import Mistral
from langchain_huggingface import HuggingFaceEmbeddings

# Load FAISS Index
embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store = FAISS.load_local("faiss_index", embedding_model, allow_dangerous_deserialization=True)

# Mistral AI setup
api_key = "2hdfUl0wTFbstkDdMsQjASCsUI0VvHWd"
model = "mistral-large-latest"
client = Mistral(api_key=api_key)

def query_ai(query):
    """Retrieve relevant documents and query Mistral AI"""
    docs = vector_store.similarity_search(query, k=3)
    context = "\n".join([doc.page_content for doc in docs]) if docs else "No relevant context found."

    # Ask Mistral AI using retrieved data
    response = client.chat.complete(
        model=model,
        messages=[
            {"role": "system", "content": "You are a financial assistant. Use the provided context to answer questions accurately."},
            {"role": "user", "content": f"Context: {context}\n\nQuestion: {query}"}
        ],
    )
    return response.choices[0].message.content

def print_line_by_line(text, delay=0.05):
    """Print response line by line for better readability."""
    for line in text.split('\n'):
        print(line)
        time.sleep(delay)

if __name__ == "__main__":
    print("Welcome to the Financial AI Assistant! Type 'exit' to quit.")
    
    while True:
        user_query = input("\nAsk your finance-related question: ")
        if user_query.lower() in ["exit", "quit"]:
            print("Exiting Financial AI Assistant. Have a great day!")
            break
        
        answer = query_ai(user_query)
        print("\nAI Response:")
        print_line_by_line(answer)
