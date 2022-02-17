export const isEmpty = (message) => (value) => {
  if (!!value) {
    return
  }
  return message;
}
const validation = (events) => {
  let errors = '';
  const checkEvents = [];
  events.forEach((event) => {
    checkEvents.push(event);
  });

  const error = () => {
    alert(errors);
    errors = '';
  }

  const check = (value) => {
    try {
      checkEvents.forEach((event) => {
        const result = event(value);
        if (result) throw result;
      });
    } catch (error) {
      errors = error;
    }
    return !errors;
  }

  return {
    check,
    error,
  };
}

export default validation;