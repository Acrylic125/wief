import { useRef, useState } from "react";

export type DragListenerResult<T extends Element> = { event: React.MouseEvent<T, MouseEvent>; dx: number; dy: number; x: number; y: number };

export default function useDrag<T extends Element>(onDrag?: (e: DragListenerResult<T>) => void) {
  const ref = useRef<T>(null);

  const [startingX, setStartingX] = useState(0);
  const [startingY, setStartingY] = useState(0);

  return {
    props: {
      ref,
      onMouseDown: (e: React.MouseEvent<T, MouseEvent>) => {
        setStartingX(e.clientX);
        setStartingY(e.clientY);
      },
      onMouseMove: (e: React.MouseEvent<T, MouseEvent>) => {
        if (ref.current) {
          const { x, y } = ref.current.getBoundingClientRect();
          if (onDrag)
            onDrag({
              event: e,
              dx: e.clientX - startingX,
              dy: e.clientY - startingY,
              x: e.clientX - x,
              y: e.clientY - y,
            });
        }
      },
    },
  };
}
