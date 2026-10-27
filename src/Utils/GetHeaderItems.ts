import { ROUTES } from "../Constants";
import { useAppSelector } from "../Store/Hook";
import type { WorkshopType } from "../Types";

export const getHeaderItems = () => {
  const workshop: WorkshopType[] = useAppSelector((state) => state.workshops.AllWorkshop);

  let workshopLink = ROUTES.WORKSHOP.WORKSHOP;

  if (workshop?.length === 1) {
    const id = workshop[0]?._id ?? "";
    workshopLink = ROUTES.WORKSHOP.DETAILS.replace(":id", id);
  }

  return [
    { Title: "Free Mock Test", link: ROUTES.FREE_PRACTICE },
    { Title: "PYQs", link: ROUTES.PYQ },
    { Title: "Course", link: ROUTES.COURSE.COURSE },
    { Title: "Workshop", link: workshopLink },
    // { Title: "Download Now", link: APP_LINKS },
  ];
};
