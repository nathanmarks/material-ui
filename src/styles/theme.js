
export default function createMuiTheme(config, more) {
  const properties = {
    sheets: new WeakMap(),
  };

  return Object.assign(
    Object.create(muiTheme),
    properties,
    more,
  );
}

const muiTheme = {
  attachStyles,
};

function attachStyles(component, styles) {
  // logic and shit
  console.log(styles);
}
