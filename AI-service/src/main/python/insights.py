import asyncio
import json
import sys

import torch
from fastapi import FastAPI, HTTPException
from transformers import AutoModelForCausalLM, AutoTokenizer

# Debugging Step: Print raw input to ensure it's being received
raw_input = sys.stdin.read()
print("Raw input:", raw_input)

# Ensure there are no leading/trailing spaces or newlines
raw_input = raw_input.strip()
print("Stripped input:", raw_input)

# Parse the JSON data
try:
    data = json.loads(raw_input)
    print("Parsed data:", data)
    prompt = data.get("prompt", "")
except json.JSONDecodeError as e:
    print("Error decoding JSON:", e)
    sys.exit(1)

app = FastAPI()

# Load the model and tokenizer
model_name = "meta-llama/Llama-2-7b"
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, device_map="auto")
tokenizer = AutoTokenizer.from_pretrained(model_name, use_fast=True)
tokenizer.use_default_system_prompt = False

print("Model loaded successfully!")

@app.post("/generate")
def generate_summary(prompt):
    """
    Generates a summary based on the given prompt.
    """
    try:
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, padding=True, max_length=512)
        outputs = model.generate(inputs["input_ids"], max_length=150, min_length=50, do_sample=True)
        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return summary
    except Exception as e:
        return f"Error during generation: {e}"

# Main execution
if __name__ == "__main__":
    try:
        # Read JSON input from stdin
        raw_input = sys.stdin.read()
        data = json.loads(raw_input.strip())

        # Generate summary
        prompt = data.get("prompt", "")
        if not prompt:
            raise ValueError("No prompt provided.")

        result = generate_summary(prompt)
        print(json.dumps({"insight": result}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))