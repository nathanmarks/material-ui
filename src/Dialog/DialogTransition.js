import React, {PropTypes} from 'react';
import jss from '../styles/jss';
import transitions from '../styles/transitions';
import Transition from 'react-overlays/lib/Transition';

const FADE_DURATION = 300;

const styles = jss.createStyleSheet({
  fade: {
    opacity: 0,
    transition: transitions.easeOut(`${FADE_DURATION}ms`, ['opacity']),
  },
  in: {
    opacity: 1,
  },
}).attach();

export default function DialogTransition({children, ...other}) {
  return (
    <Transition
      className={styles.fade}
      enteredClassName={styles.in}
      enteringClassName={styles.in}
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
