const ValidateNoteTitle = (title) => {
  const testCase = /^create$|^fetch$/.test(title.toLowerCase());

  if (testCase) {
    return {
      code: 1,
      type: "ERR",
      message: `${title} is a reserved word! Use a different title`,
    };
  }

  return { code: 0, type: "OK", message: `'${title}' is valid` };
};

const ValidateDocTitle = (title) => {
  const testCase = /^stash$|^fetch$/.test(title.toLowerCase());

  if (testCase) {
    return {
      code: 1,
      type: "ERR",
      message: `${title} is a reserved word! Use a different title`,
    };
  }

  return { code: 0, type: "OK", message: `'${title}' is valid` };
};

export { ValidateNoteTitle, ValidateDocTitle };
