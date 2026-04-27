// Build the Multi-Agent Trading Intelligence deck.
// Run: node build_deck.js

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.3 x 7.5
pres.title  = "Multi-Agent Trading Intelligence";
pres.author = "CS494 Spring 2026";

// ---------- palette ----------
const NAVY    = "0B1F3A";
const NAVY2   = "13294B";
const TEAL    = "1C7293";
const GOLD    = "D4AF37";
const CREAM   = "F5F1E8";
const SLATE   = "2C3E50";
const MUTED   = "64748B";
const WHITE   = "FFFFFF";
const SOFT    = "EFE9DC";
const BULL    = "2E7D32";
const BEAR    = "C62828";

const HFONT = "Georgia";
const BFONT = "Calibri";

// helpers ----
function shadow() {
  return { type: "outer", color: "000000", blur: 8, offset: 2, angle: 90, opacity: 0.12 };
}

function slideHeader(slide, title, kicker) {
  slide.background = { color: CREAM };
  // gold left bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.18, h: 7.5, fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  // top kicker
  if (kicker) {
    slide.addText(kicker, {
      x: 0.6, y: 0.3, w: 12, h: 0.35, fontFace: BFONT, fontSize: 11,
      color: TEAL, bold: true, charSpacing: 4, margin: 0,
    });
  }
  slide.addText(title, {
    x: 0.6, y: 0.6, w: 12, h: 0.8, fontFace: HFONT, fontSize: 30,
    color: NAVY, bold: true, margin: 0,
  });
  // small footer
  slide.addText("Multi-Agent Trading Intelligence", {
    x: 0.6, y: 7.15, w: 8, h: 0.3, fontFace: BFONT, fontSize: 9, color: MUTED,
  });
}

function card(slide, x, y, w, h, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: opts.fill || WHITE },
    line: { color: opts.border || SOFT, width: 0.75 },
    shadow: shadow(),
  });
}

function arrowDown(slide, x, y) {
  slide.addShape(pres.shapes.LINE, {
    x: x, y: y, w: 0, h: 0.35, line: { color: NAVY, width: 1.5, endArrowType: "triangle" },
  });
}

function arrowRight(slide, x, y, w) {
  slide.addShape(pres.shapes.LINE, {
    x: x, y: y, w: w, h: 0, line: { color: NAVY, width: 1.5, endArrowType: "triangle" },
  });
}

// =========================================================================
// SLIDE 1 — TITLE
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };

  // gold accent diamond on left
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.6, w: 0.5, h: 0.5, rotate: 45,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 },
  });
  s.addShape(pres.shapes.LINE, {
    x: 1.5, y: 2.85, w: 6.5, h: 0, line: { color: GOLD, width: 1.5 },
  });

  s.addText("MULTI-AGENT", {
    x: 0.6, y: 3.1, w: 13, h: 0.7, fontFace: HFONT, fontSize: 50, bold: true,
    color: WHITE, margin: 0, charSpacing: 8,
  });
  s.addText("Trading Intelligence System", {
    x: 0.6, y: 3.85, w: 13, h: 0.7, fontFace: HFONT, fontSize: 36, italic: true,
    color: GOLD, margin: 0,
  });

  s.addText(
    "Decomposed market analysis across specialized agents — unified into a single explainable trading decision.",
    { x: 0.6, y: 4.85, w: 11, h: 0.6, fontFace: BFONT, fontSize: 16, color: "CADCFC", italic: true }
  );

  s.addText("CS494 — Agentic AI · Spring 2026", {
    x: 0.6, y: 6.4, w: 12, h: 0.4, fontFace: BFONT, fontSize: 12,
    color: "CADCFC", charSpacing: 3,
  });
}

// =========================================================================
// SLIDE 2 — Problem & motivation
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Why decompose? Why multiple agents?", "MOTIVATION");

  // left column: the problem
  card(s, 0.6, 1.7, 6.0, 5.0);
  s.addText("THE PROBLEM", {
    x: 0.85, y: 1.9, w: 5.6, h: 0.35, fontFace: BFONT, fontSize: 11, bold: true,
    color: BEAR, charSpacing: 3, margin: 0,
  });
  s.addText("A single LLM is a single point of failure", {
    x: 0.85, y: 2.25, w: 5.6, h: 0.55, fontFace: HFONT, fontSize: 22, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "One model = one perspective on a noisy market", options: { bullet: true, breakLine: true } },
    { text: "Hidden bias + over-confident hallucinated facts", options: { bullet: true, breakLine: true } },
    { text: "No internal disagreement → no calibration on conviction", options: { bullet: true, breakLine: true } },
    { text: "Hard to audit: 'why did it pick BUY?' has no answer", options: { bullet: true, breakLine: true } },
    { text: "No mechanism to learn from past wrong calls", options: { bullet: true } },
  ], { x: 0.95, y: 3.0, w: 5.4, h: 3.6, fontFace: BFONT, fontSize: 14, color: SLATE, paraSpaceAfter: 6 });

  // right column: the answer
  card(s, 6.9, 1.7, 6.0, 5.0);
  s.addText("OUR APPROACH", {
    x: 7.15, y: 1.9, w: 5.6, h: 0.35, fontFace: BFONT, fontSize: 11, bold: true,
    color: BULL, charSpacing: 3, margin: 0,
  });
  s.addText("Specialize, debate, arbitrate, then ship", {
    x: 7.15, y: 2.25, w: 5.6, h: 0.55, fontFace: HFONT, fontSize: 22, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "Three signal-specific analysts run in parallel", options: { bullet: true, breakLine: true } },
    { text: "Bull vs. Bear debate — configurable 2-5 rounds", options: { bullet: true, breakLine: true } },
    { text: "Risk specialists with non-overlapping evidence", options: { bullet: true, breakLine: true } },
    { text: "Devil's advocate critic with conditional re-debate", options: { bullet: true, breakLine: true } },
    { text: "Persistent SQLite memory + T+5 reflection loop", options: { bullet: true } },
  ], { x: 7.25, y: 3.0, w: 5.4, h: 3.6, fontFace: BFONT, fontSize: 14, color: SLATE, paraSpaceAfter: 6 });
}

// =========================================================================
// SLIDE 3 — Architecture overview (the big diagram)
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "End-to-end pipeline", "ARCHITECTURE");

  // helpers for boxes
  const boxFill = WHITE;
  function box(x, y, w, h, label, sub, color = NAVY) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h, fill: { color: boxFill }, line: { color: color, width: 1 }, shadow: shadow(),
    });
    s.addText(label, {
      x: x + 0.05, y: y + 0.08, w: w - 0.1, h: 0.35,
      fontFace: HFONT, fontSize: 13, bold: true, color: color, align: "center", margin: 0,
    });
    if (sub) {
      s.addText(sub, {
        x: x + 0.05, y: y + 0.4, w: w - 0.1, h: h - 0.45,
        fontFace: BFONT, fontSize: 9, color: MUTED, align: "center", margin: 0,
      });
    }
  }

  function lineV(x, y1, y2) {
    s.addShape(pres.shapes.LINE, {
      x, y: y1, w: 0, h: y2 - y1, line: { color: NAVY, width: 1.5, endArrowType: "triangle" },
    });
  }
  function lineH(x1, x2, y) {
    s.addShape(pres.shapes.LINE, {
      x: x1, y, w: x2 - x1, h: 0, line: { color: NAVY, width: 1.5 },
    });
  }

  // Memory
  box(5.65, 1.55, 2.0, 0.7, "Memory Agent", "SQLite · past T+5", TEAL);
  lineV(6.65, 2.25, 2.55);

  // Analysts row
  box(1.5,  2.55, 3.0, 0.85, "Technical Analyst", "yfinance · RSI / MACD / VWAP");
  box(5.15, 2.55, 3.0, 0.85, "Fundamental Analyst", "SEC EDGAR · 4y financials");
  box(8.8,  2.55, 3.0, 0.85, "News + Sentiment", "Alpha Vantage · recency-weighted");

  // memory branches to all 3
  lineH(3.0, 10.3, 2.5);
  lineV(3.0, 2.5, 2.55);
  lineV(6.65, 2.5, 2.55);
  lineV(10.3, 2.5, 2.55);

  // synthesis
  lineV(3.0, 3.4, 3.85);
  lineV(6.65, 3.4, 3.85);
  lineV(10.3, 3.4, 3.85);
  lineH(3.0, 10.3, 3.85);
  lineV(6.65, 3.85, 4.05);
  box(5.4, 4.05, 2.5, 0.55, "CoT Synthesis", "", NAVY);
  lineV(6.65, 4.6, 4.85);

  // debate
  box(4.6, 4.85, 4.1, 0.55, "Debate · Bull / Bear / Arbiter", "2-5 rounds (configurable)", NAVY);
  lineV(6.65, 5.4, 5.65);

  // trader
  box(5.4, 5.65, 2.5, 0.55, "Trader Agent", "", NAVY);
  lineV(6.65, 6.2, 6.45);

  // risk panel + critic + final (right side flow)
  box(0.6, 5.65, 3.6, 0.55, "Risk Panel · Tail / Macro / Liquidity", "", GOLD.toString());
  box(0.6, 6.3, 3.6, 0.55, "Risk Arbiter", "BUY / OVER / HOLD / UNDER / SELL", NAVY);

  box(9.1, 5.65, 3.6, 0.55, "Devil's Advocate Critic", "STRONG → re-debate loop", BEAR);
  box(9.1, 6.3, 3.6, 0.55, "Final Decision + Persist", "report.md · SQLite", NAVY);

  // arrows from trader to risk panel and from risk arbiter to critic to final
  s.addShape(pres.shapes.LINE, { x: 5.4, y: 5.92, w: -1.2, h: 0, line: { color: NAVY, width: 1.5, endArrowType: "triangle" }});
  s.addShape(pres.shapes.LINE, { x: 7.9, y: 5.92, w: 1.2, h: 0, line: { color: NAVY, width: 1.5, endArrowType: "triangle" }});

  // risk panel -> risk arbiter (down)
  lineV(2.4, 6.2, 6.3);
  // risk arbiter -> critic (across to right)
  s.addShape(pres.shapes.LINE, {
    x: 4.2, y: 6.575, w: 4.9, h: 0, line: { color: NAVY, width: 1.5, endArrowType: "triangle" },
  });
  // critic -> final (down)
  lineV(10.9, 6.2, 6.3);

  // legend
  s.addText("Quant inputs feed risk panel:  worst-day, VaR/CVaR, vol expansion, regime, drawdown, beta, $ volume",
    { x: 0.6, y: 6.95, w: 12, h: 0.2, fontFace: BFONT, fontSize: 9, color: MUTED, italic: true });
}

// =========================================================================
// SLIDE 4 — Memory layer
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Memory: persistent, structured, T+5 grounded", "LAYER · MEMORY");

  // left card: schema
  card(s, 0.6, 1.7, 6.0, 5.0);
  s.addText("SQLite schema (decisions table)", {
    x: 0.85, y: 1.85, w: 5.6, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "ticker, decision_date, evaluate_after",        options: { bullet: true, breakLine: true } },
    { text: "entry_price (snapshot at decision time)",       options: { bullet: true, breakLine: true } },
    { text: "final_decision · conviction · bias · confidence", options: { bullet: true, breakLine: true } },
    { text: "synthesis · bull · bear · arbiter · risk_notes",  options: { bullet: true, breakLine: true } },
    { text: "evaluated · outcome_price · outcome_return · postmortem", options: { bullet: true } },
  ], { x: 0.95, y: 2.4, w: 5.4, h: 3.0, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 6 });

  s.addText("Memory Agent (front of graph)", {
    x: 0.85, y: 5.4, w: 5.6, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: TEAL, margin: 0,
  });
  s.addText("Pulls last-5 decisions for the ticker; injects a single memory_context string consumed by all downstream nodes.",
    { x: 0.95, y: 5.85, w: 5.4, h: 0.7, fontFace: BFONT, fontSize: 12, color: SLATE });

  // right card: lifecycle
  card(s, 6.9, 1.7, 6.0, 5.0);
  s.addText("Decision lifecycle", {
    x: 7.15, y: 1.85, w: 5.6, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0,
  });

  const steps = [
    ["1.", "Day T",    "Pipeline runs · row written with entry_price, evaluate_after = T+5 trading days."],
    ["2.", "T+1 to T+4", "Row sits in 'pending' queue · queryable from CLI."],
    ["3.", "T+5+",     "Reflection sweep finds matured rows · pulls realized close from yfinance."],
    ["4.", "T+5+",     "LLM writes a 4-section post-mortem · outcome label = win / flat / loss."],
    ["5.", "Forever",  "Postmortem gets pulled into memory_context for the next decision on this ticker."],
  ];
  let y = 2.4;
  for (const [n, label, desc] of steps) {
    s.addText(n, { x: 7.15, y, w: 0.4, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: GOLD, margin: 0 });
    s.addText(label, { x: 7.55, y, w: 5.0, h: 0.3, fontFace: BFONT, fontSize: 12, bold: true, color: NAVY, margin: 0 });
    s.addText(desc,  { x: 7.55, y: y + 0.3, w: 5.1, h: 0.45, fontFace: BFONT, fontSize: 11, color: SLATE, margin: 0 });
    y += 0.85;
  }
}

// =========================================================================
// SLIDE 5 — Parallel analyst layer
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Parallel analyst layer", "LAYER · ANALYSIS");

  function analystCard(x, title, source, lines, accent) {
    const w = 4.0, h = 4.6, y = 1.85;
    card(s, x, y, w, h);
    // top accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h: 0.18, fill: { color: accent }, line: { color: accent, width: 0 },
    });
    s.addText(title, {
      x: x + 0.25, y: y + 0.35, w: w - 0.5, h: 0.5,
      fontFace: HFONT, fontSize: 20, bold: true, color: NAVY, margin: 0,
    });
    s.addText(source, {
      x: x + 0.25, y: y + 0.85, w: w - 0.5, h: 0.3,
      fontFace: BFONT, fontSize: 10, color: TEAL, bold: true, charSpacing: 2, margin: 0,
    });
    s.addText(
      lines.map((l, i) => ({ text: l, options: { bullet: true, breakLine: i < lines.length - 1 } })),
      { x: x + 0.35, y: y + 1.3, w: w - 0.6, h: h - 1.5,
        fontFace: BFONT, fontSize: 12, color: SLATE, paraSpaceAfter: 4 }
    );
  }

  analystCard(0.6, "Technical",
    "YFINANCE",
    ["RSI(14), MACD + signal + histogram", "Bollinger %B and band edges",
     "VWAP(20d) and price-vs-VWAP", "Volume z-score (20d)", "52-week high / low context"],
    TEAL);

  analystCard(4.85, "Fundamental",
    "SEC EDGAR",
    ["Net income (4y trend)", "Revenue (4y trend)", "Total assets / liabilities",
     "Shareholders equity", "EPS basic", "Annual 10-K filings only"],
    GOLD);

  analystCard(9.1, "News + Sentiment",
    "ALPHA VANTAGE",
    ["Up to 50 recent articles", "Recency weighting (24h / 72h / 120h)",
     "Avg + recency-weighted sentiment", "Spread-based confidence", "Top-impact articles surfaced"],
    BULL);

  // bottom note
  s.addText("All three execute in parallel via LangGraph fan-out; each receives the same memory_context.",
    { x: 0.6, y: 6.7, w: 12, h: 0.4, fontFace: BFONT, fontSize: 12, color: MUTED, italic: true, align: "center" });
}

// =========================================================================
// SLIDE 6 — CoT Synthesis
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "CoT Synthesis: align, conflict, bias", "LAYER · SYNTHESIS");

  card(s, 0.6, 1.7, 7.6, 5.0);
  s.addText("What it does", {
    x: 0.85, y: 1.85, w: 7.0, h: 0.4, fontFace: HFONT, fontSize: 20, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "Reads all three analyst reports and the memory context", options: { bullet: true, breakLine: true } },
    { text: "Identifies points of agreement and contradiction", options: { bullet: true, breakLine: true } },
    { text: "Discounts confidence when evidence is missing or stale", options: { bullet: true, breakLine: true } },
    { text: "Emits a provisional bias before the debate begins", options: { bullet: true, breakLine: true } },
    { text: "Refuses to invent facts not present in the inputs", options: { bullet: true } },
  ], { x: 0.95, y: 2.4, w: 7.2, h: 4.0, fontFace: BFONT, fontSize: 14, color: SLATE, paraSpaceAfter: 8 });

  // right: structured output sample
  card(s, 8.5, 1.7, 4.4, 5.0, { fill: NAVY2 });
  s.addText("Output structure", {
    x: 8.7, y: 1.85, w: 4.0, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: GOLD, margin: 0,
  });
  s.addText([
    { text: "## Technical View", options: { breakLine: true, bold: true, color: WHITE } },
    { text: "## Fundamental View", options: { breakLine: true, bold: true, color: WHITE } },
    { text: "## News + Sentiment View", options: { breakLine: true, bold: true, color: WHITE } },
    { text: "## Cross-Analyst Synthesis", options: { breakLine: true, bold: true, color: WHITE } },
    { text: "## Final Bias", options: { breakLine: true, bold: true, color: GOLD } },
    { text: "    bullish / bearish / neutral", options: { breakLine: true, color: "CADCFC" } },
    { text: "## Confidence", options: { breakLine: true, bold: true, color: GOLD } },
    { text: "    high / medium / low", options: { breakLine: true, color: "CADCFC" } },
    { text: "## Key Risks", options: { breakLine: true, bold: true, color: WHITE } },
    { text: "## Actionable Takeaway", options: { bold: true, color: WHITE } },
  ], { x: 8.7, y: 2.35, w: 4.0, h: 4.2, fontFace: "Consolas", fontSize: 12, color: WHITE, paraSpaceAfter: 4 });
}

// =========================================================================
// SLIDE 7 — Debate layer
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Debate: Bull vs. Bear — and the Arbiter", "LAYER · DEBATE");

  // Bull card
  card(s, 0.6, 1.85, 5.7, 4.4);
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.85, w: 5.7, h: 0.18,
    fill: { color: BULL }, line: { color: BULL, width: 0 } });
  s.addText("BULL", { x: 0.85, y: 2.18, w: 5.2, h: 0.4,
    fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 3, color: BULL, margin: 0 });
  s.addText("Strongest evidence-based long thesis", {
    x: 0.85, y: 2.5, w: 5.2, h: 0.5, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0 });
  s.addText([
    { text: "Anchors every claim to a specific signal", options: { bullet: true, breakLine: true } },
    { text: "Rebuts the bear's strongest specific point", options: { bullet: true, breakLine: true } },
    { text: "Cannot invent facts; speculation must be labeled", options: { bullet: true, breakLine: true } },
    { text: "Sees critic challenge during a re-debate round", options: { bullet: true } },
  ], { x: 0.95, y: 3.15, w: 5.1, h: 3.0, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 6 });

  // Bear card
  card(s, 7.0, 1.85, 5.7, 4.4);
  s.addShape(pres.shapes.RECTANGLE, { x: 7.0, y: 1.85, w: 5.7, h: 0.18,
    fill: { color: BEAR }, line: { color: BEAR, width: 0 } });
  s.addText("BEAR", { x: 7.25, y: 2.18, w: 5.2, h: 0.4,
    fontFace: BFONT, fontSize: 11, bold: true, charSpacing: 3, color: BEAR, margin: 0 });
  s.addText("Strongest evidence-based short / avoid thesis", {
    x: 7.25, y: 2.5, w: 5.2, h: 0.5, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0 });
  s.addText([
    { text: "Same evidence rules as bull — symmetry by design", options: { bullet: true, breakLine: true } },
    { text: "Refuses strawman; addresses bull head-on", options: { bullet: true, breakLine: true } },
    { text: "Round counter ensures sharpening, not repetition", options: { bullet: true, breakLine: true } },
    { text: "Sharpens further if critic challenge appears", options: { bullet: true } },
  ], { x: 7.35, y: 3.15, w: 5.1, h: 3.0, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 6 });

  // arbiter strip
  card(s, 0.6, 6.4, 12.1, 0.75, { fill: NAVY2 });
  s.addText("NEUTRAL ARBITER", {
    x: 0.85, y: 6.5, w: 3.5, h: 0.3, fontFace: BFONT, fontSize: 11, bold: true,
    color: GOLD, charSpacing: 3, margin: 0,
  });
  s.addText("Scores each side on Evidence / Rigor / Addresses-Opponent (1-5) → bull · bear · tie  ·  strong · moderate · weak", {
    x: 0.85, y: 6.78, w: 11.7, h: 0.32, fontFace: BFONT, fontSize: 12, color: WHITE, margin: 0,
  });
}

// =========================================================================
// SLIDE 8 — Trader Agent
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Trader Agent: rating + conviction", "LAYER · TRADER");

  // 5-bucket rating cards
  const ratings = [
    ["BUY",         BULL,  "Aggressive long"],
    ["OVERWEIGHT",  "4CAF50", "Tilted long"],
    ["HOLD",        GOLD, "Neutral"],
    ["UNDERWEIGHT", "EF6C00", "Tilted short"],
    ["SELL",        BEAR,  "Aggressive short"],
  ];
  const totalW = 12.1, gap = 0.15;
  const cardW = (totalW - gap * (ratings.length - 1)) / ratings.length;
  ratings.forEach(([label, color, sub], i) => {
    const x = 0.6 + i * (cardW + gap);
    const y = 1.85;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: 1.3, fill: { color: WHITE }, line: { color: SOFT, width: 0.75 }, shadow: shadow(),
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: cardW, h: 0.18, fill: { color }, line: { color, width: 0 },
    });
    s.addText(label, {
      x, y: y + 0.3, w: cardW, h: 0.55, fontFace: HFONT, fontSize: 18, bold: true,
      color, align: "center", margin: 0,
    });
    s.addText(sub, {
      x, y: y + 0.85, w: cardW, h: 0.35, fontFace: BFONT, fontSize: 11, color: MUTED,
      align: "center", italic: true, margin: 0,
    });
  });

  // conviction visual
  card(s, 0.6, 3.5, 12.1, 1.6);
  s.addText("CONVICTION 1 → 5", {
    x: 0.85, y: 3.65, w: 4.5, h: 0.3, fontFace: BFONT, fontSize: 11, bold: true, color: TEAL,
    charSpacing: 3, margin: 0,
  });
  s.addText("How likely is the directional view right over the next ~5 trading days?", {
    x: 0.85, y: 3.95, w: 11.5, h: 0.35, fontFace: HFONT, fontSize: 14, italic: true, color: SLATE, margin: 0,
  });
  // 5 dots
  for (let i = 1; i <= 5; i++) {
    const x = 1.0 + (i - 1) * 2.4;
    s.addShape(pres.shapes.OVAL, {
      x, y: 4.45, w: 0.5, h: 0.5, fill: { color: i <= 3 ? GOLD : NAVY }, line: { color: NAVY, width: 0 },
    });
    s.addText(String(i), {
      x: x - 0.1, y: 4.95, w: 0.7, h: 0.25, fontFace: BFONT, fontSize: 11, bold: true,
      color: NAVY, align: "center", margin: 0,
    });
  }
  s.addText("very low                                                                                                       very high",
    { x: 0.85, y: 4.45, w: 11.5, h: 0.4, fontFace: BFONT, fontSize: 10, color: MUTED, italic: true, align: "left" });

  // honesty rule
  card(s, 0.6, 5.4, 12.1, 1.4);
  s.addText("HONESTY RULES", {
    x: 0.85, y: 5.55, w: 6.0, h: 0.3, fontFace: BFONT, fontSize: 11, bold: true, color: GOLD,
    charSpacing: 3, margin: 0,
  });
  s.addText([
    { text: "Lean on the arbiter's verdict, but override when underlying evidence justifies it.", options: { bullet: true, breakLine: true } },
    { text: "Low conviction is the correct answer when evidence conflicts — never force a high call.", options: { bullet: true } },
  ], { x: 0.95, y: 5.9, w: 11.7, h: 0.85, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 4 });
}

// =========================================================================
// SLIDE 9 — Risk Specialist Panel (NEW)
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Risk Panel: three specialists, one arbiter", "LAYER · RISK  ·  NEW");

  function spec(x, label, color, watchTitle, watches, verdicts) {
    const w = 4.0, h = 4.4, y = 1.85;
    card(s, x, y, w, h);
    s.addShape(pres.shapes.RECTANGLE, { x, y, w, h: 0.18,
      fill: { color }, line: { color, width: 0 } });
    s.addText(label, {
      x: x + 0.25, y: y + 0.3, w: w - 0.5, h: 0.5,
      fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0,
    });
    s.addText(watchTitle, {
      x: x + 0.25, y: y + 0.85, w: w - 0.5, h: 0.3,
      fontFace: BFONT, fontSize: 10, bold: true, color: color, charSpacing: 2, margin: 0,
    });
    s.addText(
      watches.map((l, i) => ({ text: l, options: { bullet: true, breakLine: i < watches.length - 1 } })),
      { x: x + 0.35, y: y + 1.25, w: w - 0.6, h: 1.85,
        fontFace: BFONT, fontSize: 11, color: SLATE, paraSpaceAfter: 3 }
    );
    s.addText(verdicts, {
      x: x + 0.25, y: y + 3.6, w: w - 0.5, h: 0.7, fontFace: BFONT, fontSize: 11,
      color: NAVY, italic: true, margin: 0, align: "center",
    });
  }

  spec(0.6, "Tail-Risk", BEAR, "WATCHES",
    ["Worst single-day return", "5% historical VaR & CVaR", "Vol expansion (20d / full)",
     "Negative skew of daily returns", "60-day drawdown"],
    "Verdict:  ELEVATED  /  NORMAL  /  MUTED");

  spec(4.85, "Macro / Regime", TEAL, "WATCHES",
    ["SPY trend vs SMA50, SMA200", "Regime: risk_on / risk_off / mixed",
     "60-day market drawdown", "SPY realized volatility"],
    "Verdict:  HOSTILE  /  MIXED  /  SUPPORTIVE");

  spec(9.1, "Liquidity / Micro", GOLD, "WATCHES",
    ["Avg daily dollar volume (20d)", "20d vs 252d liquidity ratio",
     "Avg intraday range (slippage)", "Beta to SPY (60d)"],
    "Verdict:  STRESSED  /  NORMAL  /  DEEP");

  // Arbiter strip
  card(s, 0.6, 6.45, 12.1, 0.7, { fill: NAVY2 });
  s.addText("RISK ARBITER", {
    x: 0.85, y: 6.55, w: 3.0, h: 0.3, fontFace: BFONT, fontSize: 11, bold: true, color: GOLD,
    charSpacing: 3, margin: 0,
  });
  s.addText("If 2+ specialists alarm → DOWNGRADE_TWO_STEPS or OVERRIDE_TO_HOLD  ·  conviction ≤ 2 collapses BUY/SELL", {
    x: 0.85, y: 6.83, w: 11.7, h: 0.3, fontFace: BFONT, fontSize: 11, color: WHITE, margin: 0,
  });
}

// =========================================================================
// SLIDE 10 — Devil's Advocate Critic (NEW)
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Devil's Advocate Critic", "LAYER · CRITIC  ·  NEW");

  // left explainer
  card(s, 0.6, 1.7, 6.5, 5.2);
  s.addText("What it does", {
    x: 0.85, y: 1.85, w: 6.0, h: 0.4, fontFace: HFONT, fontSize: 20, bold: true, color: NAVY, margin: 0,
  });
  s.addText("Last set of eyes before the decision ships.", {
    x: 0.85, y: 2.3, w: 6.0, h: 0.4, fontFace: BFONT, fontSize: 13, italic: true, color: SLATE, margin: 0,
  });
  s.addText([
    { text: "Reads bull, bear, arbiter, trader, all 3 risk specialists, and the risk arbiter.", options: { bullet: true, breakLine: true } },
    { text: "Searches for the strongest single failure mode.", options: { bullet: true, breakLine: true } },
    { text: "Rates its own critique honestly: WEAK, MODERATE, or STRONG.", options: { bullet: true, breakLine: true } },
    { text: "WEAK is a valid honest answer — does not invent failure modes.", options: { bullet: true } },
  ], { x: 0.95, y: 2.85, w: 6.3, h: 4.0, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 6 });

  // right: branching diagram
  card(s, 7.4, 1.7, 5.5, 5.2);
  s.addText("Conditional branch", {
    x: 7.65, y: 1.85, w: 5.0, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0,
  });

  // STRONG path
  s.addShape(pres.shapes.RECTANGLE, { x: 7.65, y: 2.6, w: 5.0, h: 0.5,
    fill: { color: BEAR }, line: { color: BEAR, width: 0 } });
  s.addText("STRONG", { x: 7.65, y: 2.6, w: 5.0, h: 0.5,
    fontFace: HFONT, fontSize: 14, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  s.addText("→ inject critique into bull/bear → one more debate round → re-trade → re-risk → ship",
    { x: 7.65, y: 3.15, w: 5.0, h: 0.65, fontFace: BFONT, fontSize: 11, color: SLATE, italic: true });

  // MODERATE path
  s.addShape(pres.shapes.RECTANGLE, { x: 7.65, y: 4.0, w: 5.0, h: 0.5,
    fill: { color: GOLD }, line: { color: GOLD, width: 0 } });
  s.addText("MODERATE", { x: 7.65, y: 4.0, w: 5.0, h: 0.5,
    fontFace: HFONT, fontSize: 14, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0 });
  s.addText("→ candidate decision stands · concern recorded as a footnote in the report",
    { x: 7.65, y: 4.55, w: 5.0, h: 0.5, fontFace: BFONT, fontSize: 11, color: SLATE, italic: true });

  // WEAK path
  s.addShape(pres.shapes.RECTANGLE, { x: 7.65, y: 5.25, w: 5.0, h: 0.5,
    fill: { color: BULL }, line: { color: BULL, width: 0 } });
  s.addText("WEAK", { x: 7.65, y: 5.25, w: 5.0, h: 0.5,
    fontFace: HFONT, fontSize: 14, bold: true, color: WHITE, align: "center", valign: "middle", margin: 0 });
  s.addText("→ confirm decision · ship straight to final_decision node",
    { x: 7.65, y: 5.8, w: 5.0, h: 0.5, fontFace: BFONT, fontSize: 11, color: SLATE, italic: true });

  s.addText("Loop is bounded: at most one critic-triggered re-debate per run.",
    { x: 7.65, y: 6.45, w: 5.0, h: 0.35, fontFace: BFONT, fontSize: 10, color: MUTED, italic: true });
}

// =========================================================================
// SLIDE 11 — Reflection loop
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Reflection: T+5 post-mortem loop", "LAYER · REFLECTION");

  card(s, 0.6, 1.85, 6.0, 5.2);
  s.addText("Why T+5?", {
    x: 0.85, y: 2.0, w: 5.6, h: 0.4, fontFace: HFONT, fontSize: 20, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "Long enough for the directional view to play out", options: { bullet: true, breakLine: true } },
    { text: "Short enough to attribute outcome to the original signal", options: { bullet: true, breakLine: true } },
    { text: "Aligns with the trader's stated horizon (~5 trading days)", options: { bullet: true } },
  ], { x: 0.95, y: 2.55, w: 5.4, h: 1.7, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 6 });

  s.addText("Outcome labels", {
    x: 0.85, y: 4.4, w: 5.6, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "win  →  return > +3%", options: { bullet: true, breakLine: true, color: BULL } },
    { text: "flat →  -3% ≤ return ≤ +3%", options: { bullet: true, breakLine: true, color: GOLD } },
    { text: "loss →  return < -3%", options: { bullet: true, color: BEAR } },
  ], { x: 0.95, y: 4.95, w: 5.4, h: 1.7, fontFace: "Consolas", fontSize: 13, paraSpaceAfter: 6 });

  // right: post-mortem structure
  card(s, 7.0, 1.85, 5.9, 5.2);
  s.addText("LLM post-mortem (4 sections)", {
    x: 7.25, y: 2.0, w: 5.5, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: NAVY, margin: 0,
  });
  const items = [
    ["1.", "What we got right (or wrong)"],
    ["2.", "Which signal drove the outcome — technical / fundamental / news / regime"],
    ["3.", "What we should weight differently next time for this ticker"],
    ["4.", "One actionable lesson (one sentence)"],
  ];
  let y = 2.65;
  for (const [n, text] of items) {
    s.addText(n, { x: 7.25, y, w: 0.4, h: 0.35, fontFace: HFONT, fontSize: 16, bold: true, color: GOLD, margin: 0 });
    s.addText(text, { x: 7.65, y, w: 5.1, h: 0.55, fontFace: BFONT, fontSize: 12, color: SLATE, margin: 0 });
    y += 0.7;
  }
  s.addText("Stored back into the decision row → memory_context for the next run.",
    { x: 7.25, y: 6.4, w: 5.5, h: 0.4, fontFace: BFONT, fontSize: 11, color: TEAL, italic: true });
}

// =========================================================================
// SLIDE 12 — Reference vs Ours
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "How this differs from TauricResearch / TradingAgents", "COMPARISON");

  const headerOpts = { bold: true, color: WHITE, fill: { color: NAVY }, align: "center", valign: "middle" };
  const cellOpts   = { color: SLATE, valign: "middle" };
  const accentOpts = { color: NAVY, bold: true, valign: "middle" };

  const rows = [
    [
      { text: "Layer", options: headerOpts },
      { text: "Reference", options: headerOpts },
      { text: "Our system", options: { ...headerOpts, fill: { color: GOLD }, color: NAVY } },
    ],
    [
      { text: "Graph topology", options: accentOpts },
      { text: "Cyclic; debate as graph cycles", options: cellOpts },
      { text: "Linear DAG; debate looped inside one node", options: cellOpts },
    ],
    [
      { text: "Memory", options: accentOpts },
      { text: "Vector store (Chroma)", options: cellOpts },
      { text: "Structured SQLite + T+5 outcomes", options: cellOpts },
    ],
    [
      { text: "Risk team", options: accentOpts },
      { text: "Aggressive / conservative / neutral debaters", options: cellOpts },
      { text: "Tail-risk / Macro / Liquidity specialists", options: cellOpts },
    ],
    [
      { text: "Critic loop", options: accentOpts },
      { text: "None", options: cellOpts },
      { text: "Devil's advocate · STRONG triggers re-debate", options: cellOpts },
    ],
    [
      { text: "Debate depth", options: accentOpts },
      { text: "Fixed", options: cellOpts },
      { text: "Configurable 2-5 rounds per run", options: cellOpts },
    ],
    [
      { text: "Final output", options: accentOpts },
      { text: "Free-form research", options: cellOpts },
      { text: "Five-bucket rating + 1-5 conviction", options: cellOpts },
    ],
    [
      { text: "Reports", options: accentOpts },
      { text: "Markdown per stage", options: cellOpts },
      { text: "Markdown per stage + summary + metrics.json", options: cellOpts },
    ],
    [
      { text: "CLI", options: accentOpts },
      { text: "One-shot script", options: cellOpts },
      { text: "Interactive menu + reflection sweep", options: cellOpts },
    ],
  ];

  s.addTable(rows, {
    x: 0.6, y: 1.7, w: 12.1, colW: [2.6, 4.5, 5.0],
    fontFace: BFONT, fontSize: 12,
    border: { type: "solid", pt: 0.5, color: SOFT },
    rowH: 0.5,
  });
}

// =========================================================================
// SLIDE 13 — CLI / how to run + closing
// =========================================================================
{
  const s = pres.addSlide();
  slideHeader(s, "Run it · the interactive CLI", "DEMO · CLI");

  // left: commands
  card(s, 0.6, 1.85, 6.5, 5.2, { fill: NAVY });
  s.addText("Commands", {
    x: 0.85, y: 2.0, w: 6.0, h: 0.4, fontFace: HFONT, fontSize: 18, bold: true, color: GOLD, margin: 0,
  });
  s.addText([
    { text: "$ python main.py",                              options: { breakLine: true, color: WHITE } },
    { text: "    # opens interactive menu",                   options: { breakLine: true, color: "CADCFC" } },
    { text: "",                                                options: { breakLine: true } },
    { text: "$ python main.py AAPL --rounds 3",              options: { breakLine: true, color: WHITE } },
    { text: "    # one-shot, 3 debate rounds",                options: { breakLine: true, color: "CADCFC" } },
    { text: "",                                                options: { breakLine: true } },
    { text: "$ python main.py AAPL --rounds 5 --reflect",    options: { breakLine: true, color: WHITE } },
    { text: "    # max-depth + run T+5 sweep",                options: { breakLine: true, color: "CADCFC" } },
    { text: "",                                                options: { breakLine: true } },
    { text: "$ python main.py --reflect-only",               options: { breakLine: true, color: WHITE } },
    { text: "    # post-mortems on matured decisions",        options: { color: "CADCFC" } },
  ], { x: 0.95, y: 2.55, w: 6.0, h: 4.4, fontFace: "Consolas", fontSize: 13, paraSpaceAfter: 2 });

  // right: menu mock
  card(s, 7.4, 1.85, 5.5, 5.2);
  s.addText("Menu (interactive)", {
    x: 7.65, y: 2.0, w: 5.0, h: 0.4, fontFace: HFONT, fontSize: 16, bold: true, color: NAVY, margin: 0,
  });
  s.addText([
    { text: "1) Analyze a ticker",                  options: { bullet: { type: "number" }, breakLine: true } },
    { text: "2) Run reflection on matured rows",     options: { bullet: { type: "number" }, breakLine: true } },
    { text: "3) List recent decisions for a ticker", options: { bullet: { type: "number" }, breakLine: true } },
    { text: "4) List pending T+5 evaluations",       options: { bullet: { type: "number" }, breakLine: true } },
    { text: "5) View latest report",                  options: { bullet: { type: "number" }, breakLine: true } },
    { text: "6) Quit",                                options: { bullet: { type: "number" } } },
  ], { x: 7.75, y: 2.55, w: 5.0, h: 3.0, fontFace: BFONT, fontSize: 13, color: SLATE, paraSpaceAfter: 6 });

  s.addText("Reports written to:", {
    x: 7.65, y: 5.6, w: 5.0, h: 0.3, fontFace: BFONT, fontSize: 11, bold: true, color: TEAL, charSpacing: 2, margin: 0,
  });
  s.addText("reports/<TICKER>/<YYYY-MM-DD>/report.md  +  per-stage *.md  +  metrics.json",
    { x: 7.65, y: 5.9, w: 5.1, h: 0.6, fontFace: "Consolas", fontSize: 11, color: SLATE, italic: true });

  s.addText("Decisions persisted to SQLite — re-evaluated automatically at T+5.",
    { x: 7.65, y: 6.65, w: 5.0, h: 0.35, fontFace: BFONT, fontSize: 10, color: MUTED, italic: true });
}

// =========================================================================
// SLIDE 14 — closing
// =========================================================================
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addShape(pres.shapes.LINE, { x: 1.5, y: 3.4, w: 10.3, h: 0, line: { color: GOLD, width: 1.5 }});
  s.addText("Thank you", {
    x: 0.6, y: 2.6, w: 13, h: 0.8, fontFace: HFONT, fontSize: 60, bold: true,
    color: WHITE, align: "center", margin: 0,
  });
  s.addText("Multi-Agent Trading Intelligence  ·  CS494 Spring 2026", {
    x: 0.6, y: 3.6, w: 13, h: 0.6, fontFace: HFONT, fontSize: 18, italic: true,
    color: GOLD, align: "center", margin: 0,
  });
  s.addText("github.com/cs494-agentic-ai-spring-2026/group-project-code-submission-team10", {
    x: 0.6, y: 4.5, w: 13, h: 0.4, fontFace: BFONT, fontSize: 13, color: "CADCFC", align: "center",
  });
}

// ----- write -----
pres.writeFile({ fileName: "MultiAgent_Trading_Intelligence.pptx" })
  .then(fn => console.log("Wrote", fn))
  .catch(err => { console.error(err); process.exit(1); });
