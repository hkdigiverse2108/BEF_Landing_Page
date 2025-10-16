const SectionHeader = ({ title = "", desc = "", className = "" }) => {
  return (
    <div
      className={` container container-p flex flex-col justify-center items-center text-center ${className}`}
      data-aos="fade-up"
    >
      <h1 className="text-2xl md:text-[40px] font-bold text-primary mb-2">
        {title}
      </h1>
      <p className=" max-sm:text-sm max-w-xl ">{desc}</p>
    </div>
  );
};

export default SectionHeader;
