"use client";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
// import { useGetProducts } from "./useProduct";
import { columns } from "@/app/components/ordersTable/components/columns";
// import { DataTable } from "@/app/components/table/components/data-table";
import { useGetOrders } from "../hooks/useOrders";
import { DataTable } from "@/app/components/ordersTable/components/data-table";
const Orders = () => {
  //   const { isLoading, data, isSuccess } = useGetProducts();
  const { data: orders, isLoading } = useGetOrders();

  return (
    <PageLayout>
      <PageTitle>Orders</PageTitle>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "50vh",
            fontSize: "16px",
            display: "grid",
            justifyItems: "center",
            alignItems: "center",
            borderRadius: "16px",
            border: "1px solid #e5e7eb",
            fontWeight: "700",
          }}
        >
          <div>Loading Orders...</div>
        </div>
      ) : (
        <DataTable data={orders?.data.orders} columns={columns} />
      )}
    </PageLayout>
  );
};

export default Orders;
