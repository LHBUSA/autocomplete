"use client";

import { useMemo, useState } from "react";

const rapidApiUrl =
  "https://rapidapi.com/propdata-propdata-default/api/propdata-address-autocomplete-avm-api";
const calendlyUrl = "https://calendly.com/proptechusa";
const propDataUrl = "https://propdata.proptechusa.ai";
const workspaceUrl = "https://propdata.proptechusa.ai/dashboard";
const docsUrl = "https://propdata.proptechusa.ai/docs";
const pricingUrl = "https://propdata.proptechusa.ai/#pricing";
const termsUrl = "https://www.proptechusa.ai/terms";
const statusUrl = "https://www.proptechusa.ai/status";
const companyUrl = "https://www.proptechusa.ai";
const propSecureUrl = "https://propsecure.proptechusa.ai";
const propSportsUrl = "https://propsports.proptechusa.ai";
const billingUrl =
  "https://billing.stripe.com/p/login/cNi3cv2vY7em3lr4oj7wA00";

type DemoProperty = {
  id: string;
  address: string;
  city: string;
  meta: string;
  type: string;
  county: string;
  matchId: string;
  value: number;
  rangeLow: number;
  rangeHigh: number;
  latency: number;
  beds: number;
  baths: number;
  livingArea: number;
  yearBuilt: number;
  lotSqft: number;
};

const suggestions: DemoProperty[] = [
  {
    id: "kentucky-10548",
    address: "10548 KENTUCKY AVE S, BLOOMINGTON, MN 55438",
    city: "Bloomington, MN 55438",
    meta: "Canonical property match · Hennepin County",
    type: "Single-family residence",
    county: "Hennepin",
    matchId: "PD-DEMO-MN-10548",
    value: 512400,
    rangeLow: 486000,
    rangeHigh: 538000,
    latency: 184,
    beds: 4,
    baths: 3,
    livingArea: 2340,
    yearBuilt: 1978,
    lotSqft: 10890,
  },
  {
    id: "kentucky-10544",
    address: "10544 KENTUCKY AVE S, BLOOMINGTON, MN 55438",
    city: "Bloomington, MN 55438",
    meta: "Nearby canonical match · Hennepin County",
    type: "Single-family residence",
    county: "Hennepin",
    matchId: "PD-DEMO-MN-10544",
    value: 498800,
    rangeLow: 474000,
    rangeHigh: 523000,
    latency: 171,
    beds: 4,
    baths: 2,
    livingArea: 2180,
    yearBuilt: 1977,
    lotSqft: 10454,
  },
  {
    id: "kentucky-10552",
    address: "10552 KENTUCKY AVE S, BLOOMINGTON, MN 55438",
    city: "Bloomington, MN 55438",
    meta: "Nearby canonical match · Hennepin County",
    type: "Single-family residence",
    county: "Hennepin",
    matchId: "PD-DEMO-MN-10552",
    value: 529100,
    rangeLow: 503000,
    rangeHigh: 555000,
    latency: 196,
    beds: 5,
    baths: 3,
    livingArea: 2510,
    yearBuilt: 1979,
    lotSqft: 11326,
  },
];

const demoStages = ["Search", "Resolve", "Value", "Offer"] as const;
type DemoStage = (typeof demoStages)[number];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

type ShieldProduct = "autocomplete" | "propdata" | "propsecure" | "propsports" | "platform";

function ProductShield({
  product = "autocomplete",
  compact = false,
}: {
  product?: ShieldProduct;
  compact?: boolean;
}) {
  return (
    <span
      className={`${compact ? "shield-mark compact" : "shield-mark"} shield-${product}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 68" focusable="false">
        <path d="M32 2 58 11v18c0 17-10.1 29.7-26 36.6C16.1 58.7 6 46 6 29V11Z" fill="#fff" stroke="#dce7f4" strokeWidth="2" />
        <path d="M32 6 54 13.6v15c0 14.2-7.8 24.9-22 31.6-14.2-6.7-22-17.4-22-31.6v-15Z" fill="currentColor" stroke="#0a2548" strokeWidth="2.4" />
        <path d="M32 10.2 50 16.4v12.2c0 11.6-6 20.5-18 26.5-12-6-18-14.9-18-26.5V16.4Z" fill="none" stroke="#a9c9ff" strokeWidth="1.4" opacity=".92" />
        {product === "autocomplete" && (
          <g>
            <rect x="17" y="23" width="30" height="13" rx="4" fill="#fff" />
            <circle cx="24" cy="29.5" r="3.1" fill="none" stroke="#2563eb" strokeWidth="2" />
            <path d="m26.4 32 3.1 3" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            <path d="m35 39 10 4.8-4.6 2-2.1 5.2Z" fill="#ef3340" stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
          </g>
        )}
        {product === "propdata" && (
          <g>
            <rect x="18" y="34" width="6" height="12" rx="1.6" fill="#ef3340" />
            <rect x="29" y="27" width="6" height="19" rx="1.6" fill="#fff" />
            <rect x="40" y="20" width="6" height="26" rx="1.6" fill="#7db5ff" />
            <path d="m18 23 14-6 14 6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        {product === "propsecure" && (
          <g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round">
            <path d="m19 31 13-11 13 11v15H19Z" strokeWidth="3" />
            <path d="m27 37 4 4 8-9" stroke="#58e09b" strokeWidth="3.5" />
          </g>
        )}
        {product === "propsports" && (
          <g>
            <circle cx="32" cy="33" r="14" fill="#fff" />
            <path d="M18.5 30.5c9 1 18 7 27 5M27 20c4 8 4 18 0 26M38 21c-5 6-7 16-4 25" fill="none" stroke="#2563eb" strokeWidth="2" />
            <path d="M19 38c7-1 17 2 23 7" fill="none" stroke="#ef3340" strokeWidth="2" />
          </g>
        )}
        {product === "platform" && (
          <g fill="#fff">
            <circle cx="32" cy="22" r="4" />
            <circle cx="21" cy="41" r="4" />
            <circle cx="43" cy="41" r="4" />
            <path d="M30.5 25.5 23 37m10.5-11.5L41 37M25 41h14" fill="none" stroke="#7db5ff" strokeWidth="2.5" />
          </g>
        )}
      </svg>
    </span>
  );
}

function ShieldMark({ compact = false }: { compact?: boolean }) {
  return <ProductShield compact={compact} product="autocomplete" />;
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
  const [selected, setSelected] = useState(suggestions[0].id);
  const [heroMode, setHeroMode] = useState<"value" | "offer">("value");
  const [activeStage, setActiveStage] = useState<DemoStage>("Value");
  const [offerBasis, setOfferBasis] = useState(82);
  const [repairs, setRepairs] = useState(18000);
  const [fees, setFees] = useState(6000);
  const [responseView, setResponseView] = useState<"parsed" | "json" | "curl">("parsed");

  const selectedProperty =
    suggestions.find((property) => property.id === selected) ?? suggestions[0];
  const baseValue = selectedProperty.value;
  const activeStageIndex = demoStages.indexOf(activeStage);

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
          <div className="nav-group">
            <a className="nav-link" href="#shield-network" onClick={() => setMenuOpen(false)}>Shield Network <span>⌄</span></a>
            <div className="nav-menu compact-menu ecosystem-menu">
              <a href={propDataUrl}><b>PropData</b><small>Flagship property intelligence infrastructure.</small></a>
              <a href={propSecureUrl}><b>PropSecure</b><small>Enterprise property surveillance and risk signals.</small></a>
              <a href={propSportsUrl}><b>PropSports</b><small>Live sports data, odds, and Statcast infrastructure.</small></a>
              <a href={companyUrl}><b>PropTechUSA.ai</b><small>Explore the complete independent data ecosystem.</small></a>
            </div>
          </div>
          <div className="nav-group resources-group">
            <a className="nav-link" href="#faq" onClick={() => setMenuOpen(false)}>Resources <span>⌄</span></a>
            <div className="nav-menu compact-menu">
              <a href="#faq" onClick={() => setMenuOpen(false)}><b>Frequently asked questions</b><small>How identity, values, offers, and delivery work.</small></a>
              <a href={workspaceUrl}><b>API Workspace</b><small>Build and inspect a production request.</small></a>
              <a href={docsUrl}><b>Developer docs</b><small>Explore the PropData API documentation.</small></a>
              <a href={statusUrl}><b>Platform status</b><small>See current API availability.</small></a>
            </div>
          </div>
        </nav>
        <div className="header-actions">
          <a className="status-pill desktop-only" href={statusUrl} target="_blank" rel="noreferrer"><i /> API Operational</a>
          <a className="button outline desktop-only" href={workspaceUrl}>API Workspace</a>
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
              {demoStages.map((stage, index) => (
                <button
                  key={stage}
                  type="button"
                  role="tab"
                  aria-selected={activeStage === stage}
                  className={`${activeStage === stage ? "active" : ""} ${index < activeStageIndex ? "complete" : ""}`.trim()}
                  onClick={() => {
                    setActiveStage(stage);
                    if (stage === "Value") setHeroMode("value");
                    if (stage === "Offer") setHeroMode("offer");
                  }}
                ><span>{index < activeStageIndex ? "✓" : `0${index + 1}`}</span>{stage}<small>{stage === "Search" ? "autocomplete" : stage === "Resolve" ? "canonical" : stage === "Value" ? "AVM" : "rules"}</small></button>
              ))}
            </div>
            <div className="console-urlbar">
              <span className="traffic-lights"><i /><i /><i /></span>
              <code>
                {activeStage === "Search" && "GET /v1/autocomplete"}
                {activeStage === "Resolve" && "GET /v1/property?enrich=full"}
                {activeStage === "Value" && "GET /v1/estimate"}
                {activeStage === "Offer" && "CUSTOM /v1/property-decision"}
              </code>
              <span className="latency"><i /> {selectedProperty.latency} MS</span>
            </div>
            <div className="demo-context-bar">
              <span><i /> GUIDED LIVE PRODUCT DEMO</span>
              <div aria-label="Demo properties">
                {suggestions.map((property, index) => (
                  <button
                    key={property.id}
                    type="button"
                    className={selected === property.id ? "active" : ""}
                    onClick={() => {
                      setSelected(property.id);
                      setQuery(property.address.split(",")[0]);
                      setActiveStage("Resolve");
                    }}
                  >0{index + 1} · {property.address.split(" ")[0]}</button>
                ))}
              </div>
              <em>Controlled sample records · values illustrative</em>
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
                <div className="match-caption">
                  <span>{filteredSuggestions.length} canonical match{filteredSuggestions.length === 1 ? "" : "es"}</span>
                  <span>Hennepin County · MN</span>
                </div>
                <div className="match-list" role="listbox" aria-label="Illustrative property matches">
                  {filteredSuggestions.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      role="option"
                      aria-selected={selected === item.id}
                      className={selected === item.id ? "match active" : "match"}
                      onClick={() => {
                        setSelected(item.id);
                        setQuery(item.address.split(",")[0]);
                        setActiveStage("Resolve");
                      }}
                    >
                      <span className="match-pin">⌖</span>
                      <span><b>{item.address}</b><small>{item.meta} · {item.type}</small></span>
                      {selected === item.id ? <span className="match-check">✓</span> : <span className="match-arrow">→</span>}
                    </button>
                  ))}
                </div>
                <div className="resolution-row">
                  <div><span>IDENTITY</span><b><i /> Resolved</b></div>
                  <div><span>COUNTY</span><b>{selectedProperty.county}</b></div>
                  <div><span>MATCH ID</span><b>{selectedProperty.matchId}</b></div>
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
                  <span className="house-icon"><ShieldMark compact /></span>
                  <span><small>CANONICAL PROPERTY</small><b>{selectedProperty.address.split(",")[0]}</b><em>{selectedProperty.city} · {selectedProperty.county} County</em></span>
                  <span className="confidence-badge">HIGH CONFIDENCE</span>
                </div>
                <div className="property-spec-grid" aria-label="Illustrative property characteristics">
                  <span><small>BEDS</small><b>{selectedProperty.beds}</b></span>
                  <span><small>BATHS</small><b>{selectedProperty.baths}</b></span>
                  <span><small>LIVING AREA</small><b>{selectedProperty.livingArea.toLocaleString()} ft²</b></span>
                  <span><small>YEAR</small><b>{selectedProperty.yearBuilt}</b></span>
                  <span><small>LOT</small><b>{selectedProperty.lotSqft.toLocaleString()} ft²</b></span>
                </div>
                <div className="decision-number">
                  <small>{heroMode === "value" ? "ILLUSTRATIVE INSTANT VALUE" : "ILLUSTRATIVE INSTANT OFFER"}</small>
                  <strong>{formatCurrency(heroMode === "value" ? baseValue : instantOffer)}</strong>
                  <span>{heroMode === "value" ? `Range ${formatCurrency(selectedProperty.rangeLow)}–${formatCurrency(selectedProperty.rangeHigh)}` : `${offerBasis}% basis · repairs and costs applied`}</span>
                </div>
                <div className="decision-signals">
                  <div><span>PROPERTY</span><b>Canonical</b><small>One identity selected</small></div>
                  <div><span>VALUATION</span><b>Current contract</b><small>Estimate + confidence</small></div>
                  <div><span>NEXT ACTION</span><b>{heroMode === "value" ? "Lead capture" : "Offer review"}</b><small>Customer-configured</small></div>
                </div>
                <button
                  type="button"
                  className="decision-cta"
                  onClick={() => {
                    if (heroMode === "value") {
                      setHeroMode("offer");
                      setActiveStage("Offer");
                    } else {
                      document.getElementById("instant-offer")?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >{heroMode === "value" ? "Model an instant offer" : "Open the offer studio"}<span>→</span></button>
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
          <div className="studio-pipeline" aria-label="Offer decision pipeline">
            <span className="complete"><i>01</i><b>Identity</b><small>canonical</small></span>
            <em>→</em>
            <span className="complete"><i>02</i><b>Value</b><small>{formatCurrency(baseValue)}</small></span>
            <em>→</em>
            <span className="active"><i>03</i><b>Rules</b><small>customer model</small></span>
            <em>→</em>
            <span><i>04</i><b>Route</b><small>CRM + review</small></span>
          </div>
          <div className="studio-body">
            <div className="studio-controls">
              <div className="studio-property">
                <ShieldMark compact />
                <span><small>APPROVED VALUE INPUT</small><b>{formatCurrency(baseValue)}</b><em>{selectedProperty.address}</em></span>
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
              <div className="result-identity"><span>{selectedProperty.matchId}</span><b>{selectedProperty.address.split(",")[0]}</b></div>
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
          <div className="response-head"><span><i /> PROPERTY DECISION RESPONSE</span><div><button type="button" className={responseView === "parsed" ? "active" : ""} onClick={() => setResponseView("parsed")}>PARSED</button><button type="button" className={responseView === "json" ? "active" : ""} onClick={() => setResponseView("json")}>JSON</button><button type="button" className={responseView === "curl" ? "active" : ""} onClick={() => setResponseView("curl")}>cURL</button></div></div>
          <div className="endpoint-chain" aria-label="Production request sequence">
            <span><i>01</i><b>/v1/autocomplete</b><small>rank</small></span>
            <em>→</em>
            <span><i>02</i><b>/v1/property</b><small>resolve + enrich</small></span>
            <em>→</em>
            <span><i>03</i><b>/v1/estimate</b><small>value</small></span>
            <em>→</em>
            <span className="active"><i>04</i><b>custom contract</b><small>decision</small></span>
          </div>
          <div className="response-route"><span className="traffic-lights"><i /><i /><i /></span><code>CUSTOM /v1/property-decision</code><b>200 OK · {selectedProperty.latency} MS</b></div>
          {responseView === "parsed" ? (
            <div className="parsed-response">
              <div className="parsed-title"><span><small>CANONICAL PROPERTY</small><b>{selectedProperty.address.split(",")[0]}</b><em>{selectedProperty.city}</em></span><span className="parsed-status">READY</span></div>
              <div className="parsed-stats"><span><small>IDENTITY</small><b>Canonical</b></span><span><small>VALUE</small><b>{formatCurrency(baseValue)}</b></span><span><small>OFFER</small><b>{formatCurrency(instantOffer)}</b></span></div>
              <div className="parsed-table">
                <span><small>property.match_id</small><b>{selectedProperty.matchId}</b></span><span><small>valuation.confidence</small><b>high</b></span><span><small>decision.ruleset</small><b>customer_approved_v3</b></span><span><small>next_action.type</small><b>offer_review</b></span>
              </div>
              <div className="parsed-note"><i /> SAMPLE CONTRACT · VALUES ILLUSTRATIVE</div>
            </div>
          ) : responseView === "json" ? (
            <pre><code>{`{
  "sample_contract": true,
  "property": {
    "match_id": "${selectedProperty.matchId}",
    "canonical_address": "${selectedProperty.address}",
    "match": "canonical_address",
    "characteristics": {
      "beds": ${selectedProperty.beds},
      "baths": ${selectedProperty.baths},
      "living_area_sqft": ${selectedProperty.livingArea}
    }
  },
  "valuation": {
    "estimate": ${baseValue},
    "range_low": ${selectedProperty.rangeLow},
    "range_high": ${selectedProperty.rangeHigh},
    "confidence": "high",
    "illustrative": true
  },
  "decision": {
    "mode": "instant_offer",
    "offer": ${instantOffer},
    "ruleset": "customer_approved_v3"
  },
  "next_action": { "type": "offer_review" }
}`}</code></pre>
          ) : (
            <pre><code>{`# Server-side custom decision contract
curl -X POST \\
  "https://api.yourbrand.com/v1/property-decision" \\
  -H "Authorization: Bearer $YOUR_SERVER_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "address": "${selectedProperty.address}",
    "mode": "instant_offer",
    "ruleset": "customer_approved_v3"
  }'

# PropData credentials remain server-side.
# Response shape, sources, and decision logic are customer-approved.`}</code></pre>
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

      <section className="shield-network" id="shield-network">
        <div className="network-heading">
          <div>
            <div className="section-kicker"><i /> THE PROPTECHUSA.AI SHIELD NETWORK</div>
            <h2>Focused products. One independent infrastructure ecosystem.</h2>
          </div>
          <div className="network-intro">
            <p>Every shield represents a focused product surface backed by the same standard: clear identity, inspectable infrastructure, and direct access to the builders behind it.</p>
            <a href={companyUrl}>Explore the parent platform →</a>
          </div>
        </div>

        <div className="shield-grid" aria-label="PropTechUSA product ecosystem">
          <a className="shield-card current" href="#top" aria-current="page">
            <div className="shield-card-top"><ProductShield product="autocomplete" /><span>CURRENT PRODUCT</span></div>
            <small>ADDRESS DECISIONING</small>
            <h3>Autocomplete</h3>
            <p>Turn one selected address into canonical property identity, an instant value, or a customer-controlled offer.</p>
            <div><b>ADDRESS → ACTION</b><span>Explore this page ↑</span></div>
          </a>
          <a className="shield-card" href={propDataUrl}>
            <div className="shield-card-top"><ProductShield product="propdata" /><span>FLAGSHIP INFRASTRUCTURE</span></div>
            <small>PROPERTY INTELLIGENCE</small>
            <h3>PropData</h3>
            <p>Property identity, geometry, ownership, valuation, tax, comps, rent, market, risk, and provenance through one API.</p>
            <div><b>166M+ PARCELS</b><span>Explore PropData →</span></div>
          </a>
          <a className="shield-card" href={propSecureUrl}>
            <div className="shield-card-top"><ProductShield product="propsecure" /><span>ENTERPRISE SIGNALS</span></div>
            <small>PROPERTY SURVEILLANCE</small>
            <h3>PropSecure</h3>
            <p>Continuous portfolio monitoring, verification, risk signals, and evidence-backed alerts engineered into enterprise workflows.</p>
            <div><b>MONITOR → VERIFY</b><span>Explore PropSecure →</span></div>
          </a>
          <a className="shield-card" href={propSportsUrl}>
            <div className="shield-card-top"><ProductShield product="propsports" /><span>LIVE DATA NETWORK</span></div>
            <small>SPORTS INTELLIGENCE</small>
            <h3>PropSports</h3>
            <p>Live sports data, player props, Statcast, odds, schedules, weather, and production-ready endpoints for builders.</p>
            <div><b>LIVE SPORTS API</b><span>Explore PropSports →</span></div>
          </a>
          <a className="shield-card parent" href={companyUrl}>
            <div className="shield-card-top"><ProductShield product="platform" /><span>PARENT PLATFORM</span></div>
            <small>INDEPENDENT DATA INFRASTRUCTURE</small>
            <h3>PropTechUSA.ai</h3>
            <p>The company and shared infrastructure network behind the PropData, PropSecure, PropSports, and Autocomplete product shields.</p>
            <div><b>ONE ECOSYSTEM</b><span>Visit PropTechUSA.ai →</span></div>
          </a>
        </div>

        <div className="network-proof">
          <span><i /> Founder-led integration</span>
          <span><i /> Independent infrastructure</span>
          <span><i /> Shared reliability standard</span>
          <span><i /> Product-specific contracts</span>
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
              <span>PROPDATA PLATFORM</span>
              <a href={propDataUrl}>PropData home</a>
              <a href={workspaceUrl}>API Workspace</a>
              <a href={docsUrl}>API documentation</a>
              <a href="#developers">Decision response</a>
              <a href="#api-integration">API integration</a>
            </div>
            <div>
              <span>SHIELD NETWORK</span>
              <a href="#top">Autocomplete</a>
              <a href={propDataUrl}>PropData</a>
              <a href={propSecureUrl}>PropSecure</a>
              <a href={propSportsUrl}>PropSports</a>
              <a href={companyUrl}>PropTechUSA.ai</a>
            </div>
            <div>
              <span>ACCOUNT + COMPANY</span>
              <a href={pricingUrl}>Plans from $79</a>
              <a href={billingUrl} target="_blank" rel="noreferrer">Customer billing ↗</a>
              <a href={statusUrl}>System status</a>
              <a href="mailto:sales@proptechusa.ai">sales@proptechusa.ai</a>
              <a href="tel:+18887843881">1-888-784-3881</a>
              <a href="#faq">FAQ</a>
              <a href={calendlyUrl} target="_blank" rel="noreferrer">Book integration ↗</a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <span>© 2026 PropTechUSA. All rights reserved.</span>
          <p>Illustrative values and offers shown. Production outputs follow each customer&apos;s approved data, rules, disclosures, and contract.</p>
          <div><a href={termsUrl}>Terms</a><a href={statusUrl}>Status</a><a href="#top">Top ↑</a></div>
        </div>
      </footer>
    </main>
  );
}
