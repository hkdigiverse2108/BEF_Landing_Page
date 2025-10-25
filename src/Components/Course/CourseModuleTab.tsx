import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { ModuleType } from "../../Types";

const CourseModuleTab = ({ id }: { id?: string }) => {
  const { data: ModulesData } = useGetApiQuery({ url: `${URL_KEYS.MODULE.COURSE_WISE}${id}` });

  const Modules = ModulesData?.data;
  
  return (
    <div className="space-y-4" data-aos="fade-up">
      {Modules?.map((module: ModuleType) => (
        <a href={module?.link} target="_blank" rel="noopener noreferrer" key={module._id} className="flex max-sm:flex-col gap-4 bg-white rounded-lg p-4  border border-gray-200 max-sm:items-center ">
          <img src={module.image} alt={"img"} className="w-fit h-50 sm:w-50 sm:h-full rounded-lg object-cover" />

          {/* Content */}
          <div className="flex flex-col sm:py-3 gap-5 justify-between ">
            {/* Tags */}
            <div className="flex flex-col gap-2 ">
              <span className="text-xl font-semibold">{module.name}</span>
              <h2 className="text-sm text-gray-700">{module.subTitle}</h2>
            </div>
            <div className="flex  gap-6">
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-3xl text-success font-semibold">{module.totalLecture}</span>
                <span>lectures </span>
              </p>
              <span className="border border-gray-200"></span>
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-3xl text-success font-semibold">{module.totalTest}</span>
                <span>Tests </span>
              </p>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default CourseModuleTab;
