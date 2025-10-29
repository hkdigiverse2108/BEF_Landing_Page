import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../../Constants";

const PaymentSuccess = () => {
  return (
    <div>
      <Result
        status="success"
        title="Payment Success"
        subTitle="Back To Home Page And Start Learning"
        extra={[
          <NavLink to={ROUTES.HOME}>
            <Button type="primary" className="btn primary_btn !h-12 ">
              Back To Home
            </Button>
          </NavLink>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
