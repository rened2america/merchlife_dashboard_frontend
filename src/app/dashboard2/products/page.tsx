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
