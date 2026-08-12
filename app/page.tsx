"use client";

import { useMemo, useState } from "react";

const rapidApiUrl =
  "https://rapidapi.com/propdata-propdata-default/api/propdata-address-autocomplete-avm-api";
const calendlyUrl = "https://calendly.com/proptechusa";
const docsUrl = "https://propdata.proptechusa.ai/docs";
const statusUrl = "https://www.proptechusa.ai/status";
const companyUrl = "https://www.proptechusa.ai";

const suggestions = [
  {
    address: "10548 KENTUCKY AVE S, BLOOMINGTON, MN 55438",
    meta: "Canonical property match · Hennepin County",
    type: "Single-family residence",
  },
  {
    address: "10544 KENTUCKY AVE S, BLOOMINGTON, MN 55438",
    meta: "Nearby canonical match · Hennepin County",
    type: "Single-family residence",
  },
  {
    address: "10552 KENTUCKY AVE S, BLOOMINGTON, MN 55438", 
    meta: "Nearby canonical match · Hennepin County",
    type: "Single-family residence",
  },
];

const baseValue = 512400;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function ShieldMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "shield-mark compact" : "shield-mark"} aria-hidden="true">
      <svg viewBox="0 0 44 48" focusable="false">
        <defs>
          <linearGradient id={compact ? "shield-blue-small" : "shield-blue"} x1="7" y1="4" x2="37" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#0b1f3a" />
            <stop offset=".58" stopColor="#143f91" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <clipPath id={compact ? "shield-clip-small" : "shield-clip"}>
            <path d="M22 3.5 39.3 9.6v11.7c0 11.6-6.7 20.1-17.3 24.3C11.4 41.4 4.7 32.9 4.7 21.3V9.6Z" />
          </clipPath>
        </defs>
        <path d="M22 1.5 41 8.3v13c0 12.6-7.4 21.7-19 26C10.4 43 3 33.9 3 21.3v-13Z" fill="none" stroke="#2563eb" strokeWidth="1" opacity=".28" />
        <path d="M22 3.5 39.3 9.6v11.7c0 11.6-6.7 20.1-17.3 24.3C11.4 41.4 4.7 32.9 4.7 21.3V9.6Z" fill={`url(#${compact ? "shield-blue-small" : "shield-blue"})`} stroke="#082249" strokeWidth="1.5" />
        <path d="M22 6.6 36.2 11.6v9.5c0 9.5-5.1 16.5-14.2 20.5-9.1-4-14.2-11-14.2-20.5v-9.5Z" fill="none" stroke="#c6dcff" strokeWidth="1" opacity=".94" />
        <g clipPath={`url(#${compact ? "shield-clip-small" : "shield-clip"})`}>
          <rect x="11.2" y="25" width="5.6" height="12" rx="1.5" fill="#ef3340" />
          <rect x="19.2" y="20" width="5.6" height="17" rx="1.5" fill="#fff" />
          <rect x="27.2" y="14" width="5.6" height="23" rx="1.5" fill="#7db5ff" />
        </g>
        <path d="m12.4 12.2 9.6-3.4 9.6 3.4" fill="none" stroke="#ef3340" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <span className={footer ? "brand footer-brand" : "brand"}>
      <ShieldMark compact={footer} />
      <span className="brand-copy">
        <strong>Prop<em>Data</em></strong>
        <small>AUTOCOMPLETE + INSTANT VALUE</small>
      </span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("10548 Kentucky Ave S");
  const [selected, setSelected] = useState(0);
  const [heroMode, setHeroMode] = useState<"value" | "offer">("value");
  const [activeStage, setActiveStage] = useState("Value");
  const [offerBasis, setOfferBasis] = useState(82);
  const [repairs, setRepairs] = useState(18000);
  const [fees, setFees] = useState(6000);
  const [responseView, setResponseView] = useState<"parsed" | "json">("parsed");

  const filteredSuggestions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const matches = suggestions.filter((item) =>
      item.address.toLowerCase().includes(normalized),
    );
    return matches.length ? matches : suggestions.slice(0, 1);
  }, [query]);

  const instantOffer = Math.max(
    0,
    Math.round((baseValue * (offerBasis / 100) - repairs - fees) / 100) * 100,
  );

  const selectedProperty = suggestions[selected] ?? suggestions[0];

  return (
    <main>
      <div className="brand-rail" aria-hidden="true"><span /><span /></div>

      <header className="site-header">
        <a href="#top" aria-label="PropData Autocomplete home"><Brand /></a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <div className="nav-group">
            <a className="nav-link" href="#product" onClick={() => setMenuOpen(false)}>Product <span>⌄</span></a>
            <div className="nav-menu">
              <a href="#address-autocomplete" onClick={() => setMenuOpen(false)}><b>Address autocomplete</b><small>Resolve a canonical property as the user types.</small></a>
              <a href="#instant-value" onClick={() => setMenuOpen(false)}><b>Instant value</b><small>Return an approved value and confidence contract.</small></a>
              <a href="#instant-offer" onClick={() => setMenuOpen(false)}><b>Instant offer</b><small>Apply your eligibility and offer economics.</small></a>
              <a href="#architecture" onClick={() => setMenuOpen(false)}><b>Delivery surfaces</b><small>API, embed, white label, or custom contract.</small></a>
            </div>
          </div>
          <a className="nav-link" href="#workflow" onClick={() => setMenuOpen(false)}>How it works</a>
          <div className="nav-group">
            <a className="nav-link" href="#use-cases" onClick={() => setMenuOpen(false)}>Solutions <span>⌄</span></a>
            <div className="nav-menu compact-menu">
              <a href="#homeowner-value" onClick={() => setMenuOpen(false)}><b>Homeowner value</b><small>Turn intent into a property-specific conversation.</small></a>
              <a href="#instant-acquisition" onClick={() => setMenuOpen(false)}><b>Instant acquisition</b><small>Qualify properties before offer review.</small></a>
              <a href="#home-services" onClick={() => setMenuOpen(false)}><b>Home services</b><small>Attach property context to every lead.</small></a>
              <a href="#ai-automation" onClick={() => setMenuOpen(false)}><b>AI + automation</b><small>Ground agents in one stable property identity.</small></a>
            </div>
          </div>
          <a className="nav-link" href="#developers" onClick={() => setMenuOpen(false)}>Developers</a>
          <a className="nav-link" href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <div className="nav-group resources-group">
            <a className="nav-link" href="#faq" onClick={() => setMenuOpen(false)}>Resources <span>⌄</span></a>
            <div className="nav-menu compact-menu">
              <a href="#faq" onClick={() => setMenuOpen(false)}><b>Frequently asked questions</b><small>How identity, values, offers, and delivery work.</small></a>
              <a href={docsUrl} target="_blank" rel="noreferrer"><b>Developer docs ↗</b><small>Explore the PropData API documentation.</small></a>
              <a href={statusUrl} target="_blank" rel="noreferrer"><b>Platform status ↗</b><small>See current API availability.</small></a>
            </div>
          </div>
        </nav>
        <div className="header-actions">
          <a className="status-pill desktop-only" href={statusUrl} target="_blank" rel="noreferrer"><i /> API Operational</a>
          <a className="button outline desktop-only" href={docsUrl} target="_blank" rel="noreferrer">Docs</a>
          <a className="button blue desktop-only" href={calendlyUrl} target="_blank" rel="noreferrer">Book an Integration</a>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          ><span /><span /><span /></button>
        </div>
      </header>

      <div className="signal-strip" aria-label="Product capabilities">
        <span>AUTOCOMPLETE + AVM + OFFER LOGIC</span><i />
        <span>166M+ U.S. PARCEL RECORDS</span><i />
        <span>ADDRESS → IDENTITY → VALUE → ACTION</span><i />
        <span>API · EMBED · WHITE LABEL</span>
      </div>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="hero-kicker"><span>PROPERTY INTELLIGENCE AT THE FIRST KEYSTROKE</span><i /> ONE INPUT. ONE DECISION LAYER.</div>
          <h1>
            Turn one address into an <em>instant value.</em>
            <strong>Or a qualified offer.</strong>
          </h1>
          <p className="hero-lead">
            PropData turns ordinary address autocomplete into a complete property decision experience—canonical identity, parcel intelligence, valuation, and customer-approved offer logic in one flow.
          </p>
          <div className="hero-actions">
            <a className="button red large" href={calendlyUrl} target="_blank" rel="noreferrer">Build an Instant-Offer Flow →</a>
            <a className="button blue large" href="#product">Explore the Product →</a>
          </div>
          <p className="hero-micro"><b>Self-serve API access from $79</b><span>·</span> Custom enterprise contracts <span>·</span> Founder-led integration</p>
          <div className="hero-proof">
            <div><strong>166M+</strong><span>parcel records indexed</span></div>
            <div><strong>50</strong><span>states in the data layer</span></div>
            <div><strong>20+</strong><span>production API routes</span></div>
          </div>
        </div>

        <div className="experience-wrap" id="product">
          <div className="experience-label">
            <span><b>INTERACTIVE PRODUCT EXPERIENCE</b><small>Address to decision</small></span>
            <span className="ready-badge"><i /> PRODUCTION ARCHITECTURE</span>
          </div>
          <div className="experience-console">
            <div className="console-tabs" role="tablist" aria-label="Property decision stages">
              {["Search", "Resolve", "Value", "Offer"].map((stage, index) => (
                <button
                  key={stage}
                  type="button"
                  role="tab"
                  aria-selected={activeStage === stage}
                  className={activeStage === stage ? "active" : ""}
                  onClick={() => setActiveStage(stage)}
                ><span>0{index + 1}</span>{stage}<small>{stage === "Search" ? "autocomplete" : stage === "Resolve" ? "canonical" : stage === "Value" ? "AVM" : "rules"}</small></button>
              ))}
            </div>
            <div className="console-urlbar">
              <span className="traffic-lights"><i /><i /><i /></span>
              <code>autocomplete.proptechusa.ai / property-decision</code>
              <span className="latency"><i /> 184 MS</span>
            </div>
            <div className="console-body">
              <div className="search-pane" id="address-autocomplete">
                <div className="pane-heading"><span>PROPERTY SEARCH</span><span>CANONICAL MATCH REQUIRED</span></div>
                <label htmlFor="hero-address">Start with an address</label>
                <div className="search-control">
                  <span className="search-glyph">⌕</span>
                  <input
                    id="hero-address"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActiveStage("Search");
                    }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd>⌘ K</kbd>
                </div>
                <div className="match-list" role="listbox" aria-label="Illustrative property matches">
                  {filteredSuggestions.map((item, index) => (
                    <button
                      key={item.address}
                      type="button"
                      role="option"
                      aria-selected={selected === index}
                      className={selected === index ? "match active" : "match"}
                      onClick={() => {
                        setSelected(index);
                        setQuery(item.address);
                        setActiveStage("Resolve");
                      }}
                    >
                      <span className="match-pin">⌖</span>
                      <span><b>{item.address}</b><small>{item.meta}</small></span>
                      {selected === index ? <span className="match-check">✓</span> : <span className="match-arrow">→</span>}
                    </button>
                  ))}
                </div>
                <div className="resolution-row">
                  <div><span>IDENTITY</span><b><i /> Resolved</b></div>
                  <div><span>COUNTY</span><b>Hennepin</b></div>
                  <div><span>DELIVERY</span><b>Offer-ready</b></div>
                </div>
              </div>

              <div className="decision-pane" id="instant-value">
                <div className="decision-toolbar">
                  <span>DECISION RESPONSE</span>
                  <div className="mode-toggle" aria-label="Decision response mode">
                    <button type="button" className={heroMode === "value" ? "active" : ""} onClick={() => { setHeroMode("value"); setActiveStage("Value"); }}>Value</button>
                    <button type="button" className={heroMode === "offer" ? "active" : ""} onClick={() => { setHeroMode("offer"); setActiveStage("Offer"); }}>Offer</button>
                  </div>
                </div>
                <div className="property-identity">
                  <span className="house-icon">⌂</span>
                  <span><small>CANONICAL PROPERTY</small><b>{selectedProperty.address.split(",")[0]}</b><em>Bloomington, MN 55438 · Hennepin County</em></span>
                  <span className="confidence-badge">HIGH CONFIDENCE</span>
                </div>
                <div className="decision-number">
                  <small>{heroMode === "value" ? "ILLUSTRATIVE INSTANT VALUE" : "ILLUSTRATIVE INSTANT OFFER"}</small>
                  <strong>{formatCurrency(heroMode === "value" ? baseValue : instantOffer)}</strong>
                  <span>{heroMode === "value" ? "Range $486,000–$538,000" : `${offerBasis}% basis · repairs and costs applied`}</span>
                </div>
                <div className="decision-signals">
                  <div><span>PROPERTY</span><b>Canonical</b><small>One identity selected</small></div>
                  <div><span>VALUATION</span><b>Current contract</b><small>Estimate + confidence</small></div>
                  <div><span>NEXT ACTION</span><b>{heroMode === "value" ? "Lead capture" : "Offer review"}</b><small>Customer-configured</small></div>
                </div>
                <button type="button" className="decision-cta">{heroMode === "value" ? "See my property value" : "Review this offer"}<span>→</span></button>
              </div>
            </div>
            <div className="console-foot">
              <span><i /> CONTROLLED PRODUCT PREVIEW</span>
              <p>Illustrative values shown. Production deployments use the customer&apos;s approved PropData contract, valuation source, eligibility rules, and disclosures.</p>
            </div>
          </div>
          <div className="experience-proof">
            <span>✓ Canonical property identity</span><span>✓ Value + confidence contract</span><span>✓ Customer-controlled decisions</span>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Product delivery surfaces">
        <span><b>START WITH</b> Address · Parcel ID · Coordinates</span><i>→</i>
        <span><b>RESOLVE ONCE</b> PropData Property Identity</span><i>→</i>
        <span><b>RETURN</b> Value · Offer · Lead · Underwrite</span>
      </section>

      <section className="dark-section workflow" id="workflow">
        <div className="section-heading light split">
          <div>
            <div className="section-kicker"><i /> THE PRODUCT ADVANTAGE</div>
            <h2>Autocomplete should not end with a formatted address.</h2>
          </div>
          <p>It should establish the property identity every downstream workflow can trust—then return the intelligence and next action the customer came for.</p>
        </div>
        <div className="workflow-grid">
          {[
            ["01", "SEARCH", "Capture intent immediately.", "Rank clean address matches as the user types and require a canonical selection before any paid property workflow begins."],
            ["02", "IDENTITY", "Resolve the actual property.", "Connect the address to the parcel, county, geometry, and official property record instead of passing ambiguous free text downstream."],
            ["03", "INTELLIGENCE", "Attach the decision layer.", "Return valuation, ownership, tax, sales, rent, comps, neighborhood, risk, or the exact response contract the experience needs."],
            ["04", "ACTION", "Convert the answer into revenue.", "Show a value, calculate an approved offer, qualify the lead, or route the property directly into underwriting and operations."],
          ].map(([number, label, title, copy]) => (
            <article className="workflow-card" key={number}>
              <div><span>{number}</span><small>{label}</small></div>
              <h3>{title}</h3><p>{copy}</p><i />
            </article>
          ))}
        </div>

        <div className="intelligence-visual">
          <div className="visual-image" role="img" aria-label="Aerial neighborhood with parcel intelligence overlays" />
          <div className="visual-shade" />
          <div className="visual-copy">
            <div className="section-kicker"><i /> PROPERTY-AWARE FROM THE FIRST INPUT</div>
            <h2>One address can unlock the entire property context.</h2>
            <p>Stop asking customers for information the selected property can already provide. Resolve once, enrich once, and let the experience move directly to the decision.</p>
            <div className="visual-metrics">
              <span><small>IDENTITY</small><b>Canonical</b></span>
              <span><small>PARCEL</small><b>Resolved</b></span>
              <span><small>VALUE</small><b>Contract-ready</b></span>
              <span><small>DECISION</small><b>Configurable</b></span>
            </div>
          </div>
          <div className="visual-property-card">
            <span className="visual-status"><i /> PROPERTY RESOLVED</span>
            <b>10548 Kentucky Ave S</b><small>Bloomington, MN 55438</small>
            <div><span>COUNTY<em>Hennepin</em></span><span>MATCH<em>Canonical</em></span></div>
          </div>
        </div>
      </section>

      <section className="section configure" id="customize">
        <div className="section-heading split">
          <div>
            <div className="section-kicker red-kicker"><i /> CUSTOMER-CONTROLLED DECISIONING</div>
            <h2>Keep the value contract. Customize what happens next.</h2>
          </div>
          <p>Use PropData to resolve and value the property, then apply the market, asset, margin, repair, and eligibility rules approved for your business.</p>
        </div>

        <div className="offer-studio" id="instant-offer">
          <div className="studio-header">
            <span><b>PROPDATA OFFER STUDIO</b><small>Illustrative customer ruleset</small></span>
            <span className="studio-state"><i /> CONFIGURATION ACTIVE</span>
          </div>
          <div className="studio-body">
            <div className="studio-controls">
              <div className="studio-property">
                <ShieldMark compact />
                <span><small>APPROVED VALUE INPUT</small><b>{formatCurrency(baseValue)}</b><em>High-confidence illustrative estimate</em></span>
              </div>
              <div className="preset-row" aria-label="Offer strategy presets">
                {[["Conservative", 78], ["Balanced", 82], ["Aggressive", 86]].map(([label, value]) => (
                  <button key={label} type="button" className={offerBasis === value ? "active" : ""} onClick={() => setOfferBasis(Number(value))}><span>{label}</span><b>{value}%</b></button>
                ))}
              </div>
              <label className="range-control" htmlFor="offer-basis">
                <span><b>Offer basis</b><output>{offerBasis}% of approved value</output></span>
                <input id="offer-basis" type="range" min="65" max="95" value={offerBasis} onChange={(event) => setOfferBasis(Number(event.target.value))} />
              </label>
              <label className="range-control" htmlFor="repair-budget">
                <span><b>Repair allowance</b><output>{formatCurrency(repairs)}</output></span>
                <input id="repair-budget" type="range" min="0" max="60000" step="1000" value={repairs} onChange={(event) => setRepairs(Number(event.target.value))} />
              </label>
              <label className="range-control" htmlFor="fees-budget">
                <span><b>Closing + carrying costs</b><output>{formatCurrency(fees)}</output></span>
                <input id="fees-budget" type="range" min="0" max="25000" step="500" value={fees} onChange={(event) => setFees(Number(event.target.value))} />
              </label>
              <div className="eligibility-grid">
                <span><i /> Market eligible</span><span><i /> Asset eligible</span><span><i /> Margin approved</span><span><i /> Lead route active</span>
              </div>
            </div>

            <div className="studio-result" aria-live="polite">
              <div className="result-top"><span>INSTANT OFFER RESPONSE</span><span><i /> READY</span></div>
              <small className="result-label">CUSTOMER-FACING OFFER</small>
              <strong>{formatCurrency(instantOffer)}</strong>
              <p>Calculated from the approved value and the active illustrative customer ruleset.</p>
              <div className="offer-math">
                <span><small>VALUE INPUT</small><b>{formatCurrency(baseValue)}</b></span>
                <span><small>{offerBasis}% BASIS</small><b>{formatCurrency(baseValue * (offerBasis / 100))}</b></span>
                <span><small>DEDUCTIONS</small><b>−{formatCurrency(repairs + fees)}</b></span>
              </div>
              <button type="button" className="studio-cta">Continue to offer review <span>→</span></button>
              <small className="studio-disclaimer">Illustrative formula only. Production rules, eligibility, disclosures, and customer messaging are approved and configured for each deployment.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="section-heading centered">
          <div className="section-kicker"><i /> ONE PROPERTY CONTRACT. MULTIPLE PRODUCT SURFACES.</div>
          <h2>Launch it inside the experience you already own.</h2>
          <p>Use the same property-resolution and decision layer across acquisition funnels, homeowner tools, portals, mobile products, AI agents, and internal operations.</p>
        </div>
        <div className="architecture-grid">
          <article className="architecture-card wide red-card" id="api-integration"><span>01 / API</span><h3>Build the entire experience in your stack.</h3><p>Request canonical identity, approved property intelligence, valuation, and the next-action contract through one server-side integration.</p><a href={rapidApiUrl} target="_blank" rel="noreferrer">Explore API access →</a></article>
          <article className="architecture-card"><span>02 / EMBED</span><h3>Drop in a conversion-ready flow.</h3><p>Launch an address-to-value experience inside an existing landing page, campaign, or customer portal.</p></article>
          <article className="architecture-card" id="white-label"><span>03 / WHITE LABEL</span><h3>Make the entire journey yours.</h3><p>Your brand, qualification questions, disclosures, offer logic, CRM route, and customer handoff.</p></article>
          <article className="architecture-card wide blue-card"><span>04 / CUSTOM CONTRACT</span><h3>Return the fields your product needs—not a vendor&apos;s generic payload.</h3><p>Shape the inputs, response schema, source contract, priority markets, and delivery surface around the workflow you are shipping.</p><a href={calendlyUrl} target="_blank" rel="noreferrer">Design the contract →</a></article>
        </div>
      </section>

      <section className="dark-section developers" id="developers">
        <div className="developer-copy">
          <div className="section-kicker"><i /> BUILT FOR PRODUCT + ENGINEERING</div>
          <h2>One response your front end can actually use.</h2>
          <p>Resolve the property once and return the identity, valuation, customer decision, and next action together—without wiring a different vendor into every screen.</p>
          <div className="developer-list">
            <div><span>01</span><p><b>Stable property identity</b><small>Carry one canonical property through every downstream workflow.</small></p></div>
            <div><span>02</span><p><b>Configurable response contract</b><small>Return the exact fields, sources, and decision outputs your application expects.</small></p></div>
            <div><span>03</span><p><b>Traceable customer logic</b><small>Keep approved rules and next actions explicit instead of hiding them in the interface.</small></p></div>
          </div>
          <div className="developer-actions"><a className="button red large" href={calendlyUrl} target="_blank" rel="noreferrer">Book an Integration →</a><a className="button dark-outline large" href={docsUrl} target="_blank" rel="noreferrer">Read the Docs</a></div>
        </div>
        <div className="response-explorer">
          <div className="response-head"><span><i /> PROPERTY DECISION RESPONSE</span><div><button type="button" className={responseView === "parsed" ? "active" : ""} onClick={() => setResponseView("parsed")}>PARSED</button><button type="button" className={responseView === "json" ? "active" : ""} onClick={() => setResponseView("json")}>JSON</button></div></div>
          <div className="response-route"><span className="traffic-lights"><i /><i /><i /></span><code>POST /v1/property-decision</code><b>200 OK</b></div>
          {responseView === "parsed" ? (
            <div className="parsed-response">
              <div className="parsed-title"><span><small>CANONICAL PROPERTY</small><b>10548 Kentucky Ave S</b><em>Bloomington, MN 55438</em></span><span className="parsed-status">READY</span></div>
              <div className="parsed-stats"><span><small>IDENTITY</small><b>Canonical</b></span><span><small>VALUE</small><b>{formatCurrency(baseValue)}</b></span><span><small>OFFER</small><b>{formatCurrency(instantOffer)}</b></span></div>
              <div className="parsed-table">
                <span><small>match</small><b>canonical_address</b></span><span><small>valuation.confidence</small><b>high</b></span><span><small>decision.ruleset</small><b>customer_approved_v3</b></span><span><small>next_action.type</small><b>lead_capture</b></span>
              </div>
              <div className="parsed-note"><i /> SAMPLE CONTRACT · VALUES ILLUSTRATIVE</div>
            </div>
          ) : (
            <pre><code>{`{
  "sample_contract": true,
  "property": {
    "canonical_address": "10548 KENTUCKY AVE S, BLOOMINGTON, MN 55438",
    "match": "canonical_address"
  },
  "valuation": {
    "estimate": ${baseValue},
    "confidence": "high",
    "illustrative": true
  },
  "decision": {
    "mode": "instant_offer",
    "offer": ${instantOffer},
    "ruleset": "customer_approved_v3"
  },
  "next_action": { "type": "lead_capture" }
}`}</code></pre>
          )}
          <div className="response-foot">Example customizable response shape. Production fields and logic follow the customer&apos;s approved contract.</div>
        </div>
      </section>

      <section className="section use-cases" id="use-cases">
        <div className="section-heading split">
          <div><div className="section-kicker red-kicker"><i /> BUILT FOR THE MOMENT OF INTENT</div><h2>Answer the question behind the address.</h2></div>
          <p>An address search is rarely just a search. It is the beginning of a valuation, acquisition, qualification, verification, or property-specific conversation.</p>
        </div>
        <div className="use-grid">
          {[
            ["homeowner-value", "01", "HOMEOWNER VALUE", "Turn a generic landing page into a property-specific value and equity conversation."],
            ["instant-acquisition", "02", "INSTANT ACQUISITION", "Apply approved market and asset rules before routing the property into an offer workflow."],
            ["home-services", "03", "HOME SERVICES", "Qualify solar, roofing, HVAC, insurance, and renovation opportunities with property context attached."],
            ["ai-automation", "04", "AI + AUTOMATION", "Give agents a canonical property identity before they retrieve, reason, recommend, or act."],
          ].map(([slug, number, title, copy]) => <article id={slug} key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i>↗</i></article>)}
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="section-heading centered">
          <div className="section-kicker"><i /> START WITH THE RIGHT DELIVERY MODEL</div>
          <h2>Use the API—or have us shape the complete experience.</h2>
          <p>Choose the product surface that matches your team, then connect it to the PropData source and decision contract approved for your account.</p>
        </div>
        <div className="pricing-grid">
          <article><span className="plan-label">SELF-SERVE</span><h3>API Access</h3><strong>From $79<small>/month</small></strong><p>For developers building the product experience inside their own stack.</p><ul><li>Address autocomplete</li><li>Property resolution</li><li>Plan-based data access</li><li>Developer documentation</li></ul><a className="button outline large" href={rapidApiUrl} target="_blank" rel="noreferrer">View API Options →</a></article>
          <article className="featured-plan"><span className="plan-label">CUSTOM EXPERIENCE</span><h3>Instant Value</h3><strong>Custom</strong><p>For teams launching a branded address-to-value funnel with qualification and routing.</p><ul><li>Branded customer journey</li><li>Value + confidence contract</li><li>Lead qualification and CRM handoff</li><li>Implementation support</li></ul><a className="button red large" href={calendlyUrl} target="_blank" rel="noreferrer">Design My Value Flow →</a></article>
          <article><span className="plan-label">CUSTOM + RULES</span><h3>Instant Offer</h3><strong>Custom</strong><p>For acquisition teams applying approved eligibility and economics to property value.</p><ul><li>Customer-defined offer model</li><li>Market + asset eligibility</li><li>Disclosures and next actions</li><li>CRM, webhook, or custom handoff</li></ul><a className="button blue large" href={calendlyUrl} target="_blank" rel="noreferrer">Scope an Offer Flow →</a></article>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="faq-copy"><div className="section-kicker"><i /> FREQUENT QUESTIONS</div><h2>Built to become a real product—not another lead-form demo.</h2><p>Bring the workflow you want customers to complete. We will map the property identity, data contract, decision logic, and delivery path around it.</p><a href={calendlyUrl} target="_blank" rel="noreferrer">Talk through the implementation →</a></div>
        <div className="faq-list">
          {[
            ["How is this different from ordinary autocomplete?", "Ordinary autocomplete returns a formatted location. This workflow turns the selected address into a canonical property identity, then attaches the approved intelligence and next decision."],
            ["Is the value returned in real time?", "The experience can return immediately after a canonical property selection. The result comes from the valuation source and contract configured for the production deployment—not a fabricated browser-side estimate."],
            ["How is an instant offer calculated?", "The offer layer uses customer-approved rules such as value basis, eligibility, repairs, fees, market, and asset type. The calculator on this page is clearly illustrative, not production underwriting."],
            ["Can we use our own brand and qualification flow?", "Yes. The interface, language, disclosures, qualification questions, calls to action, CRM routing, and customer handoff can be shaped around your product."],
            ["Can developers use only the API?", "Yes. Teams can start with self-serve API access or use a custom contract when the workflow needs additional fields, source commitments, markets, or decision logic."],
          ].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}
        </div>
      </section>

      <section className="final-cta" id="contact">
        <div className="final-grid" aria-hidden="true" />
        <div><div className="section-kicker"><i /> AUTOCOMPLETE TO ACTION</div><h2>Make the address field the beginning of the product.</h2><p>Resolve the property. Return the value. Customize the next move.</p></div>
        <div className="final-actions"><a className="button red large" href={calendlyUrl} target="_blank" rel="noreferrer">Book an Integration →</a><a className="button dark-outline large" href={rapidApiUrl} target="_blank" rel="noreferrer">Start with the API</a></div>
      </section>

      <footer className="site-footer">
        <div className="footer-accent" aria-hidden="true"><span /><span /></div>
        <div className="footer-main">
          <div className="footer-intro">
            <a href="#top" aria-label="PropData Autocomplete home"><Brand footer /></a>
            <h3>Property intelligence at the moment of intent.</h3>
            <p>Resolve the address, return the approved value, and move every qualified property into the right next action.</p>
            <a className="footer-status" href={statusUrl} target="_blank" rel="noreferrer"><i /> API operational <span>View status ↗</span></a>
            <div className="footer-proof"><span><b>166M+</b><small>PARCELS</small></span><span><b>50</b><small>STATES</small></span><span><b>20+</b><small>API ROUTES</small></span></div>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <div>
              <span>PRODUCT</span>
              <a href="#address-autocomplete">Address autocomplete</a>
              <a href="#instant-value">Instant value</a>
              <a href="#instant-offer">Instant offer</a>
              <a href="#white-label">White label</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div>
              <span>DEVELOPERS</span>
              <a href="#developers">Decision response</a>
              <a href="#api-integration">API integration</a>
              <a href={rapidApiUrl} target="_blank" rel="noreferrer">API access ↗</a>
              <a href={docsUrl} target="_blank" rel="noreferrer">Documentation ↗</a>
              <a href={statusUrl} target="_blank" rel="noreferrer">System status ↗</a>
            </div>
            <div>
              <span>SOLUTIONS</span>
              <a href="#homeowner-value">Homeowner value</a>
              <a href="#instant-acquisition">Instant acquisition</a>
              <a href="#home-services">Home services</a>
              <a href="#ai-automation">AI + automation</a>
              <a href="#workflow">How it works</a>
            </div>
            <div>
              <span>COMPANY</span>
              <a href={companyUrl} target="_blank" rel="noreferrer">PropTechUSA ↗</a>
              <a href="#architecture">Delivery models</a>
              <a href="#faq">FAQ</a>
              <a href={calendlyUrl} target="_blank" rel="noreferrer">Book integration ↗</a>
              <a href="#top">Back to top ↑</a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 PropTechUSA. All rights reserved.</span>
          <p>Illustrative values and offers shown. Production outputs follow each customer&apos;s approved data, rules, disclosures, and contract.</p>
          <div><a href="#workflow">Coverage</a><a href="#faq">FAQ</a><a href="#top">Top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
