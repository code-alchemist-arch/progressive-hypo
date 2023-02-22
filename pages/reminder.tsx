import Button from '@/components/Button';
import InterestRate from '@/components/InterestRate';
import Header from '@/components/Header';

export default function ReminderOverview() {
  return (
    <>
      <Header
        isVisibleBack
        isVisibleShare
      />
      <div className="h-screen">
        <div className="mx-9 my-10">
          <h2 className="text-2xl font-medium leading-7 text-black font-serif">
            Heads up: Due date is more than 18m in the future
          </h2>
          <p className="text-base text-grey02 leading-5 mt-2.5">
            You can sign up the customer for our reminder service so he will be
            informed as soon as he is eligible to repay his current mortgage
          </p>
        </div>
        <div className="px-5">
          <div className="mb-2.5">
            <InterestRate label="Loan to value" value="66" />
          </div>
          <div>
            <InterestRate
              label="IViability ratio"
              icon="/images/info.svg"
              value="26 - 32"
              isSelected={true}
            />
          </div>
          <div className="mt-5">
            <Button type="button" caption="Sign-Up for Reminder Service" />
          </div>
        </div>
      </div>
    </>
  );
}
