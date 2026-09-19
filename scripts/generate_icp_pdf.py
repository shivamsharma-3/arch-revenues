"""
Generate the ARCH Revenues Full ICP Teardown Worksheet PDF.
Outputs to: G:/arch-revenues/public/ICP-Teardown-Worksheet.pdf
"""

import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

# Palette
COLOR_PRIMARY = colors.HexColor("#0F172A")    # Deep Slate / Zinc-900
COLOR_TEAL = colors.HexColor("#0D9488")       # Brand Teal (Teal-600)
COLOR_TEAL_LIGHT = colors.HexColor("#F0FDFA") # Teal 50
COLOR_TEAL_BORDER = colors.HexColor("#99F6E4")# Teal 200
COLOR_BG_CARD = colors.HexColor("#F8FAFC")    # Slate 50
COLOR_BORDER = colors.HexColor("#E2E8F0")     # Slate 200
COLOR_BORDER_DARK = colors.HexColor("#CBD5E1")# Slate 300
COLOR_TEXT = colors.HexColor("#1E293B")       # Slate 800
COLOR_MUTED = colors.HexColor("#64748B")      # Slate 500
COLOR_ACCENT_BG = colors.HexColor("#F1F5F9")  # Slate 100

class NumberedCanvas(canvas.Canvas):
    """Canvas that computes total pages dynamically and adds branded headers & footers."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        
        # Header bar on every page
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.75)
        self.line(36, 756, 576, 756)
        
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(COLOR_TEAL)
        self.drawString(36, 762, "ARCH REVENUES")
        
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_MUTED)
        self.drawString(115, 762, "|   Outbound Systems & ICP Architecture for Founder-Led B2B Agencies")
        
        self.drawRightString(576, 762, "www.archrevenues.com")

        # Footer bar on every page
        self.line(36, 36, 576, 36)
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_MUTED)
        self.drawString(36, 26, "ARCH Revenues ICP Teardown Worksheet   |   Confidential & Proprietary   |   Founder: Shivam Sharma")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(576, 26, page_str)
        
        self.restoreState()


def create_pdf(output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    h1_style = ParagraphStyle(
        'CustomH1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=COLOR_PRIMARY,
        spaceAfter=3,
    )

    h2_style = ParagraphStyle(
        'CustomH2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=COLOR_PRIMARY,
        spaceBefore=8,
        spaceAfter=4,
    )

    sub_style = ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=COLOR_MUTED,
        spaceAfter=8,
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_TEXT,
    )

    badge_style = ParagraphStyle(
        'Badge',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=9,
        textColor=COLOR_TEAL,
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=COLOR_PRIMARY,
    )

    table_desc_style = ParagraphStyle(
        'TableDesc',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=9.5,
        textColor=COLOR_MUTED,
    )

    field_label_style = ParagraphStyle(
        'FieldLabel',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10,
        textColor=COLOR_PRIMARY,
    )

    field_hint_style = ParagraphStyle(
        'FieldHint',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7,
        leading=8.5,
        textColor=COLOR_MUTED,
    )

    story = []

    # =========================================================================
    # PAGE 1: EXECUTIVE 1-PAGE ICP BLUEPRINT
    # =========================================================================
    
    # Title & Badge block
    title_table_data = [
        [
            Paragraph("<b>THE ICP TEARDOWN WORKSHEET</b>", h1_style),
            Paragraph("<b>EXECUTIVE 1-PAGE BLUEPRINT</b>", badge_style)
        ],
        [
            Paragraph("The Outbound Targeting & Positioning Architecture for Founder-Led B2B Agencies", sub_style),
            Paragraph("Takes ~45 min | Complete & Hand off to SDR/Team", field_hint_style)
        ]
    ]
    t_title = Table(title_table_data, colWidths=[380, 160])
    t_title.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (1,0), (1,-1), 'RIGHT'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_title)
    story.append(Spacer(1, 4))

    # Section 0: Agency Profile Baseline
    sec0_data = [
        [
            Paragraph("<b>Agency Name:</b> ___________________________", body_style),
            Paragraph("<b>Core Service:</b> ___________________________", body_style),
        ],
        [
            Paragraph("<b>Average Retainer / ACV:</b> $_________________", body_style),
            Paragraph("<b>Target Qualified Calls / Mo:</b> _____________", body_style),
        ]
    ]
    t_sec0 = Table(sec0_data, colWidths=[270, 270])
    t_sec0.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_sec0)
    story.append(Spacer(1, 6))

    # The 1-Line Outbound Positioning Hook
    hook_box_content = [
        [Paragraph("<b>THE 1-LINE OUTBOUND HOOK ARCHITECTURE</b>", table_header_style)],
        [Paragraph(
            '<i>"We help <b>[Target ICP Vertical &amp; Scale]</b> who are experiencing <b>[Urgent Trigger Event]</b> solve '
            '<b>[Acute Pain Point]</b> through <b>[Core Delivery Mechanism]</b> so they can achieve '
            '<b>[Quantified Desirable Outcome]</b> without <b>[Common Frustration / Risk]</b>."</i>',
            body_style
        )],
        [Paragraph("<b>Draft your 1-line hook below:</b>", field_hint_style)],
        [Paragraph("____________________________________________________________________________________________________________________", field_hint_style)],
        [Paragraph("____________________________________________________________________________________________________________________", field_hint_style)],
    ]
    t_hook = Table(hook_box_content, colWidths=[540])
    t_hook.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_TEAL_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, COLOR_TEAL_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_hook)
    story.append(Spacer(1, 8))

    # The 8-Point Core Outbound Matrix Table
    story.append(Paragraph("<b>THE 8-POINT OUTBOUND TARGETING MATRIX</b>", h2_style))
    
    matrix_rows = [
        [
            Paragraph("<b>DIMENSION</b>", table_header_style),
            Paragraph("<b>CRITERIA &amp; STRATEGIC PROMPT</b>", table_header_style),
            Paragraph("<b>YOUR AGENCY'S DEFINED SPECIFICATION</b>", table_header_style),
        ],
        [
            Paragraph("<b>1. Target Niche &amp; Vertical</b>", field_label_style),
            Paragraph("Exact industry sub-segment, company size (e.g. 15-50 FTEs), and business model.", table_desc_style),
            Paragraph("Industry: _____________________________________<br/>Size: _________  Rev / ARR: ____________________", body_style),
        ],
        [
            Paragraph("<b>2. Primary Economic Buyer</b>", field_label_style),
            Paragraph("Cheque-signer title (CEO, CMO, VP Sales, Head of Growth) and primary KPI responsibility.", table_desc_style),
            Paragraph("Title: ________________________________________<br/>KPI Held Accountable For: ______________________", body_style),
        ],
        [
            Paragraph("<b>3. Urgent Trigger Event</b>", field_label_style),
            Paragraph('What external change means "open the inbox now"? (e.g. fresh funding, new VP hire, rebrand).', table_desc_style),
            Paragraph("Trigger: ______________________________________<br/>Where Spotted: _______________________________", body_style),
        ],
        [
            Paragraph("<b>4. Urgent $100K+ Pain</b>", field_label_style),
            Paragraph("What acute bottleneck is currently costing them cash, pipeline, or sleep today?", table_desc_style),
            Paragraph("Pain: ________________________________________<br/>Financial / Operational Cost: __________________", body_style),
        ],
        [
            Paragraph("<b>5. Hard Disqualification Rule</b>", field_label_style),
            Paragraph("Zero-tolerance red flag that immediately eliminates an account from cold outreach lists.", table_desc_style),
            Paragraph("Walk away if: _________________________________<br/>_____________________________________________", body_style),
        ],
        [
            Paragraph("<b>6. Pattern-Interrupt Offer</b>", field_label_style),
            Paragraph("What free asset, teardown, or diagnostic can you deliver on a 15-min call to start conversation?", table_desc_style),
            Paragraph("Low-Friction Hook: ___________________________<br/>Asset: [ ] Teardown  [ ] Audit  [ ] Benchmark Data", body_style),
        ],
        [
            Paragraph("<b>7. Primary Proof Metric</b>", field_label_style),
            Paragraph("Specific case study or benchmark number (e.g., +14 demos in 30 days for similar client).", table_desc_style),
            Paragraph("Proof: _______________________________________<br/>Timeframe: _________  Outcome: _______________", body_style),
        ],
        [
            Paragraph("<b>8. Risk-Reversal Hook</b>", field_label_style),
            Paragraph("Performance guarantee or low-risk entry threshold to eliminate perceived friction.", table_desc_style),
            Paragraph("Guarantee: ___________________________________<br/>e.g. 5+ qualified demos booked or 100% money back", body_style),
        ],
    ]
    t_matrix = Table(matrix_rows, colWidths=[125, 185, 230])
    t_matrix.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_ACCENT_BG),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_matrix)
    story.append(Spacer(1, 6))

    # Page 1 footer note
    p1_note = Table([[
        Paragraph(
            "<b>Need help dialing this in?</b> Submit your answers at <b>archrevenues.com/icp-worksheet</b> for a complimentary 5-minute video teardown from Shivam Sharma. See Pages 2-4 for the full 45-minute deep dive exercise.",
            field_hint_style
        )
    ]], colWidths=[540])
    p1_note.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(p1_note)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: DEEP DIVE -- FIRMOGRAPHICS & BUYER PERSONA
    # =========================================================================
    story.append(Paragraph("<b>PART I: FIRMOGRAPHICS &amp; ECONOMIC BUYER PERSONA</b>", h1_style))
    story.append(Paragraph("A tight box beats a wide net. Start with strict company criteria before targeting specific people.", sub_style))

    # Section 1: Firmographics
    story.append(Paragraph("<b>1. STRICT ACCOUNT FIRMOGRAPHICS (The 6 Filters)</b>", h2_style))

    firmo_table_data = [
        [
            Paragraph("<b>1.1 Industry Sub-Vertical *</b><br/><font color='#64748B'>Be painfully specific. 'B2B SaaS DevTools' beats 'Software'. 'Shopify Plus Fashion Brands' beats 'E-commerce'.</font>", body_style),
            Paragraph("Primary: ___________________________________________<br/>Adjacent/Sub-niche: _______________________________", body_style),
        ],
        [
            Paragraph("<b>1.2 Employee Headcount Band</b><br/><font color='#64748B'>Sweet spot range. Under 10 lacks budget; 250+ creates bureaucratic review loops.</font>", body_style),
            Paragraph("Ideal: ______ to ______ employees<br/>Hard Floor: ______ employees  Hard Ceiling: ______", body_style),
        ],
        [
            Paragraph("<b>1.3 Annual Revenue / ARR Benchmark</b><br/><font color='#64748B'>Estimated revenue stage where your retainer is &lt;2% of gross monthly sales.</font>", body_style),
            Paragraph("Minimum: $_____________ ARR<br/>Ideal: $_____________ to $_____________ ARR", body_style),
        ],
        [
            Paragraph("<b>1.4 Capitalization &amp; Funding Stage</b><br/><font color='#64748B'>How is the business financed? This defines cash urgency and executive risk tolerance.</font>", body_style),
            Paragraph("[ ] Bootstrapped &amp; Profitable  [ ] Pre-Seed / Seed<br/>[ ] Series A / Series B  [ ] Private Equity Owned", body_style),
        ],
        [
            Paragraph("<b>1.5 Geographic Boundaries</b><br/><font color='#64748B'>Target countries and timezones where you deliver best results without friction.</font>", body_style),
            Paragraph("[ ] US Only  [ ] US &amp; Canada  [ ] UK &amp; Western Europe<br/>[ ] Australia / NZ  [ ] English-Speaking Global", body_style),
        ],
        [
            Paragraph("<b>1.6 Installed Tech Stack / Signals</b><br/><font color='#64748B'>Software tools, CMS, or platforms they MUST use for your service to work seamlessly.</font>", body_style),
            Paragraph("Requires: __________________________________________<br/>Disqualifying Tech: ________________________________", body_style),
        ],
    ]
    t_firmo = Table(firmo_table_data, colWidths=[240, 300])
    t_firmo.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_firmo)
    story.append(Spacer(1, 10))

    # Section 2: Buyer Persona
    story.append(Paragraph("<b>2. ECONOMIC BUYER PERSONA &amp; DECISION DYNAMICS</b>", h2_style))

    buyer_table_data = [
        [
            Paragraph("<b>2.1 Primary Economic Buyer (Cheque-Signer)</b><br/><font color='#64748B'>Who has the authority to approve your invoice on their corporate card without board approval?</font>", body_style),
            Paragraph("Title: ____________________________________________<br/>Seniority: [ ] Founder/CEO  [ ] CMO  [ ] VP Growth  [ ] COO", body_style),
        ],
        [
            Paragraph("<b>2.2 Internal Champion / User</b><br/><font color='#64748B'>Who will actually collaborate with you daily and feels the operational pain worst?</font>", body_style),
            Paragraph("Title: ____________________________________________<br/>Reports to: _______________________________________", body_style),
        ],
        [
            Paragraph("<b>2.3 Primary Success KPI / Goal</b><br/><font color='#64748B'>What single metric gets this executive their bonus or gets them fired by the board?</font>", body_style),
            Paragraph("Core KPI: _________________________________________<br/>Target Metric: ____________________________________", body_style),
        ],
        [
            Paragraph("<b>2.4 Internal Stakes (Cost of Inaction)</b><br/><font color='#64748B'>What happens internally if this problem remains unaddressed for the next 6 months?</font>", body_style),
            Paragraph("Personal Risk: ____________________________________<br/>Company Impact: ___________________________________", body_style),
        ],
        [
            Paragraph("<b>2.5 Top 3 Past Objections / Agency Scars</b><br/><font color='#64748B'>Why did their last agency relationship fail? What skepticism will they bring into call #1?</font>", body_style),
            Paragraph("1. _______________________________________________<br/>2. _______________________________________________<br/>3. _______________________________________________", body_style),
        ],
    ]
    t_buyer = Table(buyer_table_data, colWidths=[240, 300])
    t_buyer.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_buyer)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: PAIN, TRIGGERS, BEHAVIORAL SIGNALS & DISQUALIFIERS
    # =========================================================================
    story.append(Paragraph("<b>PART II: PAIN TRIGGERS, BEHAVIORAL SIGNALS &amp; DISQUALIFIERS</b>", h1_style))
    story.append(Paragraph("Pain tells you why they buy. Triggers tell you WHEN. Disqualifiers save you hundreds of wasted hours.", sub_style))

    # Section 3: Acute Pains
    story.append(Paragraph("<b>3. ACUTE PAIN POINTS &amp; URGENCY (Rank in Order of Severity)</b>", h2_style))
    pain_data = [
        [
            Paragraph("<b>Rank 1 (Existential Bottleneck) *</b><br/><font color='#64748B'>The acute problem costing them the most revenue or sleep.</font>", field_label_style),
            Paragraph("Description: __________________________________________________________________<br/>Estimated Cost to Business / Quarter: $________________________________________", body_style),
        ],
        [
            Paragraph("<b>Rank 2 (Operational Friction)</b><br/><font color='#64748B'>What delivery or internal breakdown frustrates the team?</font>", field_label_style),
            Paragraph("Description: __________________________________________________________________<br/>Estimated Cost to Business / Quarter: $________________________________________", body_style),
        ],
        [
            Paragraph("<b>Rank 3 (Missed Opportunity)</b><br/><font color='#64748B'>What growth channel or initiative is sitting idle?</font>", field_label_style),
            Paragraph("Description: __________________________________________________________________<br/>Estimated Cost to Business / Quarter: $________________________________________", body_style),
        ],
    ]
    t_pain = Table(pain_data, colWidths=[200, 340])
    t_pain.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_pain)
    story.append(Spacer(1, 8))

    # Section 4: Trigger Events
    story.append(Paragraph("<b>4. BUYING TRIGGER EVENTS (Check All That Signal Outbound Timing)</b>", h2_style))
    trigger_boxes = [
        [
            Paragraph("[ ] Fresh funding round closed (Seed / Series A in last 90 days)", body_style),
            Paragraph("[ ] Organic SEO ranking / primary Google position lost", body_style),
        ],
        [
            Paragraph("[ ] New CEO, CMO, or VP Growth hired (first 90-day mandate)", body_style),
            Paragraph("[ ] Active job postings for internal SDRs or Growth Marketers", body_style),
        ],
        [
            Paragraph("[ ] Brand relaunch, website migration, or new domain live", body_style),
            Paragraph("[ ] Competitor launched major campaign or raised rival capital", body_style),
        ],
        [
            Paragraph("[ ] New product tier or enterprise offering launched", body_style),
            Paragraph("[ ] Acquisition or merger announcement", body_style),
        ],
        [
            Paragraph("<b>Where do you spot these triggers first?</b><br/>[ ] LinkedIn Sales Nav  [ ] Crunchbase  [ ] Job Boards", field_label_style),
            Paragraph("[ ] BuiltWith / Wappalyzer  [ ] Slack Communities  [ ] Google Alerts<br/>Custom Source: ___________________________________________", body_style),
        ]
    ]
    t_trig = Table(trigger_boxes, colWidths=[270, 270])
    t_trig.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_TEAL_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_TEAL_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_trig)
    story.append(Spacer(1, 8))

    # Section 5: Behavioral Signals
    story.append(Paragraph("<b>5. BEHAVIORAL SIGNALS &amp; WATERING HOLES</b>", h2_style))
    behave_data = [
        [
            Paragraph("<b>Industry Podcasts Listened To:</b>", field_label_style),
            Paragraph("1. ______________________  2. ______________________  3. ______________________", body_style),
        ],
        [
            Paragraph("<b>Newsletters Actually Opened:</b>", field_label_style),
            Paragraph("1. ______________________  2. ______________________  3. ______________________", body_style),
        ],
        [
            Paragraph("<b>Slack / Discord Communities:</b>", field_label_style),
            Paragraph("e.g. Pavilion, RevGenius, Superpath, MicroConf, Founder groups: __________________", body_style),
        ],
        [
            Paragraph("<b>LinkedIn Voices Followed:</b>", field_label_style),
            Paragraph("Key influencers whose posts they comment on: __________________________________", body_style),
        ],
    ]
    t_behave = Table(behave_data, colWidths=[180, 360])
    t_behave.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_behave)
    story.append(Spacer(1, 8))

    # Section 6: Hard Disqualifiers
    story.append(Paragraph("<b>6. HARD DISQUALIFIERS (Zero-Tolerance Rules -- Walk Away If True)</b>", h2_style))
    disq_data = [
        [
            Paragraph("[ ] Headcount &lt; 10 FTEs (insufficient budget for retainers)", body_style),
            Paragraph("[ ] Pre-revenue or still searching for product-market fit", body_style),
        ],
        [
            Paragraph("[ ] Full in-house team of 3+ that views agencies as rivals", body_style),
            Paragraph("[ ] Average contract value &lt; $2,000 (cannot achieve positive ROI)", body_style),
        ],
        [
            Paragraph("[ ] Non-English speaking market or strict sovereign barriers", body_style),
            Paragraph("[ ] Expects guaranteed closing without handling demo follow-ups", body_style),
        ],
        [
            Paragraph("<b>Custom Disqualification Red Flag #1:</b> ________________________________________________", field_label_style),
            Paragraph("<b>Custom Disqualification Red Flag #2:</b> ________________________________________________", field_label_style),
        ]
    ]
    t_disq = Table(disq_data, colWidths=[270, 270])
    t_disq.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_disq)

    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: TOP 5 DREAM ACCOUNTS & OUTBOUND EXECUTION ROADMAP
    # =========================================================================
    story.append(Paragraph("<b>PART III: THE TOP 5 DREAM ACCOUNTS &amp; OUTBOUND EXECUTION</b>", h1_style))
    story.append(Paragraph("If you cannot name 5 real companies matching this profile right now, your ICP is too abstract.", sub_style))

    # Section 7: Top 5 Accounts Table
    story.append(Paragraph("<b>7. TOP 5 DREAM TARGET ACCOUNTS</b>", h2_style))
    accounts_table_data = [
        [
            Paragraph("<b>#</b>", table_header_style),
            Paragraph("<b>COMPANY NAME &amp; DOMAIN</b>", table_header_style),
            Paragraph("<b>DECISION MAKER TITLE</b>", table_header_style),
            Paragraph("<b>WHY THEY FIT YOUR ICP &amp; CURRENT TRIGGER</b>", table_header_style),
        ],
        [
            Paragraph("<b>1</b>", field_label_style),
            Paragraph("Name: ______________________<br/>URL: _______________________", body_style),
            Paragraph("Title: ____________________<br/>Name: ____________________", body_style),
            Paragraph("Fit: ____________________________________________<br/>Trigger: ________________________________________", body_style),
        ],
        [
            Paragraph("<b>2</b>", field_label_style),
            Paragraph("Name: ______________________<br/>URL: _______________________", body_style),
            Paragraph("Title: ____________________<br/>Name: ____________________", body_style),
            Paragraph("Fit: ____________________________________________<br/>Trigger: ________________________________________", body_style),
        ],
        [
            Paragraph("<b>3</b>", field_label_style),
            Paragraph("Name: ______________________<br/>URL: _______________________", body_style),
            Paragraph("Title: ____________________<br/>Name: ____________________", body_style),
            Paragraph("Fit: ____________________________________________<br/>Trigger: ________________________________________", body_style),
        ],
        [
            Paragraph("<b>4</b>", field_label_style),
            Paragraph("Name: ______________________<br/>URL: _______________________", body_style),
            Paragraph("Title: ____________________<br/>Name: ____________________", body_style),
            Paragraph("Fit: ____________________________________________<br/>Trigger: ________________________________________", body_style),
        ],
        [
            Paragraph("<b>5</b>", field_label_style),
            Paragraph("Name: ______________________<br/>URL: _______________________", body_style),
            Paragraph("Title: ____________________<br/>Name: ____________________", body_style),
            Paragraph("Fit: ____________________________________________<br/>Trigger: ________________________________________", body_style),
        ],
    ]
    t_acc = Table(accounts_table_data, colWidths=[20, 160, 140, 220])
    t_acc.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_ACCENT_BG),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_acc)
    story.append(Spacer(1, 10))

    # Section 8: What Happens Next -- 3 Paths
    story.append(Paragraph("<b>8. WHAT HAPPENS NEXT: 3 OUTBOUND EXECUTION PATHS</b>", h2_style))

    paths_data = [
        [
            Paragraph("<b>PATH A: RUN IT IN-HOUSE</b>", field_label_style),
            Paragraph(
                "You now have a complete, battle-tested ICP specification. Hand this worksheet to your junior SDR or VA. "
                "Configure these exact filters in LinkedIn Sales Navigator. Expect <b>20-30 hours/week</b> of manual prospecting, "
                "email warmup, and list cleaning to generate 4-8 qualified meetings per month.",
                body_style
            ),
        ],
        [
            Paragraph("<b>PATH B: HAND IT TO ARCH REVENUES</b>", field_label_style),
            Paragraph(
                "Send us your completed worksheet. We build a verified 200-account list matching this ICP, configure dedicated secondary "
                "domains with SPF/DKIM/DMARC, write 5-touch pattern-interrupt sequences, handle inbox replies, and book "
                "<b>5-12 qualified sales calls directly onto your calendar</b>.<br/>"
                "<b>Performance Guarantee:</b> 5+ qualified demos booked or your retainer is 100% refunded.",
                body_style
            ),
        ],
        [
            Paragraph("<b>PATH C: GET A FREE 5-MIN LOOM TEARDOWN</b>", field_label_style),
            Paragraph(
                "Want Shivam's eyes on your positioning before you send cold outreach? Submit your answers online at "
                "<b>archrevenues.com/icp-worksheet</b> or email your completed worksheet to <b>shivam@archrevenues.com</b>. "
                "You'll get a 5-minute video teardown back within 48 hours. Zero pitch, 100% candid tactical review.",
                body_style
            ),
        ]
    ]
    t_paths = Table(paths_data, colWidths=[160, 380])
    t_paths.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_CARD),
        ('BOX', (0,0), (-1,-1), 0.75, COLOR_BORDER_DARK),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_paths)
    story.append(Spacer(1, 10))

    # Founder Signature Block
    sign_box = [
        [
            Paragraph(
                '<i>"The agency that wins their category is not the one with the flashiest portfolio. '
                'It is the one with the tightest ICP and the most disciplined outbound engine."</i>',
                body_style
            )
        ],
        [
            Paragraph(
                "<b>Shivam Sharma</b>  |  Founder, ARCH Revenues  |  <b>shivam@archrevenues.com</b>  |  <b>www.archrevenues.com</b>",
                table_header_style
            )
        ]
    ]
    t_sign = Table(sign_box, colWidths=[540])
    t_sign.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_TEAL_LIGHT),
        ('BOX', (0,0), (-1,-1), 1, COLOR_TEAL_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_sign)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated ICP PDF at: {output_path}")

if __name__ == "__main__":
    out = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "ICP-Teardown-Worksheet.pdf")
    create_pdf(out)
