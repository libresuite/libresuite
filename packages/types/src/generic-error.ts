class GenericError extends Error {
  code: string;
  status: number;
  constructor(message: string, code: string, status: number, name?: string) {
    super(message);
    this.name = name || "GenericError";
    this.code = code;
    this.status = status;
  }
}

export default GenericError;
