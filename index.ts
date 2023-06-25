import {
  useRef,
  cloneElement,
  useState,
  useLayoutEffect,
  forwardRef,
  FC,
  ReactElement,
  isValidElement,
} from "react";

interface Props extends EffectTiming {
  keyframes: Keyframe[] | PropertyIndexedKeyframes;
  children?: ReactElement | boolean;
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
      children: Props["children"];
    }>({
      dom: null,
      children,
    });

    const childrenType = isValidElement(children) && children.type;

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
          return;
        }

        refs.current.children = undefined;
        update((c) => c + 1);
        animate.removeEventListener("finish", handleFinish);
      };

      animate.addEventListener("finish", handleFinish);

      return () => {
        animate.removeEventListener("finish", handleFinish);
      };
    }, [childrenType]);

    let target;

    if (children) {
      target = children;
      refs.current.children = children;
    } else {
      target = refs.current.children;
    }

    const isTargetAReactElemet = (
      target: Props["children"]
    ): target is ReactElement => {
      return isValidElement(target);
    };

    if (!isTargetAReactElemet(target)) {
      return null;
    }

    return cloneElement(target, {
      ...target.props,
      ref: (forwardedRef: HTMLElement) => {
        refs.current.dom = forwardedRef;
        if (ref instanceof Function) {
          ref(forwardedRef);
        }
      },
    });
  }
);

export default Animation;
