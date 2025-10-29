import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";

const PaymentFailed = () => {
  return (
    <div>
      <Result
        status="error"
        title="Payment Failed"
        subTitle="Back To Home Page And Try Again Later"
        extra={[
          <>
            <NavLink to={ROUTES.HOME}>
              <Button type="primary" className="btn primary_btn !h-12 ">
                Back To Home
              </Button>
            </NavLink>
          </>,
        ]}
      />
    </div>
  );
};

export default PaymentFailed;
