import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

const PlanTable = ({ plans, selectedPlan, smallScreenSize, viewWidth }) => {
  return (
    <table className="w-full  text-center">
      <tbody>
        {viewWidth <= smallScreenSize && (
          <tr>
            <td colSpan={3} className="font-light text-gray-200 ">
              Monthly price
            </td>
          </tr>
        )}

        <tr className="border-b border-b-gray-500 ">
          {viewWidth > smallScreenSize && (
            <td className="font-light text-gray-200 w-[40%] text-left px-4">
              Monthly price
            </td>
          )}
          {plans.map((p) => (
            <td
              key={p.id}
              className={`py-2 w-1/3 md:w-[20%]  ${
                selectedPlan.id === p.id ? "text-red-500" : "text-gray-400"
              } `}
            >
              CHF {p.metadata.monthlyPrice}
            </td>
          ))}
        </tr>
        {viewWidth <= smallScreenSize && (
          <tr>
            <td colSpan={3} className="font-light text-gray-200 pt-3">
              Video quality
            </td>
          </tr>
        )}

        <tr className="border-b border-b-gray-500">
          {viewWidth > smallScreenSize && (
            <td className="font-light text-gray-200 pt-y w-[40%] text-left px-4">
              Video quality
            </td>
          )}
          {plans.map((p) => (
            <td
              key={p.id}
              className={`py-2 w-1/3  md:w-[20%]  ${
                selectedPlan.id === p.id ? "text-red-500" : "text-gray-400"
              } `}
            >
              {" "}
              {p.metadata.videoQuality}
            </td>
          ))}
        </tr>
        {viewWidth <= smallScreenSize && (
          <tr>
            <td colSpan={3} className="font-light text-gray-200 pt-3">
              Resolution
            </td>
          </tr>
        )}

        <tr className="border-b border-b-gray-500">
          {viewWidth > smallScreenSize && (
            <td className="font-light text-gray-200 py-3 w-[40%] text-left px-4">
              Resolution
            </td>
          )}
          {plans.map((p) => (
            <td
              key={p.id}
              className={`py-2 w-1/3  md:w-[20%]  ${
                selectedPlan.id === p.id ? "text-red-500" : "text-gray-400"
              } `}
            >
              {" "}
              {p.metadata.videoResolution}
            </td>
          ))}
        </tr>
        {viewWidth <= smallScreenSize && (
          <tr>
            <td colSpan={3} className="font-light text-gray-200 pt-3 ">
              Watch on your TV, computer, mobile phone and tablet
            </td>
          </tr>
        )}

        <tr>
          {viewWidth > smallScreenSize && (
            <td className="font-light text-gray-200 py-3 w-[40%] text-left px-4">
              Watch on your TV, computer, mobile phone and tablet
            </td>
          )}
          {plans.map((p) => (
            <td
              key={p.id}
              className={`py-2 w-1/3 md:w-[20%] ${
                selectedPlan.id === p.id ? "text-red-500" : "text-gray-400"
              } `}
            >
              {" "}
              {p.metadata.portability === `true` ? (
                <HiOutlineCheck className="inline-block text-xl" />
              ) : (
                <div>
                  <HiOutlineX className="inline-block text-xl" />
                </div>
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default PlanTable;
