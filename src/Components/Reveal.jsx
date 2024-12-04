import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Reveal({ children, width = "100%" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      slideControls.start("visible");
    }
  }, [isInView, mainControls, slideControls]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "visible", // Allow child dropdowns to render outside
        zIndex: "auto",
      }}
    >
      {/* Main Content Animation */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 70 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Sliding Background Animation */}
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-yellow-200 via-cyan-200 to-cyan-600 pointer-events-none"
      ></motion.div>
    </div>
  );
}

export default Reveal;
