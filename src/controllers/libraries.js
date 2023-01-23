import Library from '../models/library';
import LibraryAndAssetRelationship from '../models/libraryAndAssetRelationship';
import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
// import Roll from '../models/roll';
import Asset from '../models/asset';
import User from '../models/user';

const colors = ['red1', 'blue1', 'yellow1', 'violet1', 'green1', 'lightBlue1'];

export const getLibraries = async (request, response) => {
  try {
    const libraries = await Library.find({})
      .populate({
        path: 'launcher',
        select: 'name photo',
      })
      .populate({
        path: 'thumbnail',
      });
    response.status(200).json({
      libraries,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLibrary = async (request, response) => {
  try {
    const library = await Library.findById(request.params.id)
      .populate({
        path: 'launcher',
        model: User,
      })
      .populate({
        path: 'badges',
      });
    response.status(200).json({
      library,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createLibrary = async (request, response) => {
  try {
    const { name, badges, description, asset, launcher } = request.body;
    const library = await Library.create({
      name,
      badges,
      description,
      launcher: launcher._id,
      thumbnail: asset._id,
      totalAssets: 1,
      totalMembers: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      createdAt: new Date(),
    });

    const queriedAsset = await Asset.findById(asset._id);
    if (!queriedAsset.badges.length) {
      const arr = badges.map((badge) => {
        return {
          badge: badge,
          totalCounts: 0,
        };
      });
      queriedAsset.badges.push(...arr);
      queriedAsset.save();
    } else {
      for (let i = 0; i < badges.length; i++) {
        if (queriedAsset.badges.some((badgeObject) => badgeObject.badge.toString() === badges[i])) {
          null;
        } else {
          queriedAsset.badges.push({
            badge: badges[i],
            totalCounts: 0,
          });
        }
      }
      queriedAsset.save();
    }

    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.create({
      library: library._id,
      asset: asset._id,
    });
    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: library._id,
      user: launcher._id,
    });
    response.status(200).json({
      library: { _id: library._id, name: library.name, thumbnail: asset.data },
    });
  } catch (error) {
    console.log(error);
  }
};
