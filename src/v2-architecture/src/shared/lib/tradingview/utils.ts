import { IChartingLibraryWidget } from "./charting_library/charting_library";

function checkWidget(
  widget: IChartingLibraryWidget | null | undefined,
): null | IChartingLibraryWidget {
  if (!widget) return null;
  return widget;
}

export default checkWidget;
