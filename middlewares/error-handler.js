const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(res.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

export default errorHandler;
