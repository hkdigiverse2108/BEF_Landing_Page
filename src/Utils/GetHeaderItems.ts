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
    { Title: "Workshop", link: workshopLink },
    {
      Title: "Course",
      link: ROUTES.COURSE.COURSE,
    },
    // {
    //   Title: "Download Now",
    //   child: [
    //     { Title: "Android App", link: "" },
    //     { Title: "IOS App", link: "" },
    //   ],
    // },
  ];
};
