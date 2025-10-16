import { ImagePath } from "../../Constants";

const AnimationLine = () => {
  return (
    <div className="anim_line dark_bg  overflow-hidden relative ">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <span key={i}>
            <img src={`${ImagePath}anim_line.png`} alt="anim_line" />
          </span>
        ))}
    </div>
  );
};

export default AnimationLine;
