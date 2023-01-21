import Badge from '../models/badge';
import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import User from '../models/user';
import Asset from '../models/asset';

export const getBadges = async (request, response) => {
  try {
    // const filteringUserBadges = [];
    let badges = Badge.find({}); // grab all
    if (request.body.userId) {
      const badgeAndUserRelationships = await BadgeAndUserRelationship.find({ user: request.body.userId }).populate({
        path: 'badge',
      });
      // const user = await User.findById(request.body.userId).populate({
      //   path: 'badges',
      //   model: BadgeStatus,
      //   populate: {
      //     path: 'badge',
      //     model: Badge,
      //   },
      // });

      const filteringUserBadges = badgeAndUserRelationships.map((element) => element.badge._id);
      // for (let i = 0; i < user.badges.length; i++) {
      //   console.log(user.badges[i]);
      //   filteringUserBadges.push(user.badges[i].badge._id);
      // }
      badges.where({ _id: { $nin: filteringUserBadges } });
    }

    let queryFilters = [];

    if (request.query.type) {
      const queryByType = { type: request.query.type };
      queryFilters.push(queryByType);
    }
    if (request.query.name) {
      const queryByName = { name: request.query.name };
      queryFilters.push(queryByName);
    }

    if (queryFilters.length) {
      badges = badges.where({ $and: queryFilters });
    }

    const limit = 120;
    const page = request.query.page;
    const skip = (page - 1) * limit;

    badges = await badges.skip(skip).limit(limit);

    response.status(200).json({
      badges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgesByFilteringUserBadges = async (request, response) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const getBadgesByRolls = async (request, response) => {
  try {
    let badges = Badge.find({}).populate({
      path: 'rolls',
      model: Roll,
    });
    badges = await badges.limit(10);
    response.status(200).json({
      badgeFolders: badges,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeRolls = async (request, response) => {
  try {
    let badgeRolls = Badge.findById(request.params.id)
      .populate({
        path: 'rolls',
        model: Roll,
        populate: {
          path: 'assets',
          model: Asset,
        },
      })
      .select({ _id: 1, rolls: 1 });
    console.log('working');

    badgeRolls = await badgeRolls.limit(10);
    response.status(200).json({
      badgeRolls: badgeRolls.rolls,
    });
  } catch (error) {
    console.log(error);
  }
};
