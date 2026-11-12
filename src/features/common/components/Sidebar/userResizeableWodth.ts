import { useEffect, useRef, useState } from "react";

type UseResizableWidthOptions = {
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
};

const useResizableWidth = ({
  initialWidth = 300,
  minWidth = 240,
  maxWidth = 480,
}: UseResizableWidthOptions = {}) => {
  const [width, setWidth] = useState(initialWidth);
  const isResizing = useRef(false);

  const startResizing = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();

    isResizing.current = true;

    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleResize = (event: PointerEvent) => {
      if (!isResizing.current) return;

      const nextWidth = Math.min(
        Math.max(event.clientX, minWidth),
        maxWidth
      );

      setWidth(nextWidth);
    };

    const stopResizing = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", handleResize);
    window.addEventListener("pointerup", stopResizing);

    return () => {
      window.removeEventListener("pointermove", handleResize);
      window.removeEventListener("pointerup", stopResizing);

      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [minWidth, maxWidth]);

  return {
    width,
    startResizing,
  };
};

export default useResizableWidth;
