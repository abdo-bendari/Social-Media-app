const validation = (schema) => {
  return (req, res, next) => {
    let inputDate = {
      ...req.body,
      ...req.params,
      ...req.query,
    };
    if (req.file) {
      const fileField = req.file.fieldname;
      if (['media', 'profilePic', 'coverPic'].includes(fileField)) {
        inputDate[fileField] = { ...req.file };
      }
    }
    if (req.files) {
      inputDate.files = { ...req.files };
    }
    const { error } = schema.validate(inputDate, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: "validation error", error });
    }
    return next();
  };
};

export default validation
