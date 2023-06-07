import {
  useRef,
  cloneElement,
  useState,
  useLayoutEffect,
  forwardRef,
  FC,
  ReactElement,
} from "react";

interface Props {
  keyframes: Keyframe[] | PropertyIndexedKeyframes;
  duration: number;
  iterations?: number;
  children?: ReactElement | boolean;
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

const Animation: FC<Props> = forwardRef<HTMLElement, Props>(
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
    },
    ref
  ) => {
    const [_, update] = useState(0);
    const refs = useRef<{
      dom: null | HTMLElement;
      children: ReactElement | boolean;
    }>({
      dom: null,
      children
    });

    useLayoutEffect(() => {
      const keyframesEffect = new window.KeyframeEffect(
        refs.current.dom,
        keyframes,
        { duration, fill, delay, easing, iterations, direction }
      );

      const animate = new window.Animation(keyframesEffect, document.timeline);

      animate.play();

      const handleFinish = () => {
        if (children) {
          return;
        }

        if (!refs.current.children) {
          return
        }

        refs.current.children = null;
        update((c) => c + 1);
        animate.removeEventListener("finish", handleFinish);
      }

      animate.addEventListener("finish", handleFinish);

      return () => {
        animate.removeEventListener("finish", handleFinish);
      }
    }, [children.type]);

    let target;

    if (children) {
      target = children;
      refs.current.children = children
    } else {
      target = refs.current.children;
    }

    if (!target) {
      return null;
    }

    return cloneElement(target, {
      ...target.props, ref: (forwardedRef: HTMLElement) => {
        refs.current.dom = forwardedRef;
        if (ref instanceof Function) {
          ref(forwardedRef);
        }
      }
    });
  }
);

export default Animation;
