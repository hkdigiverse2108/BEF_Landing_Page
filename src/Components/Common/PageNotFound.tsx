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
          <NavLink to={ROUTES.HOME} className="!text-primary font-semibold ">
            Back Home
          </NavLink>
        }
      />
    </div>
  );
};

export default PageNotFound;
