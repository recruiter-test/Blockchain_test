# Blockchain Assessment — Instructions for Applicants

Thank you for your interest. Please complete the tasks below and submit **one video** (screen + voice) showing your work and answering the listed questions.

---

## What to do

### Part 1 — Run and explain (required)
1. Clone/fork the repo and get the app running locally (blockchain + Node API + React). See the README in `blockchain-node-api` for options (e.g. Truffle develop — no Ganache needed).
2. You will explain in your video what happens when the contact list is loaded (Part 2 below).

### Part 2 — Feature (required)
3. Add the ability to **create a new contact** from the React UI: a form (name, phone) that calls a new API endpoint, and the API calls the smart contract’s `createContact(name, phone)`. The contract already has this function.

### Part 3 — Your choice (pick one)
4. Either:
   - Add one small improvement (e.g. error handling, empty state, or loading state), or  
   - Add one or two tests (contract or API) and in the video briefly say what you’re testing.

---

## Video submission

Record **one video** (screen + voice, **max 15–20 minutes**) that includes:

### 1. Show the app running
- Briefly show: local blockchain running, API running, React app with the contact list.
- If you did Part 2, show creating a new contact in the UI.

### 2. Answer these 5 questions out loud

Please answer each question clearly in the video (short answers are fine):

- **Q1.** When the user opens the app and sees the contact list, what happens step by step? (From the browser to the blockchain and back.)
- **Q2.** Why is there a Node.js API between the React app and the blockchain? Why not call the blockchain directly from the browser?
- **Q3.** For “create contact”: did you use a read-only call or a transaction that changes state? What’s the difference?
- **Q4.** What was the trickiest part of this project for you, and how did you solve it (or what would you do with more time)?
- **Q5.**  
  - If you added tests: What are you testing and why?  
  - If you didn’t add tests: In one sentence, what would you test first and why?

### 3. Optional
- In 2–3 minutes, walk through the main code changes you made (e.g. new API route, contract call, React form).

---

## Deliverables

- **Code:** Link to your fork or PR (so we can check it).
- **Video:** Link to your video (e.g. Loom, Google Drive, unlisted YouTube). Please keep it under the time limit and in [specify language if needed].

We will review your code and video. Good luck.
