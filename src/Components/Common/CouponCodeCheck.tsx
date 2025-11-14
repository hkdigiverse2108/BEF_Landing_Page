import { Input } from "antd";
import { URL_KEYS } from "../../Constants";
import { useGetApiQuery, usePostApiMutation } from "../../Api/CommonApi";
import { useEffect, useState, type FC } from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

interface CouponCodeCheckProps {
  setIsRefferLoading: React.Dispatch<React.SetStateAction<boolean>>;
  price: number;
  isRefferApplyed: boolean;
  setIsRefferApplyed: React.Dispatch<React.SetStateAction<boolean>>;
  refferCode: string;
  setRefferCode: React.Dispatch<React.SetStateAction<string>>;
}

const CouponCodeCheck: FC<CouponCodeCheckProps> = ({
  setIsRefferLoading,
  price,
  isRefferApplyed,
  setIsRefferApplyed,
  refferCode,
  setRefferCode,
}) => {
  const [error, setError] = useState("");

  const [PostApi, { isLoading: isCouponCheckLoading }] = usePostApiMutation();

  const { data: CouponData, isLoading: isCouponLoading } = useGetApiQuery({
    url: `${URL_KEYS.REFERRAL.ALL}?audienceFilter=default`,
  });

  const defaultCoupon = CouponData?.data?.coupon_data[0]?.code;

  const handleAplyyReferCode = async () => {
    if (!refferCode.trim()) {
      setIsRefferApplyed(false);
      setError("Referral code is required");
      return;
    }

    try {
      setError("");
      setIsRefferLoading(true);

      const payload = {
        code: refferCode,
        amount: price,
      };

      const res = await PostApi({
        url: URL_KEYS.REFERRAL.CHECK,
        data: payload,
      });

      const resData = res?.data?.data;
      setIsRefferLoading(false);

      if (resData?.isValid) {
        setIsRefferApplyed(true);
        setError("");
      } else {
        setIsRefferApplyed(false);
        setError("Invalid referral code");
      }
    } catch (error) {
      setIsRefferApplyed(false);
      setError("Something went wrong");
    }
  };

  const handleReferralChange = (e: any) => {
    const value = e.target.value;
    setRefferCode(value);

    if (!value.trim()) {
      setIsRefferApplyed(false);
      setError("");
    }
  };

  useEffect(() => {
    if (refferCode) {
      const timer = setTimeout(() => {
        if (refferCode) handleAplyyReferCode();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [refferCode]);

  useEffect(() => {
    if (defaultCoupon) {
      setRefferCode(defaultCoupon);
    }
  }, [defaultCoupon]);

  useEffect(() => {
    setIsRefferLoading(true);
    if (!isCouponLoading) {
      setIsRefferLoading(false);
    }
  }, [isCouponLoading]);

  return (
    <div className=" w-fit">
      <div className={`${isRefferApplyed ? "paymentSuccess" : ""}`}>
        <Search
          placeholder="Referral Code"
          value={refferCode}
          onChange={handleReferralChange}
          className="py-1! placeholder:font-medium!  rounded-lg"
          onClear={() => setIsRefferApplyed(false)}
          loading={isCouponLoading || isCouponCheckLoading}
          enterButton={
            isRefferApplyed ? (
              <span className={`flex items-center gap-1  `}>
                <CheckCircleOutlined /> Applied
              </span>
            ) : (
              "Apply"
            )
          }
          size="large"
          onSearch={() => {
            if (!refferCode.trim()) {
              setIsRefferApplyed(false);
              return;
            }
            handleAplyyReferCode();
          }}
        />
        {error && <p className="text-red-500 text-xs mt-1 ">{error}</p>}
      </div>
    </div>
  );
};

export default CouponCodeCheck;
