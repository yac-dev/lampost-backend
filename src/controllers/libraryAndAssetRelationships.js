import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';
import Asset from '../models/asset';
import Library from '../models/library';

export const getAssetsByLibraryId = async (request, response) => {
  try {
    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.find({
      library: request.params.libraryId,
    }).populate({
      path: 'asset',
      populate: { path: 'badges', populate: { path: 'badge', select: '_id icon color' } },
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
    const { assetId } = request.body;
    const library = await Library.findById(request.params.libraryId);
    const libraryBadges = library.badges;
    const asset = await Asset.findById(assetId);
    console.log('library badgeIds', libraryBadges);
    console.log('asset is ', asset);

    // loopが動かない。lengthがないと。
    if (!asset.badges.length) {
      const arr = libraryBadges.map((badge) => {
        return {
          badge: badge,
          totalCounts: 0,
        };
      });
      asset.badges.push(...arr);
    } else {
      for (let i = 0; i < libraryBadges.length; i++) {
        if (asset.badges.some((badgeObject) => badgeObject.badge.toString() === libraryBadges[i])) {
          null;
        } else {
          asset.badges.push({
            badge: libraryBadges[i],
            totalCounts: 0,
          });
        }
      }
      asset.save();
    }

    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.create({
      asset: assetId,
      library: request.params.libraryId,
    });
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
