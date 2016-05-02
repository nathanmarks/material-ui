import {create} from 'jss';
import defaultUnit from 'jss-default-unit';
import camelCase from 'jss-camel-case';
import nested from 'jss-nested';

const jss = create();

jss.use(
  nested(),
  camelCase(),
  defaultUnit()
);

export default jss;
