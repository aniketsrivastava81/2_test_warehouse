import React, { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import gsap from "gsap";
import anime from "animejs";
import { motion } from "framer-motion";
import { Box, Button, Chip, Container, Stack } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "hover.css/css/hover.css";
import "magic.css/dist/magic.min.css";
import "motion-ui/dist/motion-ui.min.css";

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
    body: "The firm is built to feel credible with sophisticated investors, developers, landlords, and occupiers. This page should not read like a resume. It should read like a brokerage platform shaped by operators who understand how to present, advise, and close.",
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

function InfoCard({ title, body, dark = false, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay }}
      className={[
        "group rounded-[28px] border p-6 lg:p-7 transition-all duration-300",
        dark
          ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
          : "border-black/8 bg-white text-[#161616] shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1",
        "hvr-float-shadow",
        "transition-in slide-in-up duration-500",
      ].join(" ")}
    >
      <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
      <p className={`mt-4 text-base leading-8 ${dark ? "text-white/72" : "text-black/72"}`}>{body}</p>
    </motion.div>
  );
}

export default function AboutPage() {
  const hero3DRef = useRef(null);
  const sceneWrapRef = useRef(null);
  const heroCopyRef = useRef(null);
  const statsRef = useRef([]);
  const borderRefs = useRef([]);

  const chips = useMemo(
    () => ["Industrial", "Retail", "Land", "Investment", "Owner-User", "GTA CRE"],
    []
  );

  useEffect(() => {
    if (!hero3DRef.current) return;

    const mount = hero3DRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#161616");

    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.8, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#ffffff", 0.9);
    scene.add(ambient);

    const point = new THREE.PointLight("#ffffff", 1.2, 100);
    point.position.set(5, 6, 6);
    scene.add(point);

    const group = new THREE.Group();
    scene.add(group);

    const geo = new THREE.BoxGeometry(2.8, 1.2, 1.6, 4, 2, 3);
    const edges = new THREE.EdgesGeometry(geo);
    const line = new THREE.LineSegments(
      edges,
      new THREE.LineBasicMaterial({ color: "#d6b98c" })
    );
    group.add(line);

    const floorGeo = new THREE.PlaneGeometry(14, 14, 20, 20);
    const floorMat = new THREE.MeshBasicMaterial({
      color: "#262626",
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.25;
    scene.add(floor);

    const resize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    let frameId;
    const tick = () => {
      group.rotation.y += 0.0045;
      floor.rotation.z += 0.0008;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      geo.dispose();
      edges.dispose();
      floorGeo.dispose();
      floorMat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (sceneWrapRef.current) {
      gsap.fromTo(
        sceneWrapRef.current,
        { y: 30, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
      );
    }

    if (heroCopyRef.current) {
      gsap.fromTo(
        heroCopyRef.current.querySelectorAll(".gsap-stagger"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    }

    const validStats = statsRef.current.filter(Boolean);
    validStats.forEach((node, i) => {
      const target = Number(node.dataset.value || 0);
      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: target,
        duration: 1.6 + i * 0.2,
        ease: "power2.out",
        delay: 0.45,
        onUpdate: () => {
          node.textContent = `${Math.round(proxy.value)}${node.dataset.suffix || ""}`;
        },
      });
    });
  }, []);

  useEffect(() => {
    if (!heroCopyRef.current) return;

    anime({
      targets: heroCopyRef.current.querySelectorAll(".anime-line"),
      translateY: [22, 0],
      opacity: [0, 1],
      delay: anime.stagger(110, { start: 150 }),
      duration: 800,
      easing: "easeOutExpo",
    });

    if (borderRefs.current.length) {
      anime({
        targets: borderRefs.current.filter(Boolean),
        boxShadow: [
          "0 0 0 rgba(139,30,36,0)",
          "0 0 0 1px rgba(139,30,36,0.15), 0 16px 50px rgba(0,0,0,0.08)",
        ],
        translateY: [10, 0],
        opacity: [0, 1],
        delay: anime.stagger(90, { start: 320 }),
        duration: 900,
        easing: "easeOutCubic",
      });
    }
  }, []);

  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/8 bg-white overflow-hidden">
        <Container maxWidth="xl" className="px-6 lg:px-10">
          <div className="row align-items-center min-h-[720px] py-16 lg:py-24">
            <div className="col-12 col-lg-7">
              <div ref={heroCopyRef} className="max-w-4xl">
                <div className="gsap-stagger anime-line text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
                  About KOLT Realty
                </div>

                <h1 className="gsap-stagger anime-line animate__animated animate__fadeInUp mt-4 max-w-[12ch] text-5xl font-semibold leading-[0.9] tracking-[-0.06em] lg:text-7xl">
                  Driven, informed, and built to execute in motion.
                </h1>

                <p className="gsap-stagger anime-line mt-6 max-w-4xl text-lg leading-8 text-black/72 lg:text-xl">
                  KOLT Realty is a GTA commercial real estate brokerage built for landlords,
                  tenants, investors, developers, and owner-users who expect sharper thinking,
                  stronger execution, and market fluency that goes beyond what is publicly posted online.
                </p>

                <p className="gsap-stagger anime-line mt-4 max-w-4xl text-lg leading-8 text-black/72">
                  We pair entrepreneurial urgency with disciplined advisory thinking to help clients
                  move through industrial, retail, land, and investment decisions with more clarity,
                  better positioning, and stronger outcomes.
                </p>

                <Stack
                  direction="row"
                  useFlexGap
                  flexWrap="wrap"
                  spacing={1.2}
                  className="gsap-stagger mt-7"
                >
                  {chips.map((chip) => (
                    <Chip
                      key={chip}
                      label={chip}
                      sx={{
                        borderRadius: "999px",
                        backgroundColor: "#f4eee6",
                        color: "#161616",
                        fontWeight: 600,
                        border: "1px solid rgba(0,0,0,0.07)",
                      }}
                    />
                  ))}
                </Stack>

                <div className="gsap-stagger mt-10 flex flex-wrap gap-3">
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    className="hvr-grow magic"
                    sx={{
                      backgroundColor: "#161616",
                      borderRadius: "999px",
                      px: 3,
                      py: 1.4,
                      textTransform: "none",
                      fontWeight: 700,
                      boxShadow: "none",
                      "&:hover": { backgroundColor: "#000" },
                    }}
                  >
                    Contact KOLT Realty
                  </Button>

                  <Button
                    component={Link}
                    to="/services"
                    variant="outlined"
                    className="hvr-sweep-to-right"
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

                <div className="gsap-stagger mt-10 grid max-w-3xl grid-cols-3 gap-4">
                  {[
                    { label: "Pipeline", value: 2, suffix: "B+" },
                    { label: "Core lenses", value: 2, suffix: "" },
                    { label: "Priority markets", value: 6, suffix: "+" },
                  ].map((stat, index) => (
                    <div
                      key={stat.label}
                      className="rounded-[22px] border border-black/8 bg-[#faf7f2] p-4"
                    >
                      <div
                        ref={(el) => (statsRef.current[index] = el)}
                        data-value={stat.value}
                        data-suffix={stat.suffix}
                        className="text-2xl font-semibold tracking-[-0.04em]"
                      >
                        0
                      </div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-5 mt-12 mt-lg-0">
              <motion.div
                ref={sceneWrapRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="magictime puffIn rounded-[32px] border border-black/8 bg-[#161616] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                  <div
                    ref={hero3DRef}
                    className="h-[420px] w-full rounded-[24px] overflow-hidden"
                  />
                </div>

                <Box
                  className="animate__animated animate__fadeInUp absolute bottom-5 left-5 rounded-[22px] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md"
                  sx={{ color: "#fff" }}
                >
                  <div className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/65">
                    Boardroom + Site Lens
                  </div>
                  <div className="mt-2 max-w-[220px] text-sm leading-6 text-white/82">
                    Strategic advisory above the fold. Operational fluency on the ground.
                  </div>
                </Box>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-black/8 bg-[#f6f3ee]">
        <Container maxWidth="xl" className="px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Positioning
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              A commercial real estate platform built to advise and execute.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-black/72">
              KOLT Realty approaches commercial real estate as a capital, positioning,
              and execution problem to be solved properly. That means understanding the
              capital stack, zoning bylaws, leasing risk, vacancy exposure, and the
              operational realities behind each asset.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {perspectiveCards.map((item, index) => (
              <div key={item.title} ref={(el) => (borderRefs.current[index] = el)}>
                <InfoCard title={item.title} body={item.body} delay={index * 0.05} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/8 bg-white">
        <Container maxWidth="xl" className="px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Market evidence
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Credibility should read clearly on the page.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {evidence.map((item, index) => (
              <InfoCard key={item.title} title={item.title} body={item.body} delay={index * 0.05} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/8 bg-[#161616] text-white">
        <Container maxWidth="xl" className="px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
              Perspective
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Credible in the boardroom and credible on-site.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {lensCards.map((item, index) => (
              <InfoCard
                key={item.title}
                title={item.title}
                body={item.body}
                dark
                delay={index * 0.06}
              />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/8 bg-[#efe8df]">
        <Container maxWidth="xl" className="px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Mission and philosophy
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Culture with execution.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {missionCards.map((item, index) => (
              <InfoCard key={item.title} title={item.title} body={item.body} delay={index * 0.05} />
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-black/8 bg-white">
        <Container maxWidth="xl" className="px-6 py-16 lg:px-10 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              What we do
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Commercial strategy backed by execution.
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serviceRows.map((row, index) => (
              <InfoCard key={row.title} title={row.title} body={row.body} delay={index * 0.05} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#161616] text-white">
        <Container maxWidth="xl" className="px-6 py-16 lg:px-10 lg:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-white/10 bg-white/5 p-8 lg:p-10 transition-in slide-in-up duration-700"
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
                className="hvr-grow"
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  borderRadius: "999px",
                  px: 3,
                  py: 1.4,
                  textTransform: "none",
                  fontWeight: 700,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#f3f3f3" },
                }}
              >
                Contact KOLT Realty
              </Button>
              <Button
                component={Link}
                to="/services"
                variant="outlined"
                className="hvr-sweep-to-right"
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
        </Container>
      </section>
    </main>
  );
}