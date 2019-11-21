export default class ObjectNotFoundError extends Error {
  constructor(message) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
    this.name = "ObjectNotFoundError";
  }
}
