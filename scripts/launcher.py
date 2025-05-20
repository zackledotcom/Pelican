import os
import subprocess
import sys
from threading import Thread

def start_backend():
    subprocess.run([sys.executable, "backend/server.py"])

def start_frontend():
    subprocess.run(["npm", "start"], cwd="frontend")

if __name__ == "__main__":
    Thread(target=start_backend).start()
    Thread(target=start_frontend).start()