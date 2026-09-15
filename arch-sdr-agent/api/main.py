from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import demo, prospects, replies, webhooks

app = FastAPI(title="ARCH SDR Agent API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten to your actual frontend domain before going live
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(demo.router, prefix="/demo", tags=["demo"])
app.include_router(prospects.router, prefix="/prospects", tags=["prospects"])
app.include_router(replies.router, prefix="/replies", tags=["replies"])
app.include_router(webhooks.router, prefix="/webhooks", tags=["webhooks"])


@app.get("/health")
def health():
    return {"status": "ok"}
