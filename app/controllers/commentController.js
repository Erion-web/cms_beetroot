const commentService = require("./../services/commentService");
const validateCommentInput = require("./../validation/comment");

const update = async (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  if (!isValid) {
    return res.status(422).json({
      success: false,
      errors,
    });
  }

  if (!(await commentService.checkIfUserIsAuth(req.user, req.params.id))) {
    return res.status(401).json({
      success: false,
      errors: {
        msg: "Unauthorizate!",
      },
    });
  }

  try {
    const { comment } = await commentService.update(req.params.id, req.body);
    return res.json({
      success: true,
      data: {
        comment,
      },
    });
  } catch (e) {
    console.log(e);
    if (e.message === "Comment Not found!") {
      return res.status(404).json({
        success: false,
        errors: {
          msg: e.message,
        },
      });
    }
    return res.status(500).json({
      success: false,
      errors: {
        msg: "Something went wrong!",
      },
    });
  }
};

const deleteComment = async (req, res) => {
  if (!(await commentService.checkIfUserIsAuth(req.user, req.params.id))) {
    return res.status(401).json({
      success: false,
      errors: {
        msg: "Unauthorizate!",
      },
    });
  }

  try {
    const { comment } = await commentService.deleteComment(req.params.id);

    return res.json({
      success: true,
      data: {
        msg: "Deleted successfully!",
        comment,
      },
    });
  } catch (e) {
    if (e.message === "Comment not found!") {
      return res.status(404).json({
        success: false,
        errors: {
          msg: e.message,
        },
      });
    }
    return res.status(500).json({
      success: false,
      errors: {
        msg: "Something went wrong!",
      },
    });
  }
};

module.exports = {
  update,
  deleteComment,
};
