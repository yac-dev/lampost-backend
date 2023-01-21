import BadgeAndUserRelationship from '../models/badgeAndUserRelationship';
import BadgeTag from '../models/badgeTag';
import BadgeTagAndUserRelationship from '../models/badgeTagAndUserRelationship';
import User from '../models/user';

export const addBadgesToUser = async (request, response) => {
  try {
    const { badgeIds } = request.body;
    const relationshipObjects = badgeIds.map((badgeId) => {
      return {
        badge: badgeId,
        user: request.params.userId,
        badgeTags: [],
        link: '',
        createdAt: new Date(),
      };
    });
    const user = await User.findById(request.params.userId);
    if (user.topBadges.length <= 4) {
      const restSpace = 4 - user.topBadges.length;
      const copiedBadges = [...badgeIds];
      const spliced = copiedBadges.splice(0, restSpace);
      user.topBadges.push(...spliced);
      user.save();
    }
    // これ、array of objects [{badgeId: 111, userId: 3333, url: '', createdAt: new Date()}, {badgeId: 2222, userId: 3333}]でinsertManyだな。
    const badgeAndUserRelationships = await BadgeAndUserRelationship.insertMany(relationshipObjects);
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const getBadgeDatasByUserId = async (request, response) => {
  try {
    const badgeAndUserRelationships = await BadgeAndUserRelationship.find({ user: request.params.userId })
      .populate({
        path: 'badge',
        select: 'name icon color',
      })
      .populate({ path: 'badgeTags' });
    const userBadgeDatas = badgeAndUserRelationships.map((relationship) => {
      return {
        badge: relationship.badge,
        link: relationship.link,
        badgeTags: relationship.badgeTags,
      };
    });
    response.status(200).json({
      userBadgeDatas,
    });
  } catch (error) {
    console.log(error);
  }
};

// export const getBadgeDetailByUserId = async (request, response) => {
//   try {
//     const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({
//       badge: request.params.badgeId,
//       user: request.params.userId,
//     })
//       .populate({ path: 'badge' })
//       .populate({ path: 'badgeTags' });
//     // さらに、badge holders全員を取ってくる。
//     // const badgeHolders = await BadgeAndUserRelationship.find({ badge: request.params.badgeId }).populate({
//     //   path: 'user',
//     //   select: 'name photo',
//     // });
//     console.log(badgeAndUserRelationship);
//     response.status(200).json({
//       badgeDetail: {
//         badge: badgeAndUserRelationship.badge,
//         url: badgeAndUserRelationship.url,
//         badgeTags: badgeAndUserRelationship.badgeTags,
//         // badgeHolders,
//       },
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getBadgeHolders = async (request, response) => {
  try {
    const badgeAndUserRelationship = await BadgeAndUserRelationship.find({ badge: request.params.badgeId }).populate({
      path: 'user',
      select: 'name photo',
    });

    const badgeHolders = badgeAndUserRelationship.map((relationship) => {
      return relationship.user;
    });
    console.log(badgeHolders);
    response.status(200).json({
      badgeHolders,
    });
  } catch (error) {
    console.log(error);
  }
};

//
// なんか一つにまとめると、まじで訳わからなくなるんだよな。
// 正直、ここで全部一気にやる必要もないわな。
// totalholdersをいちいち更新しないといけないのが辛いよな。。。結局自分でもっておくときついわ。数がどんどん更新していくから、すごく便どいことになる。
// export const addBadgeTagsToUser = async (request, response) => {
//   try {
//     // patchか。
//     // creatingBadgeTagNameかな。もっと言うと、
//     const { selectedBadgeTags, creatingBadgeTagNames } = request.body;
//     const selectedBadgeTagIds = Object.keys(selectedBadgeTags); // 最終的に、badgeandusrrelationshipのbadgetagsに入れるためのもん。
//     const responseBadgeTags = Object.values(selectedBadgeTags); // responseで返すためのもん。
//     // selectedBadgeTags { 1111: {_id: '1111', name: 'Nice', badge: '2222', totalHolders: 10}, 2222: { _id: 2222, name: 'hello' , totalHolders: 30 } }
//     // createdBadgeTags ['eexperienced', 'nice']
//     const addingBadgeTagIds = [...selectedBadgeTagIds];
//     const creatingBadgeTags = creatingBadgeTagNames.map((badgeTagName) => {
//       return {
//         badge: request.params.badgeId,
//         name: badgeTagName,
//         totalHolders: 1,
//       };
//     });
//     const createdBadgeTags = await BadgeTag.insertMany(creatingBadgeTags);
//     addingBadgeTagIds.push(...createdBadgeTags.map((badgeTag) => badgeTag._id));
//     responseBadgeTags.push(...createdBadgeTags);
//     console.log('adding these', addingBadgeTagIds);
//     console.log('responding these', responseBadgeTags);

//     const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({
//       badge: request.params.badgeId,
//       user: request.params.userId,
//     });
//     badgeAndUserRelationship.badgeTags.push(...addingBadgeTagIds);
//     badgeAndUserRelationship.save();

//     // badgeTagとuserのrelationshipを作らないといけない。
//     // const badgeTagAnduserTable = addingBadgeTagIds.map((badgeTagId) => {
//     //   return {
//     //     badgeTag: badgeTagId,
//     //     user: request.params.userId,
//     //   };
//     // });
//     // await BadgeTagAndUserRelationship.insertMany(badgeTagAnduserTable);
//     // // 数を更新する。
//     // const badgeTags = await BadgeTag.find({ _id: { $in: selectedBadgeTagIds } });
//     // for (let i = 0; i < badgeTags.length; i++) {
//     //   badgeTags[i].totalHolders++;
//     //   badgeTags[i].save();
//     // }
//     response.status(200).json({
//       badgeId: request.params.badgeId,
//       badgeTags: responseBadgeTags,
//     });
//     // query4回ってどうだろう。。。
//   } catch (error) {
//     console.log(error);
//   }
// };

// とりえずこうしておいて、userに早く結果を返す。その後にbadgeTagとuserの関係を作る。
export const addBadgeTagsToUser = async (request, response) => {
  try {
    const { addedBadgeTags, creatingBadgeTagNames } = request.body;
    //最終的に、badge user relationshipのbadgeTags fieldにぶち込むarray
    const pushingBadgeTagIds = Object.keys(addedBadgeTags);
    let createdBadgeTags = [];

    // まず、badge user relationshipを見つける。これがなきゃ始まらない。
    const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({
      badge: request.params.badgeId,
      user: request.params.userId,
    });

    // もしbadge tagをcreateしようとしているなら、これを動かす。
    if (creatingBadgeTagNames.length) {
      const badgeTagObjects = creatingBadgeTagNames.map((badgeTagName) => {
        return {
          name: badgeTagName,
          badge: request.params.badgeId,
          totalHolders: 0,
        };
      });
      createdBadgeTags = await BadgeTag.insertMany(badgeTagObjects);
      const createdBadgeTagIds = createdBadgeTags.map((badgeTag) => {
        return badgeTag._id;
      });
      pushingBadgeTagIds.push(...createdBadgeTagIds);
    }
    console.log(pushingBadgeTagIds);

    badgeAndUserRelationship.badgeTags.push(...pushingBadgeTagIds);
    badgeAndUserRelationship.save();

    // badgeTagの数を更新する。
    const badgeTags = await BadgeTag.find({ _id: { $in: pushingBadgeTagIds } });
    for (let i = 0; i < badgeTags.length; i++) {
      badgeTags[i].totalHolders++;
      badgeTags[i].save();
    }

    //最終的なresponseでは、badge tagsのdataそのものを返す。idではなくて。
    response.status(200).json({
      badgeId: request.params.badgeId,
      badgeTags: [...Object.values(addedBadgeTags), ...createdBadgeTags],
    });
  } catch (error) {
    console.log(error);
  }
};

export const addLinkToUser = async (request, response) => {
  try {
    const { linkText } = request.body;
    const badgeAndUserRelationship = await BadgeAndUserRelationship.findOne({
      badge: request.params.badgeId,
      user: request.params.userId,
    });
    badgeAndUserRelationship.link = linkText;
    badgeAndUserRelationship.save();

    response.status(200).json({
      badgeId: request.params.badgeId,
      link: linkText,
    });
  } catch (error) {
    console.log(error);
  }
};
