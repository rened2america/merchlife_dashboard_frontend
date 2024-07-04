"use client";
import { PageTitle } from "@/common/components/generic/PageTitle/PageTitle";
import { PageLayout } from "@/common/layouts/PageLayout/PageLayout";
import { useGetProducts } from "./useProduct";
import { columns } from "@/app/components/table/components/columns";
import { DataTable } from "@/app/components/table/components/data-table";

const Products = () => {
  const { isLoading, data, isSuccess } = useGetProducts();
  return (
    <PageLayout>
      <PageTitle>Products</PageTitle>
      {isLoading ? (
        <div className="w-full h-[50vh] text-base grid place-items-center rounded-lg border border-gray-300 font-bold">
          <div>Loading Products...</div>
        </div>
      ) : (
        <DataTable
          data={data?.data.products}
          columns={columns}
          isLoading={isLoading}
        />
      )}
    </PageLayout>
  );
};

export default Products;
