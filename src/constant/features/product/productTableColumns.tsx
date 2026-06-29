import { Column } from "@/components/ui/Table/DataTable";
import StatusBadge from "@/components/ui/Status/StatusBadge";
import { CircleIcon } from "@/components/ui/Icon";
import { AdminProduct } from "@/api/types";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";

type DefaultColumns = DefColumns<AdminProduct>;

const productTableColumns: DefaultColumns = {
  productName: {
    headerName: "نماد",
    field: "productName",
  },
  productCode: {
    headerName: "کد محصول",
    field: "productCode",
  },
  categoryId: {
    headerName: "دسته بندی",
    field: "categoryId",
  },
  unitOfMeasure: {
    headerName: "واحد",
    field: "unitOfMeasure",
  },
  productStatusId: {
    headerName: "وضعیت",
    renderCell(row) {
      return (
        <StatusBadge
          color={row.productStatusId ? "success" : "warning"}
          size="medium"
        >
          <CircleIcon />
          {row.productStatusId ? "تایید شده" : "در انتظار تایید"}
        </StatusBadge>
      );
    },
  },
};

const buildProductColumns = (
  options?: BuildColumnsOptions<AdminProduct, DefaultColumns>,
): Column<AdminProduct>[] => {
  return buildColumns<AdminProduct>(productTableColumns, options);
};

export { buildProductColumns };
