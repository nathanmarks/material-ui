import React, {PropTypes} from 'react';
import {StyleSheet, css} from 'aphrodite';
import transitions from '../styles/transitions';
import Transition from 'react-overlays/lib/Transition';

const FADE_DURATION = 300;

const styles = StyleSheet.create({
  fade: {
    opacity: 0,
    transition: transitions.easeOut(`${FADE_DURATION}ms`, ['opacity']),
  },
  in: {
    opacity: 1,
  },
});

export default function DialogTransition({children, ...other}) {
  return (
    <Transition
      className={css(styles.fade)}
      enteredClassName={css(styles.in)}
      enteringClassName={css(styles.in)}
      timeout={FADE_DURATION}
      transitionAppear={true}
      {...other}
    >
      {children}
    </Transition>
  );
}

DialogTransition.propTypes = {
  children: PropTypes.node,
};
