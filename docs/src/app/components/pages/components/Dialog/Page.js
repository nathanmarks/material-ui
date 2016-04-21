import React from 'react';
import Title from 'react-title-component';
import {StyleSheet, css} from 'aphrodite';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import dialogReadmeText from './README';
import DialogExampleSimple from './ExampleSimple';
import dialogExampleSimpleCode from '!raw!./ExampleSimple';
import dialogCode from '!raw!material-ui/lib/Dialog/Dialog';

const styles = StyleSheet.create({
  page: {
    color: 'red',
  },
});

const DialogPage = () => (
  <div className={css(styles.page)}>
    <Title render={(previousTitle) => `Dialog - ${previousTitle}`} />
    <MarkdownElement text={dialogReadmeText} />
    <CodeExample
      title="Simple dialog"
      code={dialogExampleSimpleCode}
    >
      <DialogExampleSimple />
    </CodeExample>
    <PropTypeDescription code={dialogCode} />
  </div>
);

export default DialogPage;
