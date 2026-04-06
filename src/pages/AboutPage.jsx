import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import { motion } from "framer-motion";
import { Box, Button, Chip } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const evidence = [
  {
    title: "Pipeline mindset",
    body: "More than $2B in pipeline assets should not sit quietly inside body copy. It signals a team that studies the market in motion, tracks opportunity before it becomes obvious, and helps clients move with sharper timing and stronger positioning.",
  },
  {
    title: "United culture",
    body: "KOLT’s culture is built on collaboration, diversity, accountability, and shared execution. The strongest teams combine young-market energy with veteran closing instincts to create better market coverage, stronger judgment, and more confident execution.",
  },
  {
    title: "Industrial fluency",
    body: "KOLT speaks the language of GTA commercial real estate with precision. Zoning categories, loading ratios, industrial condo conversions, lease-audit upside, site functionality, and vacancy risk are part of how opportunities are evaluated and client interests are protected.",
  },
];

const perspectiveCards = [
  {
    title: "Consultancy-first posture",
    body: "KOLT Realty approaches commercial real estate as a capital, positioning, and execution problem to be solved properly. That means understanding the capital stack, zoning bylaws, leasing risk, vacancy exposure, and the operational realities behind each asset.",
  },
  {
    title: "Boardroom and boots-on-ground credibility",
    body: "KOLT brings together boardroom-level strategy and site-level practicality. The team is as comfortable speaking through underwriting logic, portfolio direction, and investment posture as it is discussing loading geometry, bay utility, yard constraints, and site performance.",
  },
  {
    title: "Institutional rhythm",
    body: "The firm is built to feel credible with sophisticated investors, developers, landlords, and occupiers. The page should not read like a resume. It should read like a brokerage platform shaped by operators who understand how to present, advise, and close.",
  },
  {
    title: "Diversity with execution",
    body: "A united culture matters most when it translates into sharper decisions, broader market awareness, better collaboration, and stronger negotiation posture. KOLT’s culture is built to improve outcomes, not simply describe values.",
  },
];

const lensCards = [
  {
    title: "Boardroom lens",
    body: "Capital-markets discipline stays visible above the fold because it is part of how KOLT thinks. The team understands portfolio logic, investment strategy, acquisition posture, disposition framing, and the standards expected by sophisticated commercial users.",
  },
  {
    title: "Site lens",
    body: "Commercial credibility also has to hold up on-site. KOLT understands the dirt, the loading court, the turning radius, the shipping pattern, bay utility, and the operational friction that can make or break industrial performance in the field.",
  },
];

const missionCards = [
  {
    title: "Our Mission",
    body: "To unite culture and diversity in a way that drives insight, performance, and execution across every assignment. KOLT believes strong collaboration, open communication, and multiple points of view lead to better strategy and better results.",
  },
  {
    title: "Our Philosophy",
    body: "KOLT upholds quality, integrity, and accountability in every transaction. Real estate is not only about space, pricing, and contracts. It is also about people, timing, risk, and long-term consequence, which is why every assignment is approached with discipline and clear commercial judgment.",
  },
];

const serviceRows = [
  {
    title: "Investment Services & Leasing",
    body: "We advise on acquisitions, dispositions, leasing strategy, and commercial positioning across industrial, business, retail, and multi-family opportunities with a disciplined investment lens.",
  },
  {
    title: "Tenant Representation",
    body: "We support landlords and tenants through tailored leasing strategies built around real property requirements, market conditions, operational fit, and negotiation leverage.",
  },
  {
    title: "Advisory",
    body: "We deliver market insight, scrutiny, and strategic guidance that helps clients evaluate opportunity, reduce blind spots, and move with greater confidence.",
  },
];

const heroStats = [
  { value: 2, suffix: "B+", label: "Pipeline signal" },
  { value: 6, suffix: "+", label: "Priority corridors" },
  { value: 2, suffix: "", label: "Core lenses" },
];

function Card({ title, body, dark = false, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.015 }}
      className={[
        "rounded-[28px] border p-6 lg:p-7 transition-all duration-300",
        dark
          ? "border-white/10 bg-white/10 text-white shadow-[0_16px_48px_rgba(0,0,0,0.24)]"
          : "border-black/8 bg-white text-[#161616] shadow-[0_16px_48px_rgba(0,0,0,0.06)]",
      ].join(" ")}
    >
      <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
      <p className={`mt-4 text-base leading-8 ${dark ? "text-white/72" : "text-black/72"}`}>{body}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const heroCanvasRef = useRef(null);
  const heroWrapRef = useRef(null);
  const heroCopyRef = useRef(null);
  const statRefs = useRef([]);

  useEffect(() => {
    const mount = heroCanvasRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#161616");

    const camera = new THREE.PerspectiveCamera(
      48,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.05);
    const key = new THREE.PointLight(0xd6b98c, 5, 20);
    key.position.set(4, 5, 4);
    const rim = new THREE.PointLight(0x8b1e24, 2.5, 20);
    rim.position.set(-4, 1, -3);
    scene.add(ambient, key, rim);

    const group = new THREE.Group();
    scene.add(group);

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3.2, 1.15, 1.8),
      new THREE.MeshStandardMaterial({
        color: 0x1e1e1e,
        metalness: 0.35,
        roughness: 0.55,
      })
    );
    group.add(body);

    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.BoxGeometry(3.24, 1.19, 1.84)),
      new THREE.LineBasicMaterial({ color: 0xd6b98c })
    );
    group.add(edges);

    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.28, 0.7),
      new THREE.MeshStandardMaterial({
        color: 0x8b1e24,
        metalness: 0.2,
        roughness: 0.6,
      })
    );
    slab.position.set(0, 0.74, 0);
    group.add(slab);

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16, 24, 24),
      new THREE.MeshBasicMaterial({
        color: 0x3b3b3b,
        wireframe: true,
        transparent: true,
        opacity: 0.25,
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.15;
    scene.add(floor);

    let raf;
    const animate = () => {
      group.rotation.y += 0.007;
      group.rotation.x = Math.sin(Date.now() * 0.00055) * 0.06;
      floor.rotation.z += 0.0012;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    animate();
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-reveal",
        { y: 36, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );

      gsap.fromTo(
        heroWrapRef.current,
        { scale: 0.92, opacity: 0, rotate: -2 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.15, ease: "power3.out", delay: 0.15 }
      );

      statRefs.current.forEach((el, idx) => {
        if (!el) return;
        const target = Number(el.dataset.value || 0);
        const proxy = { value: 0 };
        gsap.to(proxy, {
          value: target,
          duration: 1.6,
          delay: 0.35 + idx * 0.1,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(proxy.value)}${el.dataset.suffix || ""}`;
          },
        });
      });
    }, heroCopyRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="overflow-hidden border-b border-black/8 bg-white">
        <div className="container-fluid mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7">
              <div ref={heroCopyRef} className="max-w-5xl">
                <div className="about-hero-reveal text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
                  About KOLT Realty
                </div>

                <h1 className="about-hero-reveal mt-4 max-w-[11ch] text-5xl font-semibold leading-[0.9] tracking-[-0.06em] lg:text-7xl">
                  Driven, informed, and built to execute in motion.
                </h1>

                <p className="about-hero-reveal mt-6 max-w-4xl text-lg leading-8 text-black/72 lg:text-xl">
                  KOLT Realty is a GTA commercial real estate brokerage built for landlords,
                  tenants, investors, developers, and owner-users who expect sharper thinking,
                  stronger execution, and market fluency that goes beyond what is publicly posted online.
                </p>

                <p className="about-hero-reveal mt-4 max-w-4xl text-lg leading-8 text-black/72">
                  We pair entrepreneurial urgency with disciplined advisory thinking to help clients
                  move through industrial, retail, land, and investment decisions with more clarity,
                  better positioning, and stronger outcomes.
                </p>

                <div className="about-hero-reveal mt-7 flex flex-wrap gap-2.5">
                  {["Industrial", "Retail", "Land", "Investment", "Owner-User", "GTA CRE"].map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      sx={{
                        backgroundColor: "#f4eee6",
                        border: "1px solid rgba(0,0,0,0.08)",
                        color: "#161616",
                        fontWeight: 700,
                        borderRadius: "999px",
                      }}
                    />
                  ))}
                </div>

                <div className="about-hero-reveal mt-10 flex flex-wrap gap-3">
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    sx={{
                      backgroundColor: "#161616",
                      color: "#fff",
                      borderRadius: "999px",
                      px: 3,
                      py: 1.4,
                      textTransform: "none",
                      fontWeight: 700,
                      boxShadow: "none",
                      "&:hover": { backgroundColor: "#000", boxShadow: "none" },
                    }}
                  >
                    Contact KOLT Realty
                  </Button>
                  <Button
                    component={Link}
                    to="/services"
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(0,0,0,0.12)",
                      color: "#161616",
                      borderRadius: "999px",
                      px: 3,
                      py: 1.4,
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                  >
                    View Services
                  </Button>
                </div>

                <div className="about-hero-reveal mt-10 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                  {heroStats.map((stat, index) => (
                    <Box
                      key={stat.label}
                      className="rounded-[22px] border border-black/8 bg-[#faf7f2] p-4"
                    >
                      <div
                        ref={(el) => (statRefs.current[index] = el)}
                        data-value={stat.value}
                        data-suffix={stat.suffix}
                        className="text-3xl font-semibold tracking-[-0.05em]"
                      >
                        0
                      </div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
                        {stat.label}
                      </div>
                    </Box>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div ref={heroWrapRef} className="relative">
                <div className="rounded-[34px] border border-black/8 bg-[#111] p-3 shadow-[0_28px_90px_rgba(0,0,0,0.22)]">
                  <div ref={heroCanvasRef} className="h-[420px] w-full overflow-hidden rounded-[26px]" />
                </div>
                <div className="absolute bottom-5 left-5 rounded-[22px] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md">
                  <div className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/60">
                    Boardroom + Site Lens
                  </div>
                  <div className="mt-2 max-w-[240px] text-sm leading-6 text-white/85">
                    Strategy, pipeline logic, zoning fluency, loading practicality, and real field-read credibility.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#f6f3ee]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Positioning
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              A commercial real estate platform built to advise and execute.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-black/72">
              KOLT Realty approaches commercial real estate as a capital, positioning,
              and execution problem to be solved properly. That means understanding the
              capital stack, zoning bylaws, leasing risk, vacancy exposure, and the operational realities behind each asset.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {perspectiveCards.map((item, index) => (
              <Card key={item.title} title={item.title} body={item.body} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Market evidence
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Credibility should read clearly on the page.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {evidence.map((item, index) => (
              <Card key={item.title} title={item.title} body={item.body} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
              Perspective
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Credible in the boardroom and credible on-site.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {lensCards.map((item, index) => (
              <Card key={item.title} title={item.title} body={item.body} dark index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Mission and philosophy
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Culture with execution.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {missionCards.map((item, index) => (
              <Card key={item.title} title={item.title} body={item.body} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              What we do
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Commercial strategy backed by execution.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serviceRows.map((item, index) => (
              <Card key={item.title} title={item.title} body={item.body} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-white/10 bg-white/10 p-8 shadow-[0_26px_80px_rgba(0,0,0,0.26)] lg:p-10"
          >
            <div className="max-w-4xl">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Closing statement
              </div>
              <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
                Credible in the boardroom. Credible on-site. Credible in execution.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                KOLT Realty strives to exceed expectations with high ethical standards,
                sharp market awareness, and smart, creative strategies designed to win strong results.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/72">
                We are building a commercial real estate platform that feels credible in the boardroom,
                credible on-site, and credible where it matters most: in the quality of execution clients receive.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "999px",
                  px: 3,
                  py: 1.4,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#f2f2f2", boxShadow: "none" },
                }}
              >
                Contact KOLT Realty
              </Button>
              <Button
                component={Link}
                to="/services"
                variant="outlined"
                sx={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  borderRadius: "999px",
                  px: 3,
                  py: 1.4,
                  textTransform: "none",
                  fontWeight: 700,
                }}
              >
                View Services
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}