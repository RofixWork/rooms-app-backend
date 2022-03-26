const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "This Route not Exist, Please try again...",
  });
};
export default notFound;
