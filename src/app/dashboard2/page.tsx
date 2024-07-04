"use client";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { PrincipalTable } from "../components/PrincipalTable/principalTable";
import { LastOrders } from "../components/LastOrders/lastOrders";
import { useGetProducts } from "./products/useProduct";
import { useGetOrders } from "./hooks/useOrders";
import { Chart } from "../components/chart/chart";
import { useEffect, useState } from "react";

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

const NewHome = () => {
  const { data } = useGetProducts();
  const { data: orders, isLoading } = useGetOrders();
  const [dataValue, setDatavalue] = useState(initialData);

  const DashboardCard = [
    {
      name: "Total Revenue",
      bgcolor: "bg-yellow-200",
      textColor: "text-black",
      data: orders?.data.amount,
    },
    {
      name: "Total Sales",
      bgcolor: "bg-gray-800",
      textColor: "text-white",
      data: orders?.data.countSales,
    },
    {
      name: "Total Designs",
      bgcolor: "bg-gray-300",
      textColor: "text-black",
      data: data?.data.products.length,
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      setDatavalue(orders?.data?.normalizeOrders);
    }
  }, [isLoading]);

  return (
    <PageLayout>
      <PageTitle>Dashboard</PageTitle>
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-3  gap-4 xl:gap-[14rem]">
        {DashboardCard.map((card, index) => (
          <div
            key={index}
            className={`xl:w-64 ${card.bgcolor} h-52 sm:w-full rounded-lg grid grid-rows-[48px_1fr]`}
          >
            <div
              className={`grid place-items-center text-lg font-bold ${card.textColor}`}
            >
              {card.name}
            </div>
            <div className="grid place-items-center">
              <div className={`text-2xl font-bold ${card.textColor}`}>
                {card.name === "Total Revenue" ? "$" + card?.data : card?.data}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mt-16">
        <Chart data={dataValue}></Chart>
      </div>
      <div>{!isLoading && <LastOrders orders={orders?.data.orders} />}</div>
    </PageLayout>
  );
};

export default NewHome;
