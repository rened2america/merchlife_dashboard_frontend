"use client";

import {
  Pencil2Icon,
  TrashIcon,
  DotsVerticalIcon
} from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useRouter } from "next/navigation";
import { useDeleteProduct } from "@/app/dashboard/products/useProduct";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const { mutate, isSuccess } = useDeleteProduct();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Removed Product", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [isSuccess]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <  DotsVerticalIcon
 className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            router.push(`/dashboard/product/edit/${row.original.id}`);
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <Pencil2Icon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            mutate(row.original.id);
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <TrashIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <ToastContainer />
    </DropdownMenu>
  );
}
