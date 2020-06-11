import { ErrorRequestHandler, RequestHandler } from "express";

const statusErrHandler: RequestHandler = (req, res, next) => {
  const err = new Error("Oopps!! Page Not Found");
  err.status = 404;
  next(err);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

export { statusErrHandler, errorHandler };
