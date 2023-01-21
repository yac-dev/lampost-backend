import AssetPostAndReactionAndUserRelationship from '../models/assetPostAndReactionAndUserRelationship';
import Reaction from '../models/reaction';
import AssetPost from '../models/assetPost';

export const createReaction = async (request, response) => {
  try {
    const { libraryPostId, user, text, selectedEmoji } = request.body;
    const reactionContent = text + ' ' + selectedEmoji;
    const reaction = await Reaction.create({
      content: reactionContent,
    });

    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUserRelationship.create({
      assetPost: libraryPostId,
      reaction: reaction._id,
      user: user._id,
    });

    const assetPost = await AssetPost.findById(libraryPostId);
    assetPost.topEmojis.push(); // reaction contentのemoji部分だけをarrayにpush したい。
    if (assetPost.topEmojis.length < 100) {
      assetPost.topEmojis.push(selectedEmoji);
      assetPost.save();
    }

    response.status(200).json({
      reaction: {
        _id: reaction._id,
        content: reaction.content,
        totalCounts: 1,
        users: { [user._id]: user },
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getReactionsByAssetPostId = async (request, response) => {
  try {
    const assetPostAndReactionAndUserRelationships = await AssetPostAndReactionAndUserRelationship.find({
      assetPost: request.params.assetPostId,
    }).populate([{ path: 'reaction' }, { path: 'user', select: 'name photo' }]);
    console.log(assetPostAndReactionAndUserRelationships);

    const reactions = {};
    for (let i = 0; i < assetPostAndReactionAndUserRelationships.length; i++) {
      if (reactions[assetPostAndReactionAndUserRelationships[i].reaction._id]) {
        reactions[assetPostAndReactionAndUserRelationships[i].users][
          assetPostAndReactionAndUserRelationships[i].user._id
        ] = assetPostAndReactionAndUserRelationships[i].user; // hash tableでまとめる。
        reactions[assetPostAndReactionAndUserRelationships[i].totalCounts]++;
      } else {
        const object = {};
        object['_id'] = assetPostAndReactionAndUserRelationships[i].reaction._id;
        object['content'] = assetPostAndReactionAndUserRelationships[i].reaction.content;
        object['totalCounts'] = 1;
        object['users'] = {
          [assetPostAndReactionAndUserRelationships[i].user._id]: assetPostAndReactionAndUserRelationships[i].user,
        };
        reactions[assetPostAndReactionAndUserRelationships[i].reaction._id] = object;
      }
    }
    //{11111: {_id: 11111, content: 'Nice emoji', totalCounts: 3, users: [{_id: 111, name: 'aaaa', photo: 'some url'}]}}

    response.status(200).json({
      reactions,
    });
  } catch (error) {
    console.log(error);
  }
};

export const upvoteReaction = async (request, response) => {
  try {
    const { libraryPostId, reaction, userId } = request.body;
    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUserRelationship.create({
      assetPost: libraryPostId,
      reaction: reaction._id,
      user: userId,
    });

    const assetPost = await AssetPost.findById(libraryPostId);
    if (assetPost.topEmojis.length < 100) {
      assetPost.topEmojis.push(reaction.content); // ここ、絵文字の部分だけpopしていれる。
      assetPost.save();
    }
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const downvoteReaction = async (request, response) => {
  try {
    const { assetPostId, reactionId, userId } = request.body;
    console.log(assetPostId, reactionId, userId);
    const assetPostAndReactionAndUserRelationship = await AssetPostAndReactionAndUserRelationship.deleteOne({
      assetPost: assetPostId,
      reaction: reactionId,
      user: userId,
    });
    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
