import React from "react";
import CTASection from "../components/CTASection";

const serviceBlocks = [
  {
    slug: "tenant-representation",
    title: "Tenant Representation",
    intro: "For occupiers who need space that works commercially on day one and strategically over time.",
    points: [
      "Translate operating requirements into a sharper shortlist.",
      "Compare occupancy cost, fit, capex, and access before negotiating.",
      "Protect flexibility, timing, and leverage through a cleaner search process.",
    ],
  },
  {
    slug: "landlord-representation",
    title: "Landlord Representation",
    intro: "For owners who want assets positioned with clearer market logic and stronger leasing intent.",
    points: [
      "Refine the asset story around demand, use case, and market fit.",
      "Strengthen listing quality, response quality, and absorption strategy.",
      "Align the space presentation with the tenant the asset should attract.",
    ],
  },
  {
    slug: "owner-user-acquisition",
    title: "Owner-User Acquisition",
    intro: "For businesses deciding whether ownership creates more value than another lease cycle.",
    points: [
      "Test control, equity, flexibility, and long-term occupancy economics together.",
      "Screen buildings for operational permanence and future optionality.",
      "Reduce the risk of buying a property that only solves the current moment.",
    ],
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    intro: "For capital that needs better underwriting context before conviction is formed.",
    points: [
      "Evaluate assets through tenant logic, corridor quality, and downside resilience.",
      "Compare opportunities based on durability, not just headline metrics.",
      "Focus attention on the assets with the strongest real hold thesis.",
    ],
  },
  {
    slug: "development-land",
    title: "Development Land Advisory",
    intro: "For groups assessing land, repositioning, and future-use opportunities across the GTA.",
    points: [
      "Prioritize corridor strength, access logic, and location context early.",
      "Screen opportunities through timing, use-case alignment, and long-range value.",
      "Bring discipline to opportunities that often look better than they are.",
    ],
  },
  {
    slug: "portfolio-positioning",
    title: "Portfolio Positioning",
    intro: "For clients reassessing what to hold, upgrade, lease, sell, or redeploy.",
    points: [
      "View each property through timing, capital allocation, and strategic role.",
      "Identify where asset performance and portfolio intent are no longer aligned.",
      "Turn scattered property decisions into a more coherent portfolio strategy.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner page-hero-premium">
          <div className="eyebrow">Services</div>
          <h1>Every advisory path is designed to reduce decision risk and increase commercial confidence.</h1>
          <p>
            Users should be able to see themselves in the right path immediately, understand what value they gain from it,
            and feel that KOLT has already made the decision easier before any conversation begins.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container services-grid services-grid-large">
          {serviceBlocks.map((service) => (
            <article className="service-card large service-card-premium" key={service.slug}>
              <h2>{service.title}</h2>
              <p>{service.intro}</p>
              <div className="principle-list compact-list">
                {service.points.map((point) => (
                  <div className="detail-point" key={point}>{point}</div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Once the right service path is clear, the rest of the site becomes dramatically more valuable."
        body="Continue into listings, tools, and market guidance built to support the same decision from every angle."
        primaryLabel="Browse Listings"
        primaryTo="/listings"
        secondaryLabel="Explore Tools"
        secondaryTo="/tools"
      />
    </>
  );
}
