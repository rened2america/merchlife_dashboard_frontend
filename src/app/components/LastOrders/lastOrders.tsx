"use client";
import { Avatar } from "@radix-ui/react-avatar";
import { ClockIcon } from "@radix-ui/react-icons";

export const LastOrders = ({ orders }) => {
  const transformDate = (stringDate) => {
    const date = new Date(stringDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11, por eso sumamos 1
    const newday = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${newday}`;
  };

  return (
    <div
    className="grid grid-rows-[100px_1fr] mt-[40px] justify-items-center items-center"
    >
      <div
      className="font-base font-bold"
      >
        Recently orders
      </div>
      <div className="w-full"
      >
        {orders.slice(Math.max(orders.length - 10, 0)).map((order) => {
          return (
            <div
              key={order.id}
              className="grid w-full grid-cols-[48px_1fr_1fr_1fr_150px] justify-items-center items-center font-sm font-bold h-[80px]"
            >
              <div>
                <div
                className="rounded-[48px] w-[48px] h-[48px] grid place-items-center"
                >
                  {order.name.slice(0, 2)}
                </div>
              </div>
              <div>{order.productName}</div>
              <div>{order.email}</div>
              <div>{order.name}</div>
              <div
              className="grid grid-cols-[24px_1fr] justify-items-center items-center"
              >
                <ClockIcon /> {transformDate(order.createdAt)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
