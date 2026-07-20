import { useEffect, useEffectEvent, useRef, useState } from "react";

function useCheckOverflow() {
  const scrollContainerRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkOverflow = useEffectEvent((scrollContainer) => {
    setIsOverflowing(
      scrollContainer.scrollHeight > scrollContainer.clientHeight,
    );
  });

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    checkOverflow(scrollContainer);

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow(scrollContainer);
    });

    resizeObserver.observe(scrollContainer);

    return () => resizeObserver.disconnect();
  }, []);

  return { isOverflowing, scrollContainerRef };
}

export default useCheckOverflow;
