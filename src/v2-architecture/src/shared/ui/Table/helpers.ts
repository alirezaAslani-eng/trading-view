function columnSpacing(between: string, container: string) {
  return {
    paddingRight: between,
    ":first-of-type": { paddingRight: container },
    ":last-of-type": { paddingLeft: container },
  };
}

export { columnSpacing };
