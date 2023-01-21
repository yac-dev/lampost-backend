import BadgeTag from '../models/badgeTag';
import BadgeTagAndUserRelationship from '../models/badgeTagAndUserRelationship';

// export const addNewBadgeTagToUser = async (request, response) => {
//   try {
//     const { name, badgeId } = request.body;
//     const badgeTag = await BadgeTag.create({
//       name,
//       badge: badgeId,
//       totalHolders: 1,
//     });

//     const badgeTagAndUserRelationship = await BadgeTagAndUserRelationship.create({
//       badgeTag: BadgeTag._id,
//       user: request.body.userId,
//     });

//     response.status(200).json({
//       badgeTag,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const createBadgeTagAndUserRelationship = async (request, response) => {
  try {
    const { badgeTags, userId } = request.body;
    // const addedBadgeTagIds = addedBadgeTags.map((badgeTag) => {
    //   return badgeTag._id;
    // })

    const badgeTagAndUserTable = badgeTags.map((badgeTag) => {
      return {
        badgeTag: badgeTag._id,
        user: userId,
      };
    });
    const badgeTagAndUserRelationships = await BadgeTagAndUserRelationship.insertMany(badgeTagAndUserTable);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
