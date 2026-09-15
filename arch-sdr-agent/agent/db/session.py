"""
Database session factory. Call get_session() as a context manager:

    with get_session() as db:
        db.add(prospect)
        db.commit()
"""
from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from agent.config import settings

_engine = None
_SessionLocal = None


def _init_engine():
    global _engine, _SessionLocal
    settings.require("database_url")
    if _engine is None:
        _engine = create_engine(settings.database_url, pool_pre_ping=True)
        _SessionLocal = sessionmaker(bind=_engine, autoflush=False, autocommit=False)


@contextmanager
def get_session():
    _init_engine()
    session = _SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
