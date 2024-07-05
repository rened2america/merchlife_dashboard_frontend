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

        className="w-full h-[50vh] text-base grid place-items-center rounded-lg border border-s-[#e5e7eb] font-bold"
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
