const Reaction = require("./../models/Reaction");

const updateOrCreate = async (data) => {
  const reaction = await Reaction.findOne({
    user: data.userId,
    post: data.postId,
  });

  if (!reaction) {
    return await new Reaction({
      user: data.userId,
      post: data.postId,
      liked: data.liked,
      favorite: data.favorite,
    }).save();
  }

  return await Reaction.updateOne(
    { _id: reaction.id },
    {
      $set: {
        liked: data.liked ? !reaction.liked : reaction.liked,
        favorite: data.favorite ? !reaction.favorite : reaction.favorite,
      },
    },
    {
      new: true,
    }
  );
};

const getFavoritesPerPost = async (post) => {
  return await Reaction.find({
    post,
    favorite: 1,
  }).countDocuments();
};

const getLikesPerPost = async (post) => {
  return await Reaction.find({
    post,
    liked: 1,
  }).countDocuments();
};

module.exports = {
  getFavoritesPerPost,
  getLikesPerPost,
  updateOrCreate,
};
