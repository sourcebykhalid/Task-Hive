import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Reveal({ children, width = "100%" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  const overlayControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
      overlayControls.start("visible");
    }
  }, [isInView, mainControls, overlayControls]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        width,
        overflow: "hidden", // Hide overflowing elements
        zIndex: 1,
      }}
    >
      {/* Fading Background Overlay Animation */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 1.1 },
          visible: { opacity: 0.7, scale: 1 },
        }}
        initial="hidden"
        animate={overlayControls}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 left-0 right-0 z-0 bg-gradient-to-r from-yellow-200 via-cyan-200 to-cyan-600"
      ></motion.div>

      {/* Main Content Animation */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20, scale: 0.95 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="relative z-10" // Ensure content is above the background
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Reveal;
