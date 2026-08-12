"use client";

import { useMemo, useState } from "react";

const rapidApiUrl =
  "https://rapidapi.com/propdata-propdata-default/api/propdata-address-autocomplete-avm-api";
const calendlyUrl = "https://calendly.com/proptechusa";

const suggestions = [
  {
    address: "3640 NW 22 CT, Miami, FL 33142",
    meta: "Single-family · 1,542 sq ft · 2 beds",
  },
  {
    address: "3640 NW 22 AVE, Miami, FL 33142",
    meta: "Canonical parcel match · Miami-Dade",
  },
  {
    address: "3640 NW 22 ST, Miami, FL 33142",
    meta: "Alternate street match · Miami-Dade",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [query, setQuery] = useState("3640 NW 22");
  const [selected, setSelected] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resultMode, setResultMode] = useState<"value" | "offer">("offer");
  const [offerBasis, setOfferBasis] = useState(82);
  const [repairs, setRepairs] = useState(18000);
  const [fees, setFees] = useState(6000);
  const baseValue = 408936;
  const instantOffer = Math.max(
    0,
    Math.round((baseValue * (offerBasis / 100) - repairs - fees) / 100) * 100,
  );
  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    return suggestions.filter((item) =>
      item.address.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [query]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PropData Instant Value home">
          <span className="brand-mark">PD</span>
          <span className="brand-copy">
            <b>PropData</b>
            <small>INSTANT VALUE</small>
          </span>
        </a>
        <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#workflow" onClick={() => setMenuOpen(false)}>How it works</a>
          <a href="#customize" onClick={() => setMenuOpen(false)}>Customize</a>
          <a href="#developers" onClick={() => setMenuOpen(false)}>Developers</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        </nav>
        <div className="header-actions">
          <a className="button ghost desktop-cta" href={rapidApiUrl} target="_blank" rel="noreferrer">
            API access
          </a>
          <a className="button primary desktop-cta" href={calendlyUrl} target="_blank" rel="noreferrer">
            Build my flow
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow glow-one" />
        <div className="hero-glow glow-two" />
        <div className="hero-copy">
          <div className="eyebrow"><i /> AUTOCOMPLETE THAT CONVERTS</div>
          <h1>
            Turn an address into an <span>instant value.</span>
            <br />Or an instant offer.
          </h1>
          <p className="hero-lead">
            Most autocomplete products stop at a postal match. PropData resolves the property,
            attaches real estate intelligence, and returns the value or customer-specific offer
            your experience needs.
          </p>
          <div className="hero-actions">
            <a className="button primary large" href={calendlyUrl} target="_blank" rel="noreferrer">
              Customize an instant-offer flow <span>→</span>
            </a>
            <a className="button ghost large" href="#workflow">
              See the workflow
            </a>
          </div>
          <div className="proof-row" aria-label="Product highlights">
            <span><b>166M+</b> parcel foundation</span>
            <span><b>One input</b> to value</span>
            <span><b>White-label</b> ready</span>
          </div>
        </div>

        <div className="hero-product" aria-label="Interactive product flow preview">
          <div className="product-toolbar">
            <div>
              <span className="live-dot" /> PRODUCT FLOW PREVIEW
            </div>
            <span>PropData-powered</span>
          </div>
          <div className="product-body">
            <label htmlFor="address-preview">Property address</label>
            <div className="address-control">
              <span className="search-icon">⌕</span>
              <input
                id="address-preview"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(0);
                }}
                autoComplete="off"
                spellCheck={false}
                aria-describedby="preview-note"
              />
              <span className="key-hint">⌘ K</span>
            </div>
            <div className="suggestion-list" role="listbox" aria-label="Example canonical matches">
              {filteredSuggestions.length ? (
                filteredSuggestions.map((item, index) => (
                  <button
                    key={item.address}
                    className={selected === index ? "suggestion selected" : "suggestion"}
                    type="button"
                    role="option"
                    aria-selected={selected === index}
                    onClick={() => {
                      setSelected(index);
                      setQuery(item.address);
                    }}
                  >
                    <span className="pin">●</span>
                    <span><b>{item.address}</b><small>{item.meta}</small></span>
                    {selected === index && <span className="selected-check">✓</span>}
                  </button>
                ))
              ) : (
                <div className="empty-suggestion">Keep typing to preview the address flow.</div>
              )}
            </div>
            <div className="value-card">
              <div className="value-head">
                <span>INSTANT VALUE</span>
                <span className="confidence">HIGH CONFIDENCE</span>
              </div>
              <div className="value-number">$408,936</div>
              <div className="value-range">Estimated range $389,000–$429,000</div>
              <div className="value-metrics">
                <span><small>PARCEL</small><b>Resolved</b></span>
                <span><small>PROPERTY</small><b>Enriched</b></span>
                <span><small>NEXT STEP</small><b>Offer-ready</b></span>
              </div>
            </div>
            <p className="preview-note" id="preview-note">
              Controlled interface preview using an illustrative response. Production deployments connect to the customer&apos;s approved PropData contract and offer rules.
            </p>
          </div>
        </div>
      </section>

      <section className="logo-strip" aria-label="Use cases">
        <span>HOME BUYERS</span><i />
        <span>INVESTOR TOOLS</span><i />
        <span>LEAD FORMS</span><i />
        <span>APPRAISAL</span><i />
        <span>SOLAR + ROOFING</span><i />
        <span>REAL ESTATE AI</span>
      </section>

      <section className="section workflow" id="workflow">
        <div className="section-heading centered">
          <div className="eyebrow"><i /> ONE INPUT. COMPLETE PROPERTY DECISION.</div>
          <h2>Autocomplete is only the beginning.</h2>
          <p>
            The selected address becomes a verified property identity, then flows through the data and business logic required to produce a useful next action.
          </p>
        </div>
        <div className="flow-grid">
          {[
            ["01", "TYPE", "Autocomplete the address", "Fast, ranked matches guide the user to a canonical property instead of accepting ambiguous text."],
            ["02", "RESOLVE", "Identify the parcel", "Connect the selected address to the official parcel, county workflow, and property record."],
            ["03", "ENRICH", "Attach intelligence", "Add characteristics, valuation, tax, sales, rent, comps, risk, and neighborhood context."],
            ["04", "CALCULATE", "Return value or offer", "Deliver an AVM, value range, or a customer-specific offer calculated from approved rules."],
          ].map(([number, label, title, copy]) => (
            <article className="flow-card" key={number}>
              <div className="flow-top"><span>{number}</span><small>{label}</small></div>
              <h3>{title}</h3>
              <p>{copy}</p>
              <div className="flow-line"><b /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="outcome-band" aria-label="Product outcomes">
        <div>
          <span className="outcome-number">01</span>
          <p><b>Resolve the property</b><small>Canonical address + parcel identity</small></p>
        </div>
        <span className="outcome-arrow">→</span>
        <div>
          <span className="outcome-number">02</span>
          <p><b>Return the value</b><small>AVM + range + confidence</small></p>
        </div>
        <span className="outcome-arrow">→</span>
        <div className="outcome-final">
          <span className="outcome-number">03</span>
          <p><b>Make it actionable</b><small>Offer, lead, or underwriting next step</small></p>
        </div>
      </section>

      <section className="section customize" id="customize">
        <div className="section-heading">
          <div className="eyebrow"><i /> YOUR RULES. YOUR EXPERIENCE.</div>
          <h2>Return a value—or turn that value into an offer.</h2>
          <p>
            Keep the property intelligence consistent while changing the decision layer for each customer, market, campaign, or asset class.
          </p>
        </div>

        <div className="calculator-shell">
          <div className="calculator-controls">
            <div className="control-intro">
              <span>ILLUSTRATIVE RULE BUILDER</span>
              <span className="demo-pill">INTERACTIVE</span>
            </div>
            <h3>Shape the result your customer sees.</h3>
            <p>Start with PropData&apos;s illustrative value, then apply an approved customer formula.</p>

            <div className="mode-switch" aria-label="Result type">
              <button
                type="button"
                className={resultMode === "value" ? "active" : ""}
                onClick={() => setResultMode("value")}
              >
                Instant value
              </button>
              <button
                type="button"
                className={resultMode === "offer" ? "active" : ""}
                onClick={() => setResultMode("offer")}
              >
                Instant offer
              </button>
            </div>

            <div className={resultMode === "offer" ? "rules visible" : "rules"} aria-hidden={resultMode !== "offer"}>
              <div className="strategy-row" aria-label="Offer strategy presets">
                {[
                  ["Conservative", 78],
                  ["Balanced", 82],
                  ["Aggressive", 86],
                ].map(([label, percent]) => (
                  <button
                    type="button"
                    key={label}
                    className={offerBasis === percent ? "active" : ""}
                    onClick={() => setOfferBasis(Number(percent))}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <label className="range-row" htmlFor="offer-basis">
                <span><b>Offer basis</b><output>{offerBasis}%</output></span>
                <input
                  id="offer-basis"
                  type="range"
                  min="65"
                  max="95"
                  value={offerBasis}
                  onChange={(event) => setOfferBasis(Number(event.target.value))}
                />
                <small>Percentage of the approved value used before deductions.</small>
              </label>

              <label className="range-row" htmlFor="repair-budget">
                <span><b>Repair budget</b><output>{formatCurrency(repairs)}</output></span>
                <input
                  id="repair-budget"
                  type="range"
                  min="0"
                  max="60000"
                  step="1000"
                  value={repairs}
                  onChange={(event) => setRepairs(Number(event.target.value))}
                />
              </label>

              <label className="range-row" htmlFor="fees-budget">
                <span><b>Closing + carrying costs</b><output>{formatCurrency(fees)}</output></span>
                <input
                  id="fees-budget"
                  type="range"
                  min="0"
                  max="25000"
                  step="500"
                  value={fees}
                  onChange={(event) => setFees(Number(event.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="calculator-result" aria-live="polite">
            <div className="result-topline">
              <span>{resultMode === "offer" ? "INSTANT OFFER" : "INSTANT VALUE"}</span>
              <span className="result-status"><i /> READY TO RETURN</span>
            </div>
            <div className="result-property">
              <span className="result-home">⌂</span>
              <span><b>3640 NW 22 CT</b><small>Miami, FL 33142 · Parcel resolved</small></span>
            </div>
            <div className="result-value">
              <small>{resultMode === "offer" ? "CUSTOMER-FACING OFFER" : "ESTIMATED PROPERTY VALUE"}</small>
              <strong>{formatCurrency(resultMode === "offer" ? instantOffer : baseValue)}</strong>
              <span>{resultMode === "offer" ? "Calculated from this customer ruleset" : "Illustrative range $389,000–$429,000"}</span>
            </div>

            {resultMode === "offer" ? (
              <div className="result-math">
                <div><span>Approved value</span><b>{formatCurrency(baseValue)}</b></div>
                <div><span>{offerBasis}% basis</span><b>{formatCurrency(baseValue * (offerBasis / 100))}</b></div>
                <div><span>Repairs + costs</span><b>−{formatCurrency(repairs + fees)}</b></div>
              </div>
            ) : (
              <div className="confidence-rail">
                <span><b>Confidence</b><small>HIGH</small></span>
                <div><i /></div>
                <p>Value, range, and confidence can be returned independently of an offer.</p>
              </div>
            )}

            <button type="button" className="result-action">
              {resultMode === "offer" ? "Continue with this offer" : "See my property details"}
              <span>→</span>
            </button>
            <p className="result-disclaimer">
              Illustrative interface and formula only. Production logic, eligibility, disclosures, and customer messaging are configured and approved for each deployment.
            </p>
          </div>
        </div>
      </section>

      <section className="decision-section">
        <div className="section-heading centered light">
          <div className="eyebrow"><i /> ONE ENGINE. MULTIPLE EXPERIENCES.</div>
          <h2>Build the next step around your business.</h2>
          <p>Use the same resolved property record to power a lightweight estimate, a qualified lead, or a rules-based acquisition workflow.</p>
        </div>
        <div className="decision-grid">
          {[
            ["VALUE", "Instant value", "Show an estimate, range, and confidence in the branded experience your audience already trusts.", ["Consumer valuation", "Homeowner engagement", "Equity conversations"]],
            ["OFFER", "Instant offer", "Apply approved buy-box, margin, repair, and market rules before returning the next step.", ["Acquisition funnels", "iBuyer experiences", "Investor lead capture"]],
            ["UNDERWRITE", "Decision-ready lead", "Return enriched property context alongside the user's intent so the right team can act immediately.", ["Property characteristics", "Risk + comps context", "CRM-ready handoff"]],
          ].map(([label, title, copy, bullets], index) => (
            <article className={index === 1 ? "decision-card featured" : "decision-card"} key={String(label)}>
              <span className="decision-label">{String(label)}</span>
              <h3>{String(title)}</h3>
              <p>{String(copy)}</p>
              <ul>
                {(bullets as string[]).map((bullet) => <li key={bullet}>✓ {bullet}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section developers" id="developers">
        <div className="developer-copy">
          <div className="eyebrow"><i /> INTEGRATE THE WAY YOU BUILD.</div>
          <h2>API when you want control. A branded flow when you want speed.</h2>
          <p>
            Keep the decisioning inside your stack or launch a customer-facing experience with PropData handling the property-resolution layer.
          </p>
          <div className="integration-list">
            <div><span>API</span><p><b>Compose your own product</b><small>Request canonical property identity, valuation, and the approved decision response your application needs.</small></p></div>
            <div><span>UI</span><p><b>Embeddable experience</b><small>Drop a conversion-focused address-to-value flow into a landing page, portal, or campaign.</small></p></div>
            <div><span>WL</span><p><b>White-label funnel</b><small>Launch with your colors, copy, disclosures, qualification questions, and handoff path.</small></p></div>
          </div>
          <div className="developer-actions">
            <a className="button primary large" href={rapidApiUrl} target="_blank" rel="noreferrer">Explore API access →</a>
            <a className="button dark-ghost large" href={calendlyUrl} target="_blank" rel="noreferrer">Plan an integration</a>
          </div>
        </div>

        <div className="code-card" aria-label="Example customizable response contract">
          <div className="code-toolbar"><span><i /> RESPONSE CONTRACT</span><span>JSON</span></div>
          <pre><code>{`{
  "property": {
    "canonical_address": "3640 NW 22 CT, Miami, FL 33142",
    "parcel_id": "resolved-property-id"
  },
  "valuation": {
    "estimate": 408936,
    "range": [389000, 429000],
    "confidence": "high"
  },
  "decision": {
    "mode": "instant_offer",
    "offer": ${instantOffer},
    "ruleset": "customer_approved_v3"
  },
  "next_action": {
    "type": "lead_capture"
  }
}`}</code></pre>
          <p>Example response shape. Fields and decision logic are configured for the customer&apos;s approved implementation.</p>
        </div>
      </section>

      <section className="section use-cases">
        <div className="section-heading split-heading">
          <div>
            <div className="eyebrow"><i /> BUILT FOR THE MOMENT OF INTENT.</div>
            <h2>When someone types an address, answer the question behind it.</h2>
          </div>
          <p>Turn a high-intent address search into an immediate, property-aware customer experience—without asking the user to repeat what you already know.</p>
        </div>
        <div className="use-grid">
          {[
            ["01", "Home services", "Qualify roof, solar, HVAC, insurance, and renovation opportunities with the property context already attached."],
            ["02", "Real estate leads", "Move from generic lead form to a property-specific conversation with value and equity context."],
            ["03", "Acquisitions", "Evaluate a property against a customer buy box and route qualified opportunities to the right team."],
            ["04", "AI products", "Give agents and copilots a canonical property identity before they reason, retrieve, or recommend."],
          ].map(([number, title, copy]) => (
            <article className="use-card" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{copy}</p><i>↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="section pricing" id="pricing">
        <div className="section-heading centered">
          <div className="eyebrow"><i /> START WITH THE RIGHT DELIVERY MODEL.</div>
          <h2>Use the API—or have us shape the experience with you.</h2>
          <p>No invented endpoints and no forced workflow. Choose the product surface that fits your team and connect it to the PropData contract approved for your account.</p>
        </div>
        <div className="pricing-grid">
          <article className="price-card">
            <span className="price-tag">SELF-SERVE</span>
            <h3>API access</h3>
            <p className="price-lead">For developers building the experience inside their own product.</p>
            <ul>
              <li>✓ Address autocomplete</li>
              <li>✓ Property resolution</li>
              <li>✓ Plan-based data access</li>
              <li>✓ Developer documentation</li>
            </ul>
            <a className="button ghost large" href={rapidApiUrl} target="_blank" rel="noreferrer">View API options →</a>
          </article>
          <article className="price-card primary-card">
            <span className="price-tag">CUSTOM</span>
            <h3>Instant value experience</h3>
            <p className="price-lead">For teams that want a conversion-ready value flow matched to their brand.</p>
            <ul>
              <li>✓ Branded customer journey</li>
              <li>✓ Value + confidence presentation</li>
              <li>✓ Qualification and lead routing</li>
              <li>✓ Implementation support</li>
            </ul>
            <a className="button primary large" href={calendlyUrl} target="_blank" rel="noreferrer">Design my value flow →</a>
          </article>
          <article className="price-card">
            <span className="price-tag">CUSTOM + RULES</span>
            <h3>Instant offer engine</h3>
            <p className="price-lead">For acquisition teams applying approved rules to a property value.</p>
            <ul>
              <li>✓ Customer-defined offer model</li>
              <li>✓ Market + asset eligibility</li>
              <li>✓ Disclosures and next actions</li>
              <li>✓ CRM or webhook handoff</li>
            </ul>
            <a className="button ghost large" href={calendlyUrl} target="_blank" rel="noreferrer">Scope an offer flow →</a>
          </article>
        </div>
      </section>

      <section className="section faq">
        <div className="faq-heading">
          <div className="eyebrow"><i /> FREQUENT QUESTIONS.</div>
          <h2>What teams usually ask before they build.</h2>
          <p>Need a different response shape, eligibility flow, or handoff? That is exactly what the implementation conversation is for.</p>
          <a className="text-link" href={calendlyUrl} target="_blank" rel="noreferrer">Talk through your use case →</a>
        </div>
        <div className="faq-list">
          {[
            ["How is this different from ordinary address autocomplete?", "Ordinary autocomplete returns a formatted location. This workflow uses the selected address to resolve a property identity, attach approved real-estate data, and return a value or next decision."],
            ["Is the value returned in real time?", "The customer experience can respond immediately after a canonical selection. The result is based on the valuation data and source contract configured for the deployment—not a fabricated client-side estimate."],
            ["How is an instant offer calculated?", "The offer layer uses customer-approved rules such as value basis, eligibility, repairs, fees, market, and asset type. The calculator on this page is an illustrative model, not production underwriting."],
            ["Can we use our own branding and lead flow?", "Yes. The interface, language, qualification questions, disclosures, calls to action, and handoff can be matched to the customer experience."],
            ["Can developers use only the API?", "Yes. Teams can use self-serve API access or discuss a custom contract and integration when the workflow needs additional data, response fields, or decision logic."],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<span>+</span></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-grid" />
        <div>
          <div className="eyebrow"><i /> AUTOCOMPLETE TO ACTION.</div>
          <h2>Make the address field the beginning of the experience.</h2>
          <p>Resolve the property. Return the value. Customize the next move.</p>
        </div>
        <div className="final-actions">
          <a className="button primary large" href={calendlyUrl} target="_blank" rel="noreferrer">Build my flow →</a>
          <a className="button dark-ghost large" href={rapidApiUrl} target="_blank" rel="noreferrer">Start with the API</a>
        </div>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="PropData Instant Value home">
          <span className="brand-mark">PD</span>
          <span className="brand-copy"><b>PropData</b><small>INSTANT VALUE</small></span>
        </a>
        <p>Property intelligence for the moment of intent.</p>
        <div><a href="#workflow">How it works</a><a href="#customize">Customize</a><a href="#developers">Developers</a><a href="#pricing">Pricing</a></div>
      </footer>
    </main>
  );
}
