import { Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";

const PageNotFound = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <NavLink to={ROUTES.HOME}>
            <button className="btn primary_btn  !h-12    ">Back Home</button>
          </NavLink>
        }
      />
    </div>
  );
};

export default PageNotFound;
