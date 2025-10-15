
const SectionHeader = ({ title = "", desc = "", className = "" }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center text-center ${className}`}
      data-aos="fade-up"
    >
      <h1 className="text-2xl md:text-4xl font-bold text-primary mb-2">
        {title}
      </h1>
      <p className="text-gray-600 max-sm:text-sm max-w-xl ">{desc}</p>
    </div>
  );
};

export default SectionHeader;
