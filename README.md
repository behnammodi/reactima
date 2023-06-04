## Reactima: Animation Library for React Projects

Here are some basic example showcasing the usage of `reactima` in a React project:

## The first example:

https://codesandbox.io/p/sandbox/reactima-forked-yinnjk

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


## The second example:

https://codesandbox.io/p/sandbox/reactima-example-1-forked-b9njfx

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