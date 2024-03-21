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

  useEffect(() => {
    if (!isLoading) {
      setDatavalue(orders?.data.normalizeOrders);
    }
  }, [isLoading]);
  console.log(orders?.data.normalizeOrders.length);
  return (
    <PageLayout>
      <PageTitle>Dashboard</PageTitle>
      <div
        style={{
          width: "100%",
          height: "200px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "calc(50%/3)",
        }}
      >
        <div
          style={{
            width: "200px",
            backgroundColor: "#fff27a",
            height: "200px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "48px 1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Total Revenue
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              ${orders?.data.amount}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            backgroundColor: "#35363d", // "#dcdcdd", //#33353b
            height: "200px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "48px 1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              fontSize: "14px",
              fontWeight: "700",
              color: "white",
            }}
          >
            Total Sales
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "white",
              }}
            >
              {orders?.data.countSales}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            backgroundColor: "#dcdcdd", // "#dcdcdd", //#33353b
            height: "200px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "48px 1fr",
          }}
        >
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
              fontSize: "14px",
              fontWeight: "700",
            }}
          >
            Total Designs
          </div>
          <div
            style={{
              display: "grid",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              {data?.data.products.length}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          marginTop: "48px",
        }}
      >
        {/* <PrincipalTable /> */}
        <Chart data={dataValue}></Chart>
      </div>
      <div>{!isLoading && <LastOrders orders={orders?.data.orders} />}</div>
    </PageLayout>
  );
};

export default NewHome;
