import { Column } from "@/components/ui/Table/DataTable";
import { WalletAsset } from "@/api/types";
import { formatFaPrice } from "@/utils";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";

type DefaultColumns = DefColumns<WalletAsset>;

const walletAssetTableColumns: DefaultColumns = {
  assetSymbol: {
    field: "assetSymbol",
    headerName: "دارایی",
    renderCell: (row) => {
      return row.assetSymbol;
    },
  },
  availableBalance: {
    field: "availableBalance",
    headerName: "موجودی قابل برداشت (تومان)",
    renderCell: (row) => {
      return formatFaPrice(row.availableBalance);
    },
  },
  lockedBalance: {
    field: "lockedBalance",
    headerName: "موجودی لاک شده (تومان)",
    renderCell: (row) => {
      return formatFaPrice(row.lockedBalance);
    },
  },
  livePrice: {
    field: "livePrice",
    headerName: "قیمت لحضه ای (تومان)",
    renderCell: (row) => {
      return formatFaPrice(row.livePrice);
    },
  },
  totalValueInIrt: {
    field: "totalValueInIrt",
    headerName: "ارزش کل (تومان)",
    renderCell: (row) => {
      return formatFaPrice(row.totalValueInIrt);
    },
  },
};

const buildAssetColumns = (
  options?: BuildColumnsOptions<WalletAsset, DefaultColumns>,
): Column<WalletAsset>[] => {
  return buildColumns<WalletAsset>(walletAssetTableColumns, options);
};

export { buildAssetColumns };
