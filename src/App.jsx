import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, Container, Button, Grid, Card, CardContent, Avatar, Modal, Fade, IconButton } from "@mui/material";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

// Assets & Icons
import profileImg from "/ME.png"; 
import wolfImg from "/wolf-logo.png";
import { SiWolframlanguage, SiReact, SiNodedotjs, SiMongodb, SiExpress,  SiTailwindcss, SiSupabase, SiFramer, SiPython, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiVite, SiRedux } from "react-icons/si";
import { Github, Linkedin, Instagram, Globe, MoveUpRight, Stars, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

const WHATSAPP_NUMBER = "923294354771";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// 1. Infinite Marquee Data (For your Skills Section)
const row1 = [
  { name: "React", icon: <SiReact size={45} /> },
  { name: "Node.js", icon: <SiNodedotjs size={45} /> },
  { name: "MongoDB", icon: <SiMongodb size={45} /> },
  { name: "Express", icon: <SiExpress size={45} /> },
  { name: "Tailwind", icon: <SiTailwindcss size={45} /> },
  { name: "Framer", icon: <SiFramer size={45} /> },
  { name: "Python", icon: <SiPython size={45} /> },
  { name: "Supabase", icon: <SiSupabase size={45} /> },
];

const row2 = [
  { name: "TypeScript", icon: <SiTypescript size={45} /> },
  { name: "JavaScript", icon: <SiJavascript size={45} /> },
  { name: "HTML5", icon: <SiHtml5 size={45} /> },
  { name: "CSS3", icon: <SiCss3 size={45} /> },
  { name: "Vite", icon: <SiVite size={45} /> },
  { name: "Redux", icon: <SiRedux size={45} /> },
];

// 2. Minimalist Bento Styles (For the About Section)
const bentoCardStyle = {
  background: '#FFFFFF',
  borderRadius: '24px',
  border: '1px solid #EDEDED',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  height: '100%',
};

const grayscaleImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  filter: "grayscale(100%) contrast(1.1)",
};

// ============================================================
// CINEMATIC PROJECT MODAL COMPONENT
// ============================================================
function CinematicModal({ open, onClose, project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spotlight: always call hooks at top level (no conditionals)
  const spotlightXVal = useTransform(mouseX, (v) => v - 300);
  const spotlightYVal = useTransform(mouseY, (v) => v - 300);

  useEffect(() => {
    if (open) {
      setActiveIndex(0);
      setIsZoomed(false);
    }
  }, [open]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const screenshots = project?.screenshots || [];
  const total = screenshots.length;

  const stats = [
    { label: "Screens", value: total },
    { label: "Stack", value: "MERN" },
    { label: "Year", value: "2025" },
    { label: "Status", value: "Live" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={onClose}
        >
          {/* Backdrop with noise grain */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(6, 6, 8, 0.96)",
              backdropFilter: "blur(24px)",
            }}
          />

          {/* Animated ambient orbs */}
          <motion.div
            animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "10%",
              left: "15%",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{
              position: "absolute",
              bottom: "5%",
              right: "10%",
              width: 400,
              height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(123,123,123,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Main Modal Panel */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 60 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 280, mass: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            onMouseMove={handleMouseMove}
            ref={containerRef}
            style={{
              position: "relative",
              width: "94vw",
              maxWidth: 1180,
              maxHeight: "93vh",
              overflowY: "auto",
              background: "linear-gradient(160deg, #0e0e10 0%, #141416 50%, #0a0a0b 100%)",
              borderRadius: 28,
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 60px 120px rgba(0,0,0,0.9), 0 0 80px rgba(255,255,255,0.02)",
              overflow: "hidden",
            }}
          >
            {/* Cursor-tracked spotlight */}
            <motion.div
              style={{
                position: "absolute",
                width: 600,
                height: 600,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,0.035) 0%, transparent 65%)",
                pointerEvents: "none",
                x: spotlightXVal,
                y: spotlightYVal,
                zIndex: 0,
              }}
            />

            {/* Top chrome bar */}
            <Box
              sx={{
                position: "relative",
                zIndex: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: { xs: 3, md: 5 },
                pt: 4,
                pb: 3,
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Left: title block */}
              <Box>
                {/* LIVE badge */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.2 }}>
                  <motion.div
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#4eff91",
                      boxShadow: "0 0 8px #4eff91",
                    }}
                  />
                  <Typography sx={{ color: "#4eff91", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                    Live Project
                  </Typography>
                </Box>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15, duration: 0.6 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 900,
                      letterSpacing: "-1px",
                      fontSize: { xs: "1.8rem", md: "2.6rem" },
                      lineHeight: 1,
                      background: "linear-gradient(135deg, #ffffff 0%, #888888 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {project?.title}
                  </Typography>
                </motion.div>
              </Box>

              {/* Right: stats pills + close */}
              <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, md: 3 } }}>
                {/* Stat chips – desktop only */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1.5 }}>
                  {stats.map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: -12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                    >
                      <Box
                        sx={{
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: "50px",
                          px: 2,
                          py: 0.7,
                          backdropFilter: "blur(8px)",
                          textAlign: "center",
                        }}
                      >
                        <Typography sx={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", lineHeight: 1.2 }}>
                          {s.value}
                        </Typography>
                        <Typography sx={{ color: "#555", fontSize: "0.65rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                          {s.label}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </Box>

                {/* Close button */}
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  onClick={onClose}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#aaa",
                    flexShrink: 0,
                  }}
                >
                  <CloseIcon sx={{ fontSize: 20 }} />
                </motion.button>
              </Box>
            </Box>

            {/* HERO FEATURED IMAGE */}
           {/* HERO FEATURED IMAGE / VIDEO */}
<Box sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 5 }, pt: 4 }}>
  <motion.div
    key={activeIndex}
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    style={{ position: "relative", borderRadius: 20, overflow: "hidden" }}
  >
    {project?.video ? (
      // VIDEO MODE
      <Box
        component="video"
        src={project.video}
        autoPlay
        muted
        loop
        playsInline
        onClick={() => setIsZoomed(true)}
        sx={{
          width: "100%",
          height: { xs: "auto", md: "520px" },
          objectFit: "cover",
          display: "block",
          cursor: "zoom-in",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
    ) : (
      // IMAGE MODE (fallback for other projects)
      <Box
        component="img"
        src={screenshots[activeIndex]}
        alt={`${project?.title} screenshot ${activeIndex + 1}`}
        onClick={() => setIsZoomed(true)}
        sx={{
          width: "100%",
          height: { xs: "auto", md: "520px" },
          objectFit: "cover",
          display: "block",
          cursor: "zoom-in",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      />
    )}

    {/* Gradient overlay at bottom */}
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "40%",
        background: "linear-gradient(to top, rgba(10,10,11,0.85) 0%, transparent 100%)",
        borderRadius: "0 0 20px 20px",
        pointerEvents: "none",
      }}
    />

    {/* Counter overlay - hide if only one item */}
    {total > 1 && (
      <Box
        sx={{
          position: "absolute",
          bottom: 20,
          left: 24,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: "1.6rem", lineHeight: 1 }}>
          {String(activeIndex + 1).padStart(2, "0")}
        </Typography>
        <Box sx={{ width: 1, height: 28, background: "rgba(255,255,255,0.2)" }} />
        <Typography sx={{ color: "rgba(255,255,255,0.4)", fontWeight: 600, fontSize: "1rem" }}>
          {String(total).padStart(2, "0")}
        </Typography>
      </Box>
    )}

    {/* Zoom hint - change text for video */}
    <Box
      sx={{
        position: "absolute",
        bottom: 20,
        right: 24,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(8px)",
        borderRadius: "50px",
        px: 2,
        py: 0.6,
      }}
    >
      <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.1em" }}>
        {project?.video ? "CLICK TO ZOOM VIDEO" : "CLICK TO ZOOM"}
      </Typography>
    </Box>
  </motion.div>
</Box>

            {/* FILMSTRIP THUMBNAIL RAIL */}
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                px: { xs: 2, md: 5 },
                pt: 3,
                pb: 2,
                overflowX: "auto",
                "&::-webkit-scrollbar": { height: 4 },
                "&::-webkit-scrollbar-track": { background: "rgba(255,255,255,0.03)" },
                "&::-webkit-scrollbar-thumb": { background: "rgba(255,255,255,0.15)", borderRadius: 4 },
              }}
            >
              <Box sx={{ display: "flex", gap: 2, width: "max-content" }}>
                {screenshots.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    onClick={() => setActiveIndex(i)}
                    style={{ cursor: "pointer", flexShrink: 0, position: "relative" }}
                  >
                    <Box
                      component="img"
                      src={src}
                      alt={`thumb ${i + 1}`}
                      sx={{
                        width: { xs: 110, md: 160 },
                        height: { xs: 70, md: 100 },
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: activeIndex === i
                          ? "2px solid rgba(255,255,255,0.9)"
                          : "2px solid rgba(255,255,255,0.08)",
                        transition: "all 0.3s ease",
                        filter: activeIndex === i ? "none" : "brightness(0.45) grayscale(0.3)",
                        display: "block",
                      }}
                    />
                    {/* Active indicator dot */}
                    {activeIndex === i && (
                      <motion.div
                        layoutId="activeDot"
                        style={{
                          position: "absolute",
                          bottom: -10,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#fff",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </Box>
            </Box>

            {/* BOTTOM INFO ROW */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Box
                sx={{
                  position: "relative",
                  zIndex: 1,
                  px: { xs: 3, md: 5 },
                  pt: 3,
                  pb: 5,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  justifyContent: "space-between",
                  gap: 3,
                  borderTop: "1px solid rgba(255,255,255,0.05)",
                  mt: 2,
                }}
              >
                {/* Left: description */}
                <Box sx={{ maxWidth: 520 }}>
                  <Typography sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, fontSize: "1rem", mb: 0.8 }}>
                    Full-stack Admin Dashboard
                  </Typography>
                  <Typography sx={{ color: "#555", fontSize: "0.88rem", lineHeight: 1.7 }}>
                    Built with the MERN stack. Features real-time analytics, order management, user roles, and a responsive layout engineered for scale.
                  </Typography>

                  {/* Tech tags */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                    {["React", "Node.js", "MongoDB", "Express", "Tailwind"].map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.06 }}
                      >
                        <Box
                          sx={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            borderRadius: "50px",
                            px: 1.8,
                            py: 0.4,
                          }}
                        >
                          <Typography sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 600 }}>
                            {t}
                          </Typography>
                        </Box>
                      </motion.div>
                    ))}
                  </Box>
                </Box>

                {/* Right: CTA */}
                <Box sx={{ display: "flex", gap: 2, flexShrink: 0 }}>
                  {/* Navigate arrows */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <motion.button
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setActiveIndex((prev) => (prev - 1 + total) % total)}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                      }}
                    >
                      ←
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
                      whileTap={{ scale: 0.93 }}
                      onClick={() => setActiveIndex((prev) => (prev + 1) % total)}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        cursor: "pointer",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.1rem",
                        fontWeight: 700,
                      }}
                    >
                      →
                    </motion.button>
                  </Box>

                  {/* View project CTA */}
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(255,255,255,0.15)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      background: "#fff",
                      color: "#111",
                      border: "none",
                      borderRadius: "50px",
                      padding: "0 28px",
                      height: 48,
                      fontWeight: 800,
                      fontSize: "0.9rem",
                      cursor: "pointer",
                      letterSpacing: "-0.2px",
                      fontFamily: "Poppins, sans-serif",
                    }}
                  >
                    View Project
                    <span style={{ fontSize: "1rem" }}>↗</span>
                  </motion.button>
                </Box>
              </Box>
            </motion.div>
          </motion.div>

          {/* FULLSCREEN ZOOM OVERLAY */}
          <AnimatePresence>
            {isZoomed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsZoomed(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 10000,
                  background: "rgba(0,0,0,0.96)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "zoom-out",
                  padding: "2rem",
                }}
              >
                <motion.img
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  src={screenshots[activeIndex]}
                  alt="zoomed"
                  style={{
                    maxWidth: "95vw",
                    maxHeight: "92vh",
                    objectFit: "contain",
                    borderRadius: 16,
                    boxShadow: "0 40px 120px rgba(0,0,0,0.8)",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 24,
                    right: 24,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "50px",
                    px: 2.5,
                    py: 0.8,
                  }}
                >
                  <Typography sx={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em" }}>
                    ESC / CLICK TO CLOSE
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Floating shapes animation
  const floatVariants = {
    float: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  // Smooth scroll function
  const handleScroll = (id) => {
    const section = document.getElementById(id.toLowerCase().replace(" ", ""));
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Added for Experience cards
  const cardSpring = useSpring({
    from: { transform: "scale(0.9)", opacity: 0 },
    to: { transform: "scale(1)", opacity: 1 },
    config: { tension: 120, friction: 10 },
  });

  // navbar -> section id mapping and smooth scroll helper
  const navMap = {
    Home: "home",
    "About Me": "about",
    Portfolio: "experience",
    Services: "about",
  };

  const scrollToSection = (name) => {
    const id = navMap[name];
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  const experienceCards = [
    {
      id: 1,
      title: "Admin Dashboard",
      thumbnail: "/localhost_5173_.png",
      screenshots: [
        "/localhost_5173_.png",
        "/localhost_5173_dashboard.png",
        "/localhost_5173_contact.png",
        "/localhost_5173_Orderadmin.png",
      ]
    },
  {
    id: 2,
    title: "Airbnb Clone",
    thumbnail: "/airbnbn.png",
    screenshots: [
      "/airbn1.png",
      "/airbnb2.png",
      "/airbnb3.png",
      "/airbnb4.png",
    ],
    description: "Modern Airbnb-inspired booking platform with property listings, search filters, booking flow, and responsive design.",
    tech: ["React", "TypeScript", "Tailwind", "Framer Motion", "Vite"],
    year: "2025",
    status: "In Progress"
  },
    {
  id: 3,
  title: "Portfolio Showcase",
  thumbnail: "/portfolios.png",
  video: "/YUP.mp4",
  screenshots: ["/portfolios.png"],
},
    {
      id: 4,
      title: "Backend Development",
      img: "https://via.placeholder.com/300x220",
    },
  ];

  const experienceCards1 = [
    {
      id: 1,
      title: "LinkedIn ",
      img: "https://via.placeholder.com/300x220",
    },
  ];

  return (
    <>
      {/* outer column ensures footer sits at bottom */}
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        {/* ============================================================
            NAVBAR
        ============================================================ */}
        <Box
          component="nav"
          sx={{
            width: "auto",
            backgroundColor: "#F8F8F8",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2.5, md: 8 },
            py: 2.5,
            fontFamily: "Poppins, sans-serif",
            zIndex: 100,
            position: "relative",
          }}
        >
          {/* Logo + Icon */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <SiWolframlanguage size={38} color="#222222" />
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.2rem", md: "1.5rem" },
                color: "#222222",
                letterSpacing: "-0.3px",
              }}
            >
              S.Bukhari
            </Typography>
          </Box>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { md: 5 },
            }}
          >
            {["Home", "About Me", "Portfolio", "Services", "Blog"].map(
              (item) => (
                <Typography
                  key={item}
                  onClick={() => scrollToSection(item)}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? scrollToSection(item) : null
                  }
                  tabIndex={0}
                  role="button"
                  sx={{
                    fontWeight: 700,
                    color: "#222222",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "color 0.25s ease",
                    "&:hover": { color: "#7B7B7B" },
                    outline: "none",
                  }}
                >
                  {item}
                </Typography>
              ),
            )}
          </Box>

          {/* Desktop CTA Button */}
          <Button
            component="a"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            sx={{
              display: { xs: "none", md: "flex" },
              borderRadius: "50px",
              padding: "0.65rem 1.6rem",
              fontWeight: 700,
              fontSize: "1rem",
              backgroundColor: "#222222",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
              transition: "all 0.25s ease",
              "&:hover": { 
                backgroundColor: "#7B7B7B",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.15)"
              },
              textTransform: "none",
              letterSpacing: "0.2px",
            }}
          >
            Book a Call
          </Button>

          {/* Mobile: hamburger + CTA row */}
          <Box sx={{ display: { xs: "flex", md: "none" }, alignItems: "center", gap: 1.5 }}>
            {/* Mobile Book a Call button */}
            <Button
              component="a"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              sx={{
                borderRadius: "50px",
                padding: "0.45rem 1rem",
                fontWeight: 700,
                fontSize: "0.78rem",
                backgroundColor: "#222222",
                color: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                transition: "all 0.25s ease",
                "&:hover": { 
                  backgroundColor: "#7B7B7B",
                },
                textTransform: "none",
                letterSpacing: "0.2px",
                whiteSpace: "nowrap",
              }}
            >
              Book a Call
            </Button>

            {/* Hamburger Icon */}
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{
                color: "#222222",
                p: 0.5,
              }}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon sx={{ fontSize: 28 }} /> : <MenuIcon sx={{ fontSize: 28 }} />}
            </IconButton>
          </Box>
        </Box>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              style={{
                position: "relative",
                zIndex: 99,
                backgroundColor: "#F8F8F8",
                borderBottom: "1px solid #EDEDED",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  px: 3,
                  py: 2,
                  gap: 0,
                }}
              >
                {["Home", "About Me", "Portfolio", "Services", "Blog"].map(
                  (item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Typography
                        onClick={() => scrollToSection(item)}
                        sx={{
                          fontWeight: 700,
                          color: "#222222",
                          fontSize: "1.05rem",
                          cursor: "pointer",
                          py: 1.4,
                          borderBottom: index < 4 ? "1px solid #EDEDED" : "none",
                          transition: "color 0.2s ease",
                          "&:hover": { color: "#7B7B7B" },
                        }}
                      >
                        {item}
                      </Typography>
                    </motion.div>
                  )
                )}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* main content grows to push footer down */}
        <Box sx={{ flex: 1 }}>
          {/* ✅ Your Original Hero Section (Unchanged) */}
          <Box
            id="home"
            sx={{
              minHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F8F8F8",
              fontFamily: "Poppins, sans-serif",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Floating Shapes */}
            <motion.div
              variants={floatVariants}
              animate="float"
              style={{
                position: "absolute",
                top: "10%",
                left: "5%",
                width: 60,
                height: 60,
                borderRadius: "50%",
                backgroundColor: "#222222",
                opacity: 0.3,
              }}
            />
            <motion.div
              variants={floatVariants}
              animate="float"
              style={{
                position: "absolute",
                bottom: "15%",
                right: "10%",
                width: 100,
                height: 100,
                borderRadius: "50%",
                backgroundColor: "#7B7B7B",
                opacity: 0.2,
              }}
            />
            <motion.div
              variants={floatVariants}
              animate="float"
              style={{
                position: "absolute",
                top: "40%",
                right: "30%",
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#FFFFFF",
                opacity: 0.25,
              }}
            />

            {/* Main Container */}
            <Container
              maxWidth="lg"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 4.5,
                position: "relative",
                zIndex: 2,
                px: { xs: 3, md: 4 },
              }}
            >
              {/* Left Section */}
              <Box data-aos="fade-right" sx={{ flex: 1, minWidth: { xs: "100%", sm: "300px" } }}>
                {/* Counters */}
                <Box
                  sx={{
                    display: "flex",
                    gap: { xs: 4.5, md: 6.5 },
                    mb: 4.5,
                    flexWrap: "wrap",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: "#222222", lineHeight: 1.1, fontSize: { xs: "2rem", md: "3rem" } }}
                    >
                      <CountUp end={200} duration={3} />
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: "#7B7B7B", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        mt: 1,
                      }}
                    >
                      Projects Completed
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 700, color: "#222222", lineHeight: 1.1, fontSize: { xs: "2rem", md: "3rem" } }}
                    >
                      <CountUp end={12} duration={3} />
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: "#7B7B7B", 
                        fontWeight: 500,
                        fontSize: "0.95rem",
                        mt: 1,
                      }}
                    >
                      Satisfied Clients
                    </Typography>
                  </Box>
                </Box>

                {/* Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 900,
                      color: "#222222",
                      fontSize: {
                        xs: "2.4rem",
                        sm: "3.2rem",
                        md: "5rem",
                        lg: "6rem",
                      },
                      lineHeight: 1.08,
                      mb: 2.5,
                      letterSpacing: "-0.5px",
                    }}
                  >
                    Hello, I'm Shaheryar
                  </Typography>
                  <Typography
                    sx={{
                      color: "#7B7B7B",
                      fontSize: { xs: "1rem", md: "1.3rem" },
                      mb: 3.5,
                      fontWeight: 500,
                      lineHeight: 1.6,
                    }}
                  >
                    — A WEB Developer projects tailored by your imagination
                  </Typography>

                  <Button
                    component="a"
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    sx={{
                      borderRadius: "50px",
                      padding: "0.8rem 2.2rem",
                      fontWeight: 600,
                      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.11)",
                      backgroundColor: "#222222",
                      color: "#FFFFFF",
                      transition: "all 0.25s ease",
                      textTransform: "none",
                      fontSize: { xs: "0.9rem", md: "1rem" },
                      "&:hover": { 
                        backgroundColor: "#7B7B7B",
                        boxShadow: "0 10px 24px rgba(0, 0, 0, 0.14)"
                      },
                    }}
                  >
                    Hire Me
                  </Button>
                </motion.div>
              </Box>

              {/* Right Section */}
              <motion.div
                data-aos="fade-left"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                style={{
                  flex: 1,
                  minWidth: "280px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Box
                  component="img"
                  src={profileImg}
                  alt="Profile"
                  sx={{
                    borderRadius: 3,
                    width: { xs: "85%", sm: "375px", md: "420px" },
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "cover",
                    zIndex: 2,
                  }}
                />
                <motion.div
                  variants={floatVariants}
                  animate="float"
                  style={{
                    position: "absolute",
                    top: "-10%",
                    right: "-5%",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: "#7B7B7B",
                    opacity: 0.4,
                  }}
                />
              </motion.div>
            </Container>

            {/* Side Text - hidden on mobile to avoid overflow */}
            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                left: "1.5rem",
                top: "50%",
                transform: "rotate(-90deg) translateY(-50%)",
                color: "#7B7B7B",
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                fontWeight: 600,
              }}
            >
              WEB DEVELOPER
            </Typography>

            <Typography
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                right: "1.5rem",
                top: "2rem",
                color: "#7B7B7B",
                fontSize: "0.9rem",
                fontWeight: 600,
              }}
            >
              2025
            </Typography>
          </Box>
        </Box>

        {/* ===========================
          ABOUT ME SECTION
         =========================== */}
        <Box
          id="about"
          sx={{
            backgroundColor: "#F8F8F8",
            py: { xs: 8.5, md: 12.5 },
            px: { xs: 3, md: 8 },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Container maxWidth="xl">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: 3.5,
              }}
            >
              {/* Left Card */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ flex: 1 }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: "#222", mb: 2.5, letterSpacing: "-0.3px", fontSize: { xs: "1.5rem", md: "2rem" } }}
                >
                  About Me
                </Typography>
                <Typography sx={{ color: "#7B7B7B", lineHeight: 1.65, fontSize: { xs: "0.92rem", md: "0.98rem" } }}>
                  I'm a passionate Full Stack Web Developer specializing in the
                  MERN stack (MongoDB, Express.js, React, Node.js). I build
                  dynamic, user-focused web applications that balance clean
                  design with powerful functionality. From crafting responsive
                  front-end interfaces to developing robust back-end APIs, I
                  take pride in delivering seamless digital experiences that
                  solve real-world problems. I enjoy turning ideas into scalable
                  solutions and continuously improving my skills to stay ahead
                  in the ever-evolving tech landscape.
                </Typography>
              </motion.div>

              {/* Middle Card */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                style={{ flex: 1 }}
              >
                <Card
                  sx={{
                    px: 3,
                    textAlign: "center",
                    borderRadius: "20px",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
                    height: "100%",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.08)",
                    },
                  }}
                >
                  <Typography
                    sx={{ fontSize: { xs: "1.8rem", md: "2.2rem" }, fontWeight: 800, color: "#222", mb: 1.2, letterSpacing: "-0.3px" }}
                  >
                    350+
                  </Typography>
                  <Typography sx={{ color: "#7B7B7B", mb: 2.5, fontSize: "0.95rem", fontWeight: 500 }}>
                    Average time spent on projects
                  </Typography>
                  <Box
                    component="img"
                    src={wolfImg}
                    alt="Client Result"
                    sx={{
                      width: "100%",
                      borderRadius: "15px",
                      objectFit: "fit",
                      height: { xs: "260px", md: "400px" },
                    }}
                  />
                </Card>
              </motion.div>

              {/* Right Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ flex: 1 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    height: "100%",
                    ml: { xs: 0, md: "3rem" },
                  }}
                >
                  <animated.div
                    style={{
                      ...cardSpring,
                      width: "100%",
                      maxWidth: "280px",
                      height: "220px",
                      borderRadius: "20px",
                      overflow: "hidden",
                      position: "relative",
                      background: "linear-gradient(145deg, #222222, #7B7B7B)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                      transition: "transform 0.5s ease, box-shadow 0.5s ease",
                      flex: "0 0 auto",
                    }}
                    data-aos="fade-up"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 20px 40px rgba(0, 0, 0, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 10px 25px rgba(0, 0, 0, 0.3)";
                    }}
                  >
                    <Typography
                      sx={{
                        position: "absolute",
                        bottom: "1rem",
                        left: "1rem",
                        color: "#FFF",
                        fontWeight: 600,
                        fontSize: "1rem",
                        letterSpacing: "0.05em",
                        textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      {experienceCards1[0].title}
                    </Typography>
                  </animated.div>

                  <Typography sx={{ fontWeight: 600, color: "#222", fontSize: { xs: "0.95rem", md: "1rem" } }}>
                    With 2+ years of experience
                  </Typography>
                  <Typography sx={{ color: "#7B7B7B", lineHeight: 1.65, fontSize: { xs: "0.9rem", md: "0.95rem" } }}>
                    I specialize in creating intuitive, user-focused designs
                    that solve real-world problems and deliver seamless digital
                    experiences.
                  </Typography>

                  <Typography sx={{ fontWeight: 600, color: "#222", fontSize: { xs: "0.95rem", md: "1rem" } }}>
                    I thrive on collaboration
                  </Typography>
                  <Typography sx={{ color: "#7B7B7B", lineHeight: 1.65, fontSize: { xs: "0.9rem", md: "0.95rem" } }}>
                    I work closely with clients, blending creativity with
                    strategy to bring their vision to life through impactful,
                    thoughtful design.
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Container>
        </Box>

        {/* ===========================
          EXPERIENCE / DESIGN JOURNEY SECTION
         =========================== */}
        <Box
          id="experience"
          sx={{
            backgroundColor: "#F8F8F8",
            py: { xs: 8, md: 14 },
            px: { xs: 3, md: 8 },
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <Container maxWidth="lg" >
            <Grid container spacing={8} alignItems="center">
              {/* LEFT SIDE TEXT */}
              <Grid xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 800, color: "#222", mb: 3, letterSpacing: "-0.3px", fontSize: { xs: "1.5rem", md: "2rem" } }}
                  >
                    Experience
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ fontWeight: 600, color: "#7B7B7B", mb: 4, lineHeight: 1.4, letterSpacing: "-0.2px", fontSize: { xs: "1.3rem", md: "2rem" } }}
                  >
                    Explore My Design Journey
                  </Typography>
                  <Typography sx={{ color: "#7B7B7B", mb: 2, lineHeight: 1.75, fontSize: { xs: "0.92rem", md: "0.98rem" } }}>
                    Each project I take on is a step toward refining my approach
                    and deepening my understanding of human-centered design.
                    From strategy to execution, I focus on creating digital
                    experiences that feel intuitive, delightful, and purposeful.
                  </Typography>

                  <Box
                    sx={{
                      overflow: "hidden",
                      py: 8,
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                      my: 2,
                    }}
                  >
                    {/* Fog Overlays */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: 150,
                        height: "100%",
                        background:
                          "linear-gradient(90deg, #F8F8F8 20%, transparent 100%)",
                        zIndex: 2,
                        pointerEvents: "none",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: 150,
                        height: "100%",
                        background:
                          "linear-gradient(-90deg, #F8F8F8 20%, transparent 100%)",
                        zIndex: 2,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Row 1 */}
                    <motion.div
                      animate={{ x: [0, -1200] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 25,
                          ease: "linear",
                        },
                      }}
                      style={{ display: "flex", gap: "80px", width: "max-content" }}
                    >
                      {[...row1, ...row1, ...row1].map((skill, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            opacity: 0.5,
                            transition: "all 0.25s ease",
                            "&:hover": { opacity: 1, color: "#222", transform: "scale(1.04)" },
                          }}
                        >
                          {skill.icon}
                          <Typography
                            sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "-0.3px" }}
                          >
                            {skill.name}
                          </Typography>
                        </Box>
                      ))}
                    </motion.div>

                    {/* Row 2 */}
                    <motion.div
                      animate={{ x: [-1200, 0] }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          repeatType: "loop",
                          duration: 30,
                          ease: "linear",
                        },
                      }}
                      style={{ display: "flex", gap: "80px", width: "max-content" }}
                    >
                      {[...row2, ...row2, ...row2].map((skill, i) => (
                        <Box
                          key={i}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            opacity: 0.5,
                            transition: "all 0.25s ease",
                            "&:hover": { opacity: 1, color: "#222", transform: "scale(1.04)" },
                          }}
                        >
                          {skill.icon}
                          <Typography
                            sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "-0.3px" }}
                          >
                            {skill.name}
                          </Typography>
                        </Box>
                      ))}
                    </motion.div>
                  </Box>
                </motion.div>
              </Grid>

              {/* RIGHT SIDE IMAGE CARDS */}
              <Grid  className="experience-cards">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9 }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "3.8rem",
                    width: "100%",
                  }}
                >
                  {experienceCards.map((card) => (
                    <animated.div
                      key={card.id}
                      style={{
                        ...cardSpring,
                        flex: "1 1 calc(25% - 1.8rem)",
                        maxWidth: "280px",
                        minWidth: "220px",
                        height: "220px",
                        borderRadius: "20px",
                        overflow: "hidden",
                        position: "relative",
                        background: "linear-gradient(145deg, #222222, #7B7B7B)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
                        transition: "transform 0.5s ease, box-shadow 0.5s ease",
                        cursor: card.screenshots ? "pointer" : "default",
                      }}
                      data-aos="fade-up"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.3)";
                      }}
                      onClick={() => {
                        if (card.screenshots) {
                          setSelectedProject(card);
                          setOpen(true);
                        }
                      }}
                    >
                      <Typography
                        sx={{
                          position: "absolute",
                          bottom: "1rem",
                          left: "1rem",
                          color: "#FFF",
                          fontWeight: 600,
                          fontSize: "1rem",
                          letterSpacing: "0.05em",
                          textShadow: "0 2px 6px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {card.title}
                      </Typography>
                      {card.screenshots && (
                        <Typography
                          sx={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            color: "rgba(255,255,255,0.6)",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                          }}
                        >
                          View ↗
                        </Typography>
                      )}
                    </animated.div>
                  ))}
                </motion.div>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ===========================
         FOOTER SECTION
        =========================== */}
      </Box>

      <Box
        id="footer"
        sx={{
          backgroundColor: "#F8F8F8",
          textAlign: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Top Text */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#222222",
            mb: 2.5,
            fontSize: { xs: "1.5rem", md: "2.5rem" },
            letterSpacing: "-0.3px",
            pt: 8,
            px: { xs: 3, md: 0 },
          }}
        >
          Got a Vision? Let's Bring It to Life!
        </Typography>

        <Typography
          sx={{
            color: "#7B7B7B",
            mb: 4,
            fontSize: { xs: "0.95rem", md: "1.15rem" },
            maxWidth: "600px",
            mx: "auto",
            lineHeight: 1.7,
            px: { xs: 3, md: 0 },
          }}
        >
          I'm always excited to collaborate on new and innovative projects.
          Whether you're starting from scratch or refining an existing idea.
        </Typography>

        <Button
          component="a"
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          variant="text"
          sx={{
            color: "#222222",
            borderBottom: "1px solid #222222",
            borderRadius: 0,
            fontWeight: 600,
            transition: "all 0.25s ease",
            "&:hover": { color: "#7B7B7B", borderColor: "#7B7B7B" },
            mb: 8,
            textTransform: "none",
            fontSize: { xs: "0.95rem", md: "1rem" },
          }}
        >
          Book A Call ↗
        </Button>

        <Box
          sx={{
            backgroundColor: "#F8F8F8",
            textAlign: "center",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {/* Bottom Section */}
          <Box
            sx={{
              background: "linear-gradient(180deg, #111 0%, #000 100%)",
              color: "#fff",
              py: 6,
              px: { xs: 3, md: 10 },
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 3,
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* Nav Links */}
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 4 },
                flexWrap: "wrap",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              {["Home", "About", "Portfolio", "Services", "Blog"].map(
                (item) => (
                  <Typography
                    key={item}
                    onClick={() => handleScroll(item)}
                    sx={{
                      fontWeight: 500,
                      fontSize: { xs: "0.9rem", md: "1.05rem" },
                      cursor: "pointer",
                      position: "relative",
                      transition: "color 0.25s ease",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: 0,
                        height: "2px",
                        left: 0,
                        bottom: -4,
                        backgroundColor: "#7B7B7B",
                        transition: "width 0.25s ease",
                      },
                      "&:hover::after": { width: "100%" },
                      "&:hover": { color: "#7B7B7B" },
                    }}
                  >
                    {item}
                  </Typography>
                ),
              )}
            </Box>

            {/* Social Icons + Email */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 2, md: 3 },
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {[
                { Icon: Github, link: "https://github.com/VONKRUTOWSKI" },
                { Icon: Linkedin, link: "https://www.linkedin.com/in/syed-shaheryar-4b7228390/" },
                { Icon: Instagram, link: "https://instagram.com/yourusername" },
              ].map(({ Icon, link }, index) => (
                <motion.a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  style={{ color: "#EDEDED", transition: "color 0.25s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#7B7B7B")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#EDEDED")}
                >
                  <Icon size={22} />
                </motion.a>
              ))}

              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Shaheryarsyed750@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "0.85rem", md: "1.4rem" },
                    color: "#EDEDED",
                    letterSpacing: "0.5px",
                    transition: "color 0.25s ease",
                    "&:hover": { color: "#7B7B7B" },
                    wordBreak: "break-all",
                  }}
                >
                  syedshaheryarics@gmail.com
                </Typography>
              </a>
            </Box>
          </Box>

          {/* Copyright */}
          <Typography
            sx={{
              pb: 3,
              color: "#7B7B7B",
              fontSize: "0.9rem",
              bgcolor: "black",
            }}
          >
            © {new Date().getFullYear()} Shaheryar Bukhari — All Rights Reserved.
          </Typography>
        </Box>
      </Box>

      {/* ============================================================
          CINEMATIC MODAL — replaces old Modal
         ============================================================ */}
      <CinematicModal
        open={open}
        onClose={() => setOpen(false)}
        project={selectedProject}
      />
    </>
  );
}