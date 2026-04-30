function columnSpacing(between, container) {
  return {
    paddingRight: between,
    ":first-of-type": { paddingRight: container },
    ":last-of-type": { paddingLeft: container },
  };
}

export default columnSpacing;
