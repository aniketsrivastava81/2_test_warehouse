import React from "react";

const VIDEOS = [
  {
    title: "Investor review clip",
    quote: "Sample branded video showing how an underwriting-oriented testimonial block would look on the live site.",
    byline: "Sample investor case clip",
    src: "/videos/testimonial-investor.mp4",
  },
  {
    title: "Owner-user review clip",
    quote: "Sample branded video showing the owner-user voice layer without inventing a real testimonial quote.",
    byline: "Sample owner-user case clip",
    src: "/videos/testimonial-owner-user.mp4",
  },
  {
    title: "Developer review clip",
    quote: "Sample branded video demonstrating how a developer-facing trust section can feel more alive than static text blocks.",
    byline: "Sample developer case clip",
    src: "/videos/testimonial-developer.mp4",
  },
];

export default function VideoTestimonials() {
  return (
    <section className="video-testimonials">
      <div className="video-testimonials__header">
        <div>
          <div className="eyebrow">Video testimonial layer</div>
          <h2>Trust feels more credible when proof has motion.</h2>
        </div>
        <p>These are sample branded clips for the demo build - a cleaner placeholder than invented quotes and a stronger visual layer than dead testimonial cards.</p>
      </div>
      <div className="video-testimonials__grid">
        {VIDEOS.map((item) => (
          <article key={item.title} className="video-testimonials__card">
            <video controls preload="metadata" muted playsInline>
              <source src={item.src} type="video/mp4" />
            </video>
            <h3>{item.title}</h3>
            <p>{item.quote}</p>
            <span>{item.byline}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
