// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";


const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

const AnimatedPage = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={pageTransition}
  
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
