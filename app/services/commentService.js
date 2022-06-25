const Comment = require("./../models/Comment");

const create = async (data) => {
  return await new Comment({
    user: data.userId,
    post: data.postId,
    comment: data.comment,
  }).save();
};

const getCommentsPerPost = async (postId) => {
  return await Comment.find({
    post: postId,
  }).select({ comment: 1 });
};

const update = async (id, data) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment Not found!");
  }
  const updatedComment = await Comment.updateOne(
    { _id: comment.id },
    {
      $set: {
        comment: data.comment,
      },
    },
    { new: true }
  );

  return {
    comment: updatedComment,
  };
};
const deleteComment = async (id) => {
  const comment = await Comment.findById(id);
  if (!comment) {
    throw new Error("Comment Not found");
  }
  await Comment.deleteOne({ _id: id });
  return {
    comment,
  };
};

const checkIfUserIsAuth = async (user, id) => {
  return (
    user.role == "admin" ||
    (await Comment.findOne({
      id,
      user: user.id,
    }))
  );
};
module.exports = {
  create,
  getCommentsPerPost,
  update,
  deleteComment,
  checkIfUserIsAuth,
};
