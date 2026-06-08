import React, { useEffect } from "react";

const TRADINGVIEW_SCRIPT = `${process.env.PUBLIC_URL || ""}/charting_library/charting_library.standalone.js`;

const loadScript = () =>
  new Promise((resolve, reject) => {
    if (window.TradingView?.widget) return resolve();

    const existingScript = document.querySelector(
      `script[src="${TRADINGVIEW_SCRIPT}"]`,
    );
    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = TRADINGVIEW_SCRIPT;
    script.defer = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

export default function ProductChart() {
  const containerRef = React.useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let widgetInstance;

    loadScript()
      .then(() => {
        if (!containerRef.current) return;

        widgetInstance = new window.TradingView.widget({
          datafeed: {
            onReady: () => {},
            resolveSymbol: () => {},
            getBars: () => {},
            subscribeBars: () => {},
            unsubscribeBars: () => {},
          },
          symbol: "TEST",
          container: containerRef.current,
          library_path: `${process.env.PUBLIC_URL || ""}/charting_library/`,
          interval: "D",
          autosize: true,
          theme: "Dark",
        });
      })
      .catch((err) => console.error("Failed to load TradingView script", err));

    return () => {
      widgetInstance?.remove();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
