import { motion } from "framer-motion";
import { Typography } from "@material-tailwind/react";
import { MdTask } from "react-icons/md";

const headingVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

function HeroHeading() {
  return (
    <div className="flex flex-col items-center justify-center  bg-gradient-to-r from-indigo-300 via-neutral-600 to-blue-500">
      <motion.div
        className="bg-gradient-to-r from-neutral-300 via-orange-600 to-blue-500 p-1 rounded-lg shadow-2xl max-w-3xl text-center"
        initial="hidden"
        animate="visible"
        variants={headingVariants}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Typography
          as="h1"
          variant="h1"
          className="text-gray-900 font-extrabold text-4xl md:text-6xl mb-1"
        >
          <span className=" flex justify-center items-center ">
            <MdTask className=" text-neutral-900 border-b-2 border-black rounded-lg" />{" "}
            Task Hive
          </span>
        </Typography>
        <Typography
          as="p"
          variant="lead"
          className="text-gray-700 text-lg md:text-xl"
        >
          Simplify your workflow and achieve more.
        </Typography>
      </motion.div>
    </div>
  );
}

export default HeroHeading;
