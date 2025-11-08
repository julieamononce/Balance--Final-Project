# 🌱 Balance — Team Git Workflow

This document outlines how Carlyce and Julie collaborate on the project safely without overwriting each other’s work.

---

## 🧭 Branch Overview

| Branch | Purpose |
|:--|:--|
| `main` | Final, stable version |
| `frontend-main` | Shared frontend branch |
| `frontend-carlyce` | Carlyce’s working branch |
| `frontend-julie` | Julie’s working branch |
| *(later)* `backend-main` | Shared backend branch |

---

## 🪄 Setup Instructions

### 1️⃣ Clone the repo (first time only)
```bash
git clone https://github.com/julieamononce/Balance--Final-Project.git
cd Balance--Final-Project

### 2️⃣ Fetch all branches
git fetch --all

### 3️⃣ Create and switch to your own working branch

git checkout -b frontend-carlyce
git push -u origin frontend-carlyce
---------------
git checkout -b frontend-julie
git push -u origin frontend-julie

###💻 Daily Workflow
###When starting work
git pull origin frontend-carlyce   # or frontend-julie
###while working
git add .
git commit -m "Describe what you changed"
git push
###merging work when ready to combine changes 
git checkout frontend-main
git pull
git merge frontend-carlyce
git merge frontend-julie
git push
