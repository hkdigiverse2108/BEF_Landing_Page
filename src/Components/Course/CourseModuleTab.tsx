import { useEffect } from "react";
import { useGetApiQuery } from "../../Api/CommonApi";
import { URL_KEYS } from "../../Constants";
import type { ModuleType } from "../../Types";
import { Empty } from "antd";
import { useAppDispatch } from "../../Store/Hook";
import { setModalVideoLink, setModalVideoPlay } from "../../Store/Slices/VideoModalSlice";
import Aos from "aos";

interface CourseModuleTabProps {
  id?: string;
  modules?: ModuleType[];
  isLoading?: boolean;
}

const CourseModuleTab = ({ id, modules, isLoading: externalLoading }: CourseModuleTabProps) => {
  const dispatch = useAppDispatch();

  // If modules were already fetched by parent (CourseDetails), use them; otherwise fetch
  const hasExternalModules = Array.isArray(modules) && modules.length > 0;
  const { data: ModulesData, isLoading: fetchLoading } = useGetApiQuery(
    {
      url: `${URL_KEYS.MODULE.ALL}?courseFilter=${id}`,
    },
    { skip: hasExternalModules || !id }
  );

  const Modules = hasExternalModules
    ? (modules as ModuleType[])
    : ModulesData?.data?.module_data || [];

  const isLoading = hasExternalModules ? !!externalLoading : fetchLoading;

  useEffect(() => {
    try {
      Aos.refresh();
    } catch {
      // Ignore AOS refresh if not initialized
    }
  }, [Modules]);

  if (isLoading && (!Modules || Modules.length === 0)) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#124699] border-t-transparent" />
      </div>
    );
  }

  if (Modules?.length === 0) {
    return (
      <div className="py-12 bg-gray-50 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center p-6 my-4">
        <Empty description="No modules available for this course yet." />
      </div>
    );
  }

  return (
    <div className="space-y-4 max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
      {Modules?.map((module: ModuleType) => (
        <div
          key={module._id}
          className="flex max-sm:flex-col gap-4 bg-white rounded-xl p-4 sm:p-5 border border-gray-200 hover:border-[#124699]/40 hover:shadow-md transition-all duration-200 max-sm:items-start max-sm:w-full w-full"
        >
          <figure
            className="sm:w-1/2 lg:w-auto relative cursor-pointer group shrink-0 overflow-hidden rounded-lg bg-gray-100"
            onClick={() => {
              if (module?.link) {
                dispatch(setModalVideoPlay(true));
                dispatch(setModalVideoLink(module?.link));
              }
            }}
            title={module?.link ? "Click to watch module overview video" : module.name}
          >
            <img
              src={module.image}
              alt={module.name || "Module"}
              className="min-w-24 max-h-90 max-w-90 sm:max-w-72 w-full h-auto sm:w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {module?.link && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-90 group-hover:bg-black/40 group-hover:opacity-100 transition-all rounded-lg">
                <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center text-[#124699] shadow-lg group-hover:scale-110 transition-transform">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}
          </figure>

          {/* Content */}
          <div className="sm:w-full lg:w-auto flex flex-col sm:py-2 gap-4 justify-between max-sm:max-w-full grow">
            {/* Tags */}
            <div className="flex flex-col gap-1.5">
              <span className="sm:text-xl font-bold text-gray-900">{module.name}</span>
              <h2 className="text-xs sm:text-sm text-gray-600 leading-relaxed">{module.subTitle}</h2>
            </div>
            <div className="flex items-center gap-6 pt-2 border-t border-gray-100">
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-xl sm:text-2xl text-success font-black">{module.totalLecture}</span>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Lectures</span>
              </p>
              <span className="border-r border-gray-200 h-8"></span>
              <p className="flex flex-col text-gray-600 text-xs font-medium sm:text-sm">
                <span className="text-xl sm:text-2xl text-success font-black">{module.totalTest}</span>
                <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Tests</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseModuleTab;
