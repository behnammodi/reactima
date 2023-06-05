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
    const refs = useRef<{
      dom: null | HTMLElement;
      prev: Props["children"];
      next: Props["children"];
    }>({
      dom: null,
      prev: children,
      next: children,
    });

    const [_, update] = useState(0);

    useMemo(() => {
      if (
        !(
          refs.current.next !== children &&
          isSomething(refs.current.prev) &&
          isNothing(children)
        )
      ) {
        refs.current.next = children;
      }
    }, [children]);

    if (refs.current.prev !== refs.current.next) {
      refs.current.prev = refs.current.next;
    }

    const Component = useMemo(() => {
      if (isNothing(refs.current.next)) {
        return null;
      }

      const NextChildren = refs.current.next as React.ReactElement;

      return cloneElement(NextChildren, {
        ...NextChildren.props,
        ref: (forwardedRef: any) => {
          refs.current.dom = forwardedRef;
          if (ref instanceof Function) {
            ref(forwardedRef);
          } else if (ref?.current) {
            ref.current = forwardedRef;
          }
        },
      });
    }, [refs.current.next]);

    useEffect(() => {
      let animate: Animation | undefined;
      if (refs.current.dom) {
        animate = refs.current.dom.animate(keyframes, {
          duration,
          fill,
          direction,
          iterations,
          easing,
          delay,
        });

        animate.addEventListener("finish", handleFinish);
      }

      function handleFinish(e: AnimationPlaybackEvent) {
        if (isNothing(children)) {
          refs.current.next = children;
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
