const PlanCard = ({ plan, selectedPlan, setSelectedPlan }) => {
  return (
    <>
      <div className="relative">
        <div
          className={`h-[75px] md:h-[125px] flex items-center justify-center ${
            selectedPlan?.id === plan?.id ? "bg-red-600" : "bg-red-400"
          }`}
          onClick={() => setSelectedPlan(plan)}
        >
          {plan?.name}
        </div>
        <div
          className={`m-auto left-0 right-0  w-0 h-0 border-[15px] border-b-0  border-t-red-600 border-r-transparent border-b-transparent border-l-transparent ${
            selectedPlan?.id === plan?.id ? "block" : "hidden"
          }`}
        ></div>
      </div>
    </>
  );
};

export default PlanCard;
