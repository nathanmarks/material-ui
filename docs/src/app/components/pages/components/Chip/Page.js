import React from 'react';
import Title from 'react-title-component';

import CodeExample from '../../../CodeExample';
import PropTypeDescription from '../../../PropTypeDescription';
import MarkdownElement from '../../../MarkdownElement';

import chipReadmeText from './README';
import ChipExampleSimple from './ExampleSimple';
import chipExampleSimpleCode from '!raw!./ExampleSimple';
import chipCode from '!raw!material-ui/lib/Chip/Chip';
import enhancedButtonCode from '!raw!material-ui/lib/internal/EnhancedButton';

const description = 'Examples of Chips using an image, [Font Icon](/#/components/font-icon), ' +
  '[SVG Icon](/#/components/svg-icon) and "Letter" (string), with and without custom colors.';

const ChipPage = () => (
  <div>
    <Title render={(previousTitle) => `Chip - ${previousTitle}`} />
    <MarkdownElement text={chipReadmeText} />
    <CodeExample
      code={chipExampleSimpleCode}
      title="Examples"
      description={description}
    >
      <ChipExampleSimple />
    </CodeExample>
    <PropTypeDescription code={chipCode} />
    <PropTypeDescription code={enhancedButtonCode} header="### Additional callback properties" />
  </div>
);

export default ChipPage;
