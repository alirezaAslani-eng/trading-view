"use client";
import { PRICE_UNITS } from "@/constant/features/priceConfig";
import { formatFaPrice, formatPrecent } from "@/utils";
import { Switch, Stack, Typography, CircularProgress } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SETTLEMENT_LABELS } from "@/v2-architecture/src/features/order";
import { buildColumns, DefColumns } from "@/utils/app/buildColumns";
import { TradeRobot } from "../api";
import DataTable from "@/components/ui/Table/DataTable";
import {
  PagePaper,
  PagePaperHeading,
  PagePaperTitle,
} from "@/components/ui/Layout/PaperLayout";
import ButtonTableAction from "@/components/ui/Button/ButtonTableAction";
import NextLink from "@/components/ui/Link/NextLink";
import Button from "@/components/ui/Button/Button";
import { AddIcon } from "@/components/ui/Icon";
import { toggleTradeBotConfig, tradeRobotsConfig } from "../react-query";
import { ROUTES } from "@/constant/app/routes";
function ToggleBotCell({
  botId,
  isActive,
}: {
  botId: string;
  isActive: boolean;
}) {
  const { isPending, mutate } = useMutation(toggleTradeBotConfig());

  const toggle = () => mutate({ botId, isActive: !isActive });

  if (isPending) return <CircularProgress size="20px" />;

  return <Switch checked={isActive} onChange={toggle} />;
}

const priceUnitDisplay = PRICE_UNITS.IRT.displayName;
const tradeBotsTableColumns: DefColumns<TradeRobot> = {
  symbol: {
    field: "symbol",
    headerName: "نماد",
    renderCell: (row) => {
      return row.symbol;
    },
  },

  manualBasePrice: {
    field: "manualBasePrice",
    headerName: "قیمت پایه",
    renderCell: (row) => {
      return `${formatFaPrice(row.manualBasePrice)} ${priceUnitDisplay}`;
    },
  },
  targetAssetRatio: {
    field: "targetAssetRatio",
    headerName: "درصد مطلوب نگهداری کالا",
    renderCell: (row) => {
      return formatPrecent(row.targetAssetRatio);
    },
  },
  settlementMode: {
    field: "settlementMode",
    headerName: "روش تسویه",
    renderCell: (row) => {
      return SETTLEMENT_LABELS[row.settlementMode];
    },
  },
  isActive: {
    field: "isActive",
    headerName: "وضعیت ربات",
    renderCell: ({ isActive, botId }) => {
      // ! OPTIMISE Needed : Dont call the hook for each row, instead pass its state from one executation
      return <ToggleBotCell botId={botId} isActive={isActive} />;
    },
  },
};

const columns = buildColumns<TradeRobot>(tradeBotsTableColumns, {
  extra: [
    {
      headerName: "عملیات",
      renderCell(row) {
        return (
          <NextLink href={ROUTES.ROBOT.ROBOT_CONFIG(row.botId)}>
            <ButtonTableAction>{"ویرایش"}</ButtonTableAction>
          </NextLink>
        );
      },
    },
  ],
});

function RobotListTable() {
  const { data, isLoading, isError, isSuccess } = useQuery(tradeRobotsConfig());
  const dataLength = data?.length;
  return (
    <PagePaper>
      <PagePaperHeading sx={{ mb: 6 }}>
        <PagePaperTitle>{"لیست ربات های معامله گر"}</PagePaperTitle>
        <NextLink href={ROUTES.ROBOT.CREATE_ROBOT}>
          <Button variant="on-surface">
            <AddIcon />
            {"ربات جدید"}
          </Button>
        </NextLink>
      </PagePaperHeading>

      {isLoading && (
        <Stack sx={{ alignItems: "center", justifyContent: "center", py: 10 }}>
          <Typography variant="body3" sx={{ color: "text.disabled" }}>
            {"در حال بارگذاری..."}
          </Typography>
        </Stack>
      )}

      {isError && (
        <Stack sx={{ alignItems: "center", justifyContent: "center", py: 10 }}>
          <Typography variant="body3" sx={{ color: "status.loss" }}>
            {"دریافت اطلاعات با خطا مواجه شد"}
          </Typography>
        </Stack>
      )}

      {!isLoading && !isError && !dataLength && (
        <Stack sx={{ alignItems: "center", justifyContent: "center", py: 10 }}>
          <Typography variant="body3" sx={{ color: "text.disabled" }}>
            {"رباتی ثبت نشده"}
          </Typography>
        </Stack>
      )}

      {isSuccess && !!dataLength && <DataTable columns={columns} rows={data} />}
    </PagePaper>
  );
}

export default RobotListTable;
