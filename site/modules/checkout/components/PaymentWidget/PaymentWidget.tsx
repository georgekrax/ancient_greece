import { Check, ChevronRight, CreditCard } from "@components/icons";

import s from "./PaymentWidget.module.css";

type Props = {
  isValid?: boolean;
  onClick?: () => any;
};

const PaymentWidget = ({ isValid, onClick }: Props): ComponentElement => {
  /* Shipping Address
  Only available with checkout set to true -
  This means that the provider does offer checkout functionality. */
  return (
    <div onClick={onClick} className={s.root}>
      <div className="flex flex-1 items-center">
        <CreditCard className="w-5 flex" />
        <span className="ml-5 text-sm text-center font-medium">Add Payment Method</span>
        {/* <span>VISA #### #### #### 2345</span> */}
      </div>
      <div>{isValid ? <Check /> : <ChevronRight />}</div>
    </div>
  );
};

export default PaymentWidget;
