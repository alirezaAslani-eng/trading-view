import { Column } from "@/components/ui/Table/DataTable";
import { WalletAsset } from "@/api/types";
import { formatFaPrice } from "@/utils";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";
import { PRICE_UNITS } from "@/constant/features/priceConfig";

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
    headerName: `موجودی قابل برداشت (${PRICE_UNITS.IRT.displayName})`,
    renderCell: (row) => {
      return formatFaPrice(row.availableBalance);
    },
  },
  lockedBalance: {
    field: "lockedBalance",
    headerName: `موجودی لاک شده (${PRICE_UNITS.IRT.displayName})`,
    renderCell: (row) => {
      return formatFaPrice(row.lockedBalance);
    },
  },
  livePrice: {
    field: "livePrice",
    headerName: `قیمت لحضه ای (${PRICE_UNITS.IRT.displayName})`,
    renderCell: (row) => {
      return formatFaPrice(row.livePrice);
    },
  },
  totalValueInIrt: {
    field: "totalValueInIrt",
    headerName: `ارزش کل (${PRICE_UNITS.IRT.displayName})`,
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
