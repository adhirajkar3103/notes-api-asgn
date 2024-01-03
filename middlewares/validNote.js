const validateNote = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Title and content are required fields" });
  }

  if (title.length > 100 || content.length > 1000) {
    return res
      .status(400)
      .json({
        message:
          "Title should be less than 100 characters, and content should be less than 1000 characters",
      });
  }

  next();
};

module.exports = validateNote;
