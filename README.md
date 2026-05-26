# ThunderAI — ThunderStudy Chat Assistant

AI-powered study assistant for CUET, Banking & Commerce students.
Built with Groq (Llama 3.3 70B) + Vercel serverless.

---

## Folder Structure
```
thunderai/
├── index.html       ← Frontend chat UI
├── vercel.json      ← Vercel config
└── api/
    └── chat.js      ← Serverless API (Groq proxy)
```

---

## Deploy Steps

### 1. Create GitHub Repo
- Go to github.com → New repo → name: `thunderai` → Public → Create

### 2. Upload Files
- Upload index.html and vercel.json directly
- For api/chat.js → click "Add file" → "Create new file" → type `api/chat.js` → paste code

### 3. Deploy on Vercel
- Go to vercel.com → Sign up with GitHub
- New Project → Import `thunderai` repo → Deploy

### 4. Add API Key (after revoking trial key)
- Vercel Dashboard → Project → Settings → Environment Variables
- Add: GROQ_API_KEY = your new key from console.groq.com
- Redeploy

### 5. Secure the code
In api/chat.js line 9, change to:
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

---

## Use API from Other Websites

POST to: https://YOUR-PROJECT.vercel.app/api/chat

```js
const res = await fetch('https://YOUR-PROJECT.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Your question here' }]
  })
});
const data = await res.json();
console.log(data.reply);
```

---

Made by Wondermayank — https://wondermayank.github.io
