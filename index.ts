import React, {
    useMemo,
    useRef,
    cloneElement,
    useState,
    useEffect,
    forwardRef,
  } from "react";
  
  interface Props {
    keyframes: Keyframe[] | PropertyIndexedKeyframes;
    duration: number;
    iterations?: number;
    children?: React.ReactElement | boolean;
    direction?: PlaybackDirection;
    easing?:
      | "linear"
      | "ease"
      | "ease-in"
      | "ease-out"
      | "ease-in-out"
      | `cubic-bezier(${number},${number},${number},${number})`;
    fill?: FillMode;
    delay?: number;
  }
  
  const isNothing = (e: any) => e === null || e === false || e === undefined;
  const isSomething = (e: any) => !isNothing(e);
  
  const Animation = forwardRef(
    (
      {
        keyframes,
        duration,
        children,
        direction,
        iterations,
        easing,
        fill,
        delay,
      }: Props,
      ref
    ) => {
      const innerRef = useRef<any>();
      const [_, update] = useState(0);
  
      const prev = useRef(children);
      const next = useRef(children);
  
      useMemo(() => {
        if (
          !(
            next.current !== children &&
            isSomething(prev.current) &&
            isNothing(children)
          )
        ) {
          next.current = children;
        }
      }, [children]);
  
      if (prev.current !== next.current) {
        prev.current = next.current;
      }
  
      const Component = useMemo(() => {
        if (isNothing(next.current)) {
          return null;
        }
  
        const NextChildren = next.current as React.ReactElement;
  
        return cloneElement(NextChildren, {
          ...NextChildren.props,
          ref: (forwardedRef: any) => {
            innerRef.current = forwardedRef;
            if (ref instanceof Function) {
              ref(forwardedRef);
            } else if (ref?.current) {
              ref.current = forwardedRef;
            }
          },
        });
      }, [next.current]);
  
      useEffect(() => {
        console.log("innerRef.current", innerRef.current);
        let animate: Animation | undefined;
        if (innerRef.current) {
          animate = (innerRef.current as HTMLElement).animate(keyframes, {
            duration,
            fill,
            direction,
            iterations,
            easing,
            delay,
            // composite: "accumulate",
          });
  
          animate.addEventListener("finish", handleFinish);
        }
  
        function handleFinish(e: AnimationPlaybackEvent) {
          if (isNothing(children)) {
            next.current = children;
            update((c) => c + 1);
          }
          animate?.removeEventListener("finish", handleFinish);
        }
  
        return () => {
          animate?.removeEventListener("finish", handleFinish);
          animate?.cancel();
        };
      }, [children]);
  
      return Component;
    }
  );
  
  export default Animation;
  