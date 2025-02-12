class CustomError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "CustomError";
  }
}

export const createError = (status: number, message: string): CustomError => {
  return new CustomError(status, message);
};
