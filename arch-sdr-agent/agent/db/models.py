"""
SQLAlchemy models mirroring deploy/schema.sql. Kept intentionally
close to the SQL 1:1 so the two never drift silently — if you change
one, change the other.
"""
import uuid
from datetime import datetime

from sqlalchemy import (
    Column, String, Boolean, Integer, Text, ForeignKey, DateTime,
    ARRAY, Numeric,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Client(Base):
    __tablename__ = "clients"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    value_prop = Column(Text, nullable=False)
    voice_description = Column(Text)
    offer = Column(Text)
    icp_description = Column(Text)
    signature = Column(Text)
    sender_domains = Column(ARRAY(String), nullable=False, default=list)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    prospects = relationship("Prospect", back_populates="client")

    def to_brief(self) -> dict:
        """Shape expected by WriterAgent.write_sequence()."""
        return {
            "value_prop": self.value_prop,
            "voice_description": self.voice_description,
            "offer": self.offer,
            "icp_description": self.icp_description,
            "signature": self.signature,
        }


class Prospect(Base):
    __tablename__ = "prospects"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id", ondelete="CASCADE"), nullable=False)
    url = Column(String, nullable=False)
    email = Column(String)
    email_verified_status = Column(String)
    research_data = Column(JSONB)
    state = Column(String, nullable=False, default="new")
    icp_fit_score = Column(Integer)
    suppressed = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

    client = relationship("Client", back_populates="prospects")
    emails = relationship("Email", back_populates="prospect")
    replies = relationship("Reply", back_populates="prospect")


class Email(Base):
    __tablename__ = "emails"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prospect_id = Column(UUID(as_uuid=True), ForeignKey("prospects.id", ondelete="CASCADE"), nullable=False)
    sequence_step = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    subject = Column(String)
    from_domain = Column(String)
    status = Column(String, nullable=False, default="draft")
    got_positive_reply = Column(Boolean, nullable=False, default=False)
    sent_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    prospect = relationship("Prospect", back_populates="emails")


class Reply(Base):
    __tablename__ = "replies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prospect_id = Column(UUID(as_uuid=True), ForeignKey("prospects.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    confidence = Column(Integer)
    drafted_response = Column(Text)
    escalation_reason = Column(Text)
    needs_human = Column(Boolean, nullable=False, default=False)
    human_response_sent = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    prospect = relationship("Prospect", back_populates="replies")


class Meeting(Base):
    __tablename__ = "meetings"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    prospect_id = Column(UUID(as_uuid=True), ForeignKey("prospects.id", ondelete="CASCADE"), nullable=False)
    calendly_event_id = Column(String)
    scheduled_at = Column(DateTime(timezone=True))
    pre_meeting_brief = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class Report(Base):
    __tablename__ = "reports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    client_id = Column(UUID(as_uuid=True), ForeignKey("clients.id", ondelete="CASCADE"), nullable=False)
    week_ending = Column(DateTime(timezone=True), nullable=False)
    metrics = Column(JSONB, nullable=False)
    report_text = Column(Text, nullable=False)
    sent_to_client = Column(Boolean, nullable=False, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class AuditLog(Base):
    __tablename__ = "audit_log"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    agent_name = Column(String, nullable=False)
    prospect_id = Column(UUID(as_uuid=True), ForeignKey("prospects.id", ondelete="SET NULL"))
    model_used = Column(String)
    input_summary = Column(Text)
    output_summary = Column(Text)
    token_count = Column(Integer)
    cost_usd = Column(Numeric(10, 6))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class SuppressionEntry(Base):
    __tablename__ = "suppression_list"
    email = Column(String, primary_key=True)
    reason = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
