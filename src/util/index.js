export default function getRequestErrorMessage(response) {
  if (response) {
    if (response.hasOwnProperty('details')) {
      return response.details;
    } else if (response.hasOwnProperty('non_field_errors')) {
      return response.non_field_errors[0];
    } else if (response instanceof Object) {
      const key = Object.keys(response)[0];
      let message = response[Object.keys(response)[0]];
      if (Array.isArray(message)) {
        message = message[0];
      } else if (message instanceof Object) {
        message = message[Object.keys(message)[0]];
      }
      return key + ': ' + message;
    } else {
      return response;
    }
  }
}
