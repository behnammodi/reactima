## Reactima: Animation Library for React Projects

Here are some basic example showcasing the usage of `reactima` in a React project:

## The basic example:

https://codesandbox.io/p/sandbox/yinnjk

In this example, we have implemented an animation where a card component moves from the left side to the right side. The animation begins with the card's opacity at 0 and gradually increases it to 1.

```jsx
<Animation
  duration={500}
  keyframes={[
  { opacity: 0, transform: "translateX(0px)" },
  { opacity: 1, transform: "translateX(500px)" },
]}>
  <Card />
</Animation>
```

The card component remains unchanged in this example and only requires `forwardRed` to function properly.


## Infinity animation example:

https://codesandbox.io/p/sandbox/b9njfx

In this example, we have implemented an animation where a card component continuously rotates. We achieve this effect by using the `iterations` prop with a value of `Infinity`.

```jsx
<Animation
  duration={1000}
  iterations={Infinity}
  keyframes={[
    { transform: "rotate(0turn)" },
    { transform: "rotate(1turn)" },
]}>
  <Card />
</Animation>
```

## Animation compose exmple:

https://codesandbox.io/p/sandbox/0rm9xk

Here is an example showcasing the composition of multiple animations with different configurations. In this example, we combine multiple animations to create a complex effect. By combining multiple animations in this way, you can create more intricate and dynamic effects

```jsx
<Animation
  duration={2000}
  iterations={Infinity}
  keyframes={[
    { borderRadius: 0, transform: "scale(0) rotate(0turn)" },
    { borderRadius: "50%", transform: "scale(1) rotate(1turn)" },
]}>
  <Animation
    duration={1000}
    iterations={Infinity}
    keyframes={[{ backgroundColor: "red" }, { backgroundColor: "blue" }]}
  >
    <Card />
  </Animation>
</Animation>
```

## Interactively Controlled Animation example:

https://codesandbox.io/p/sandbox/o1mplp

Here is an example that demonstrates how to animate a card based on a mount and unmount interaction. In this example, the card animation is controlled by a `show` flag that determines whether the card should be displayed or hidden. When the `show` flag is `true`, the card is mounted and animated using the specified keyframes.

```jsx
const [show, setShow] = useState(false);

<Animation
  duration={500}
  fill="both"
  direction={show ? "normal" : "reverse"}
  keyframes={[
    { opacity: 0, transform: "translateX(0px)" },
    { opacity: 1, transform: "translateX(500px)" },
  ]}
>
  {show && <Card />}
</Animation>
```

Inside the Animation component, fill is set to "both" to maintain the final state of the animation. The direction property is dynamically controlled by the show flag. When show is true, the animation plays in the normal direction. 

## How to use it:

Install:
```bash
npm install reactima
# or
yard add reactima
```

Import:
```js
import Animation from 'reactima';
```





