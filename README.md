## Frontend

```bash
cd TaskSmith
npm install
npm install @vitejs/plugin-react-swc
npm run dev
```

## Backend

```bash
cd TaskSmith/Backend
python -m venv venv
venv\Scripts\activate
pip install flask pymongo python-dotenv google-genai
python run.py
```

## AI Service

AI generation logic is in `backend/services/ai_service.py`.

## Testing

```bash
cd TaskSmith/Backend
python test.py
```

## Environment

```bash
cd TaskSmith/Backend
copy .env.example .env
```
