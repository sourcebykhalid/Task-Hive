import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Reveal from "./Reveal";

export function About() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <Reveal>
      <div className=" px-6 md:px-14 pt-5">
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            What is Task Hive App?
          </AccordionHeader>
          <AccordionBody className="bg-gradient-to-r from-yellow-100 to-gray-700 text-gray-900 p-8 border-b-4 rounded-sm border-black">
            This Task Hive App is a simple and intuitive tool designed to help
            you organize your tasks efficiently. Whether it&apos;s personal
            goals, work projects, or daily errands, you can track everything in
            one place.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 2}>
          <AccordionHeader onClick={() => handleOpen(2)}>
            How to use the Task Hive App?
          </AccordionHeader>
          <AccordionBody className="bg-gradient-to-r from-yellow-100 to-gray-700 text-gray-900 p-8 border-b-4 rounded-sm border-black">
            Using the Task Hive App is easy. Add new tasks, edit existing ones,
            mark tasks as complete, and delete tasks you no longer need.
            Organize your day with just a few clicks and stay on top of your
            responsibilities.
          </AccordionBody>
        </Accordion>
        <Accordion open={open === 3}>
          <AccordionHeader onClick={() => handleOpen(3)}>
            What features does this Task Hive App offer?
          </AccordionHeader>
          <AccordionBody className="bg-gradient-to-r from-yellow-100 to-gray-700 text-gray-900 p-8 border-b-4 rounded-sm border-black">
            This app includes features like task creation, editing, deleting,
            and marking tasks as complete. Additionally, you can filter tasks by
            their status (e.g., completed or pending) to focus on what matters
            most.
          </AccordionBody>
        </Accordion>
      </div>
    </Reveal>
  );
}
