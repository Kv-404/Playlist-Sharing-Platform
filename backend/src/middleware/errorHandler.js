export function notFound(req, res) {
  res.status(404).json({ success: false, message: "Route not found" });
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.code === 11000) {
    return res.status(409).json({ success: false, message: "Email is already registered" });
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)[0]?.message || "Validation failed";
    return res.status(400).json({ success: false, message });
  }

  const status = err.statusCode || 500;
  if (status === 500) {
    console.error(err);
  }

  res.status(status).json({
    success: false,
    message: status === 500 ? "Something went wrong" : err.message,
  });
}
