import BadgeTag from '../models/badgeTag';

export const getBadgeTagsByBadgeId = async (request, response) => {
  try {
    const badgeTags = await BadgeTag.find({ badge: request.params.badgeId });
    response.status(200).json({
      badgeTags,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createBadgeTag = async (request, response) => {
  try {
    const { creatingBadgeTagNames, badgeId } = request.body;
    const badgeTagObjects = creatingBadgeTagNames.map((badgeTagName) => {
      return {
        name: badgeTagName,
        badge: badgeId,
        totalHolders: 1,
      };
    });

    const badgeTags = await BadgeTag.insertMany(badgeTagObjects);
    response.status(200).json({
      badgeTags,
    });
  } catch (error) {
    console.log(error);
  }
};
