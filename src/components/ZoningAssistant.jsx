import React from "react";

const MARKET_NOTES = {
  Toronto: "Downtown and inner-city searches need early clarity on parking assumptions, client access, and whether the use is actually office, retail, or mixed-use in practice.",
  Mississauga: "Airport-linked and western GTA searches usually turn on truck movement, industrial zoning fit, office ratio, and how strict the municipality is around outdoor storage.",
  Brampton: "Brampton screens often need a faster read on industrial condo rules, drive-in versus truck-level practicality, and whether trailer storage expectations are realistic.",
  Vaughan: "Vaughan often favours hybrid showroom, flex, and customer-facing industrial users, but the loading / frontage tradeoff matters early.",
  RichmondHill: "North GTA reviews often start with office, service-commercial, or light industrial screening, plus how tightly the bylaw limits heavier outside activity.",
};

function generateResponse({ market, useType, size, loading }) {
  const base = [];
  base.push(MARKET_NOTES[market] || "Start with market-specific zoning notes before tours.");

  if (useType === "industrial") {
    base.push("For industrial use, screen employment zoning, truck circulation, loading door allowances, parking ratios, and any limits on outside storage or heavier processing.");
  }
  if (useType === "office") {
    base.push("For office users, check whether the intended client traffic, signage, and after-hours access fit the use permissions and building rules.");
  }
  if (useType === "retail") {
    base.push("Retail screening should clarify signage rights, permitted merchandising, food or service use restrictions, and whether the bylaw splits destination retail from convenience retail.");
  }
  if (useType === "land") {
    base.push("Land searches should immediately test designation, servicing, frontage, environmental flags, and whether the municipality treats the parcel as protected employment land.");
  }

  if (Number(size) > 20000) {
    base.push("Because the size requirement is larger, add traffic circulation, turning radius, fire route, and expansion sequencing into the first pass rather than later in diligence.");
  }

  if (loading === "truck-level") {
    base.push("Truck-level loading adds a practical bylaw and circulation lens: dock count, apron depth, trailer manoeuvring, and whether the site can absorb peak shipping without operational conflict.");
  }

  return base.join(" ");
}

export default function ZoningAssistant() {
  const [form, setForm] = React.useState({ market: "Mississauga", useType: "industrial", size: "12000", loading: "truck-level" });
  const [messages, setMessages] = React.useState([
    { role: "assistant", text: "This AI zoning / bylaw assistant is a local demo for the KOLT site build. Use it to create a faster first-pass screen before legal or municipal confirmation." },
  ]);

  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const onSubmit = (event) => {
    event.preventDefault();
    const userText = `Need a ${form.useType} read in ${form.market} for about ${form.size || "an unspecified"} SF requirement with ${form.loading} assumptions.`;
    const assistantText = generateResponse(form);
    setMessages((prev) => [...prev, { role: "user", text: userText }, { role: "assistant", text: assistantText }]);
  };

  return (
    <section className="zoning-assistant">
      <div className="zoning-assistant__header">
        <div>
          <div className="eyebrow">AI zoning / bylaw chat assistant</div>
          <h2>Pressure-test the requirement before the first municipal rabbit hole.</h2>
        </div>
        <p>
          This is a guided demo layer - enough to make the site feel smarter and more consultative, without pretending to replace formal zoning review.
        </p>
      </div>

      <div className="zoning-assistant__grid">
        <form className="zoning-assistant__panel zoning-assistant__form" onSubmit={onSubmit}>
          <label>
            <span>Market</span>
            <select name="market" value={form.market} onChange={onChange}>
              <option>Toronto</option>
              <option>Mississauga</option>
              <option>Brampton</option>
              <option>Vaughan</option>
              <option>RichmondHill</option>
            </select>
          </label>
          <label>
            <span>Use type</span>
            <select name="useType" value={form.useType} onChange={onChange}>
              <option value="industrial">Industrial</option>
              <option value="office">Office</option>
              <option value="retail">Retail</option>
              <option value="land">Land / development</option>
            </select>
          </label>
          <label>
            <span>Approximate size</span>
            <input name="size" value={form.size} onChange={onChange} placeholder="12,000" />
          </label>
          <label>
            <span>Loading assumption</span>
            <select name="loading" value={form.loading} onChange={onChange}>
              <option value="truck-level">Truck-level</option>
              <option value="drive-in">Drive-in</option>
              <option value="none">No loading priority</option>
            </select>
          </label>
          <button type="submit" className="button button-primary">Generate screening note</button>
        </form>

        <div className="zoning-assistant__panel zoning-assistant__chat" aria-live="polite">
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`zoning-assistant__bubble zoning-assistant__bubble--${message.role}`}>
              <strong>{message.role === "assistant" ? "Assistant" : "You"}</strong>
              <p>{message.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
