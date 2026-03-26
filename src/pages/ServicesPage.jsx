import React from "react";
import CTASection from "../components/CTASection";
import { SERVICES } from "../data/siteData";

export default function ServicesPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Services</div>
          <h1>Advisory paths aligned with the move, not generic brokerage labels.</h1>
          <p>
            The page is structured to help the user immediately identify the advisory track that fits their actual decision.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container services-grid services-grid-large">
          {SERVICES.map((service) => (
            <article className="service-card large" key={service.slug}>
              <h2>{service.title}</h2>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="The right service path makes every later decision easier."
        body="Users do not need more options. They need a clearer route into the right one."
        primaryLabel="Browse Listings"
        primaryTo="/listings"
        secondaryLabel="Explore Markets"
        secondaryTo="/markets"
      />
    </>
  );
}
