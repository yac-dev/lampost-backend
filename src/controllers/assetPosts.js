import AssetPost from '../models/assetPost';
import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';

export const createAssetPost = async (request, response) => {
  try {
    const { caption, userId, libraryId, assets } = request.body;
    await AssetPost.create({
      caption,
      assets,
      user: userId,
      library: libraryId,
      createdAt: new Date(),
      totalReactions: 0,
      firstFourReactions: [],
    });
    const assetDatas = assets.map((asset) => {
      return {
        library: libraryId,
        asset,
      };
    });
    await LibraryAndAssetRelationship.insertMany(assetDatas);

    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAssetPosts = async (request, response) => {
  try {
    const assetPosts = await AssetPost.find({ library: request.params.libraryId }).populate([
      { path: 'user', select: 'name photo' },
      { path: 'assets' },
    ]);
    response.status(200).json({
      assetPosts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAssetPostById = async (request, response) => {
  try {
    const assetPost = await AssetPost.findById(request.params.id).populate([
      { path: 'user', select: 'name photo' },
      { path: 'assets' },
    ]);

    response.status(200).json({
      libraryPost: assetPost,
    });
  } catch (error) {
    console.log(error);
  }
};
