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
      style={{
        display: "grid",
        gridTemplateRows: "100px 1fr",
        marginTop: "40px",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: "700",
        }}
      >
        Recently orders
      </div>
      <div
        style={{
          width: "100%",
        }}
      >
        {orders.slice(Math.max(orders.length - 10, 0)).map((order) => {
          return (
            <div
              key={order.id}
              style={{
                display: "grid",
                width: "100%",
                gridTemplateColumns: "48px 1fr 1fr 1fr 150px",
                justifyItems: "center",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: "700",
                height: "80px",
              }}
            >
              <div>
                <div
                  style={{
                    borderRadius: "48px",
                    width: "48px",
                    height: "48px",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {order.name.slice(0, 2)}
                </div>
              </div>
              <div>{order.productName}</div>
              <div>{order.email}</div>
              <div>{order.name}</div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "24px 1fr",

                  justifyItems: "center",
                  alignItems: "center",
                }}
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
