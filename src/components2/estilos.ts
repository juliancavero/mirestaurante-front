import { fadeIn, fadeOut, flipInX, fadeInDown } from 'react-animations';

import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '1s'
  },
  fadeOut: {
      animationName: fadeOut,
      animationDuration: '1s'
  },
  flipInX: {
      animationName: flipInX,
      animationDuration: '2s'
  },
  fadeInDown: {
      animationName: fadeInDown,
      animationDuration: '1s'
  }
})

export const fadeInAnimation = css(styles.fadeIn);
export const fadeOutAnimation = css(styles.fadeOut);
export const flipInXAnimation = css(styles.flipInX);
export const fadeInDownAnimation = css(styles.fadeInDown);