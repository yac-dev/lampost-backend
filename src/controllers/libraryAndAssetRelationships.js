import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';

export const getAssetsByLibraryId = async (request, response) => {
  try {
    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.find({
      library: request.params.libraryId,
    }).populate({
      path: 'asset',
    });

    const assets = libraryAndAssetRelationships.map((relationship) => {
      return relationship.asset;
    });

    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const postAssetsByLibraryId = async (request, response) => {
  try {
    const { assets } = request.body;
    const assetDatas = assets.map((asset) => {
      return {
        library: request.params.libraryId,
        asset,
      };
    });
    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.insertMany(assetDatas);
    response.status(200).json({
      libraryAndAssetRelationships,
    });
  } catch (error) {
    console.log(error);
  }
};
