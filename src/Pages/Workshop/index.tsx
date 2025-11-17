import { Empty, Skeleton } from "antd";
import type { WorkshopType } from "../../Types";
import Loader from "../../Components/Common/Loader";
import WorkshopCard from "../../Components/Workshop/WorkshopCard";
import { useAppSelector } from "../../Store/Hook";
import { useEffect } from "react";
import { ROUTES } from "../../Constants";
import { useNavigate } from "react-router-dom";

const Workshop = () => {
  const navigate = useNavigate();

  const workshop: WorkshopType[] = useAppSelector(
    (state) => state.workshops.AllWorkshop
  );
  const workshopLoading = useAppSelector(
    (state) => state.workshops.workshopLoading
  );
  const id = workshop[0]?._id ?? "";
  if (!workshopLoading && workshop.length === 1) {
    navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", id), {
      replace: true,
    });
  }

  //  Redirect safely
  useEffect(() => {
    if (!workshopLoading && workshop.length === 1) {
      navigate(ROUTES.WORKSHOP.DETAILS.replace(":id", id), {
        replace: true,
      });
    }
  }, [workshopLoading, workshop]);

  //  NOW handle early returns AFTER hooks
  if (workshopLoading) return <Loader />;
  if (!workshopLoading && workshop.length === 0)
    return (
      <div className="w-full h-screen  flex justify-center items-center">
        <Empty />
      </div>
    );

  return (
    <>
      <div className="container container-p">
        {workshop?.length !== 0 && (
          <>
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {workshopLoading
                ? [...Array(3)].map((_, i) => (
                    <Skeleton.Node
                      key={i}
                      active
                      style={{ width: "100%", height: 300, borderRadius: 15 }}
                    />
                  ))
                : workshop?.map((item: WorkshopType, index: number) => (
                    <WorkshopCard key={index} data={item} />
                  ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Workshop;
