import { Column } from "@/components/ui/Table/DataTable";
import { WalletAsset } from "@/api/types";
import { formatFaPrice } from "@/utils";
import {
  buildColumns,
  BuildColumnsOptions,
  DefColumns,
} from "@/utils/app/buildColumns";
import NextLink from "@/components/ui/Link/NextLink";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import { ROUTES } from "@/constant/app/routes";
import { WEIGHT_UNITS } from "../product/weightUnits";
import { PRICE_UNITS } from "../priceConfig";

type DefaultColumns = DefColumns<WalletAsset>;

const weightUnitDisplay = WEIGHT_UNITS.KG.lable;
const priceUnitDisplay = PRICE_UNITS.IRT.displayName;
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
    headerName: "موجودی قابل برداشت ",
    renderCell: (row) => {
      return `${formatFaPrice(row.availableBalance)} ${weightUnitDisplay}`;
    },
  },
  lockedBalance: {
    field: "lockedBalance",
    headerName: "حجم کالای در صف فروش",
    renderCell: (row) => {
      return `${formatFaPrice(row.lockedBalance)} ${weightUnitDisplay}`;
    },
  },
  livePrice: {
    field: "livePrice",
    headerName: "قیمت لحضه ای ",
    renderCell: (row) => {
      return `${formatFaPrice(row.livePrice)} ${priceUnitDisplay}`;
    },
  },
  totalValueInIrt: {
    field: "totalValueInIrt",
    headerName: "ارزش کل ",
    renderCell: (row) => {
      return `${formatFaPrice(row.totalValueInIrt)} ${priceUnitDisplay}`;
    },
  },
};

const buildAssetColumns = (
  options?: BuildColumnsOptions<WalletAsset, DefaultColumns>,
): Column<WalletAsset>[] => {
  return buildColumns<WalletAsset>(walletAssetTableColumns, {
    ...options,
    extra: [
      {
        headerName: "عملیات",
        renderCell(row) {
          return (
            <NextLink href={ROUTES.TRADE.BY_SYMBOL(row.assetSymbol)}>
              <ButtonTableAction>{"معامله"}</ButtonTableAction>
            </NextLink>
          );
        },
      },
      ...(options?.extra ?? []),
    ],
  });
};

export { buildAssetColumns };
