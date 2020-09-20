export function parseErrorMessages(fieldErrorMessages) {
  return Object.entries(fieldErrorMessages).reduce(
    (acc, [fieldName, errors]) => {
      acc[fieldName] = {
        validateStatus: "error",
        help: errors.join(" ")
      };
      return acc
    }, {}
  );
}