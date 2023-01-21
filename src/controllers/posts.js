import Post from '../models/post';

export const createPost = async (request, response) => {
  try {
    const { content, postType, pics, userId, place } = request.body;
    const post = new Post({
      content,
      pics,
      type: postType,
      // limit,
      user: userId,
      place,
      isPublic: true,
      createdAt: new Date(),
    });
    if (pics) {
      post.pics = pics;
    }
    await post.save();
    response.status(201).json({
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (request, response) => {
  try {
    const posts = await Post.find().populate({
      path: 'user',
      model: 'User',
    });

    response.status(200).json({
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};
