import AssetAndUserRelationship from '../models/AssetAndUserRelationship';

export const createAsset = () => {
  // tagした人にもdistributeするようにしたいね。
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getAssetsByUserId = async (request, response) => {
  try {
    const assetAndUserRelationships = await AssetAndUserRelationship.find({ user: request.params.userId }).populate({
      path: 'asset',
      select: 'data type _id',
    });
    const assets = assetAndUserRelationships.map((relationship) => {
      return relationship.asset;
    });
    response.status(200).json({
      assets,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAssetByAssetIdAndUserId = async (request, response) => {
  try {
    const assetAndUserRelationship = await AssetAndUserRelationship.findOne({
      asset: request.params.assetId,
      user: request.params.userId,
    }).populate({
      path: 'asset',
      populate: [
        {
          path: 'badges',
        },
        {
          path: 'createdBy',
        },
        {
          path: 'taggedPeople',
        },
      ],
    });

    response.status(200).json({
      asset: assetAndUserRelationship.asset,
    });
  } catch (error) {
    console.log(error);
  }
};
