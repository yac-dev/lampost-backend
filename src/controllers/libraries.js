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
    const { name, badges, description, assets, launcher } = request.body;
    const library = await Library.create({
      name,
      badges,
      description,
      launcher: launcher._id,
      thumbnail: assets[0]._id,
      totalAssets: assets.length,
      totalMembers: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      rate: 5,
      createdAt: new Date(),
    });
    // assetsがあれば、libraryとassetsのrelationshipを作ると。
    const relationships = assets.map((asset) => {
      return {
        library: library._id,
        asset: asset._id,
      };
    });
    const libraryAndAssetRelationships = await LibraryAndAssetRelationship.insertMany(relationships);
    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: library._id,
      user: launcher._id,
    });
    response.status(200).json({
      library,
    });
  } catch (error) {
    console.log(error);
  }
};
