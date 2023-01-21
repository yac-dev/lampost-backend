import LibraryAndUserRelationship from '../models/libraryAndUserRelationship';
import Library from '../models/library';

export const joinLibrary = async (request, response) => {
  try {
    const { libraryId, userId } = request.body;
    const libraryAndUserRelationship = await LibraryAndUserRelationship.create({
      library: libraryId,
      user: userId,
    });

    await libraryAndUserRelationship.populate({
      path: 'library',
      select: 'name color thumbnail',
      populate: { path: 'thumbnail' },
    });
    response.status(201).json({
      // relationshipのobjectをそのまま渡さないことね。populateしたobjectをそのまま渡す。
      library: libraryAndUserRelationship.library,
    });
  } catch (error) {
    console.log(error);
  }
};

export const leaveLibrary = async (request, response) => {
  try {
    const { libraryId, userId } = request.params;
    const libraryAndUserRelationship = await LibraryAndUserRelationship.deleteOne({ library: libraryId, user: userId });
    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMyJoinedLibrary = async (request, response) => {
  try {
    const myJoinedLibrariesRelationships = await LibraryAndUserRelationship.find({ user: request.params.userId })
      .select({ library: 1 })
      .populate({
        path: 'library',
        select: 'name color',
        populate: { path: 'thumbnail' },
      });
    // [ {library: {name: 'qqqqq', description: 'hfuhoifhiqw'}, user: {'11111'} ]って面倒だからね。
    // 少なくとも、relationshipをまんま渡すのはやだわ。ごっちゃになる。
    const myJoinedLibraries = myJoinedLibrariesRelationships.map((libraryRelationship) => {
      return libraryRelationship.library;
    });

    response.status(200).json({
      myJoinedLibraries,
    });
  } catch (error) {}
};

export const getUsersByLibraryId = async (request, response) => {
  try {
    const libraryAndUserRelationships = await LibraryAndUserRelationship.find({
      library: request.params.libraryId,
    }).populate({
      path: 'user',
      populate: { path: 'topBadges' },
    });
    const users = libraryAndUserRelationships.map((relationship) => {
      return relationship.user;
    });

    response.status(200).json({
      users,
    });
  } catch (error) {
    console.log(error);
  }
};
