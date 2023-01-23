import AssetAndReactionAndUserRelationship from '../models/assetAndReactionAndUserRelationship';
import Reaction from '../models/reaction';
import Library from '../models/library';

export const createReaction = async (request, response) => {
  try {
    const { assetId, user, text, selectedEmoji, libraryId } = request.body;
    const reactionContent = text + ' ' + selectedEmoji;
    const reaction = await Reaction.create({
      content: reactionContent,
    });

    const assetAndReactionAndUserRelationship = await AssetAndReactionAndUserRelationship.create({
      asset: assetId,
      reaction: reaction._id,
      user: user._id,
      createdAt: new Date(),
    });

    const library = await Library.findById(libraryId);
    library.emotions.push(selectedEmoji);
    library.save();

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

export const getReactionsByAssetId = async (request, response) => {
  try {
    const assetAndReactionAndUserRelationships = await AssetAndReactionAndUserRelationship.find({
      asset: request.params.assetId,
    }).populate([{ path: 'reaction' }, { path: 'user', select: 'name photo' }]);

    const reactions = {};
    for (let i = 0; i < assetAndReactionAndUserRelationships.length; i++) {
      if (reactions[assetAndReactionAndUserRelationships[i].reaction._id]) {
        reactions[assetAndReactionAndUserRelationships[i].users][assetAndReactionAndUserRelationships[i].user._id] =
          assetAndReactionAndUserRelationships[i].user; // hash tableでまとめる。
        reactions[assetAndReactionAndUserRelationships[i].totalCounts]++;
      } else {
        const object = {};
        object['_id'] = assetAndReactionAndUserRelationships[i].reaction._id;
        object['content'] = assetAndReactionAndUserRelationships[i].reaction.content;
        object['totalCounts'] = 1;
        object['users'] = {
          [assetAndReactionAndUserRelationships[i].user._id]: assetAndReactionAndUserRelationships[i].user,
        };
        reactions[assetAndReactionAndUserRelationships[i].reaction._id] = object;
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
    const { assetId, reaction, userId, libraryId } = request.body;
    const assetPostAndReactionAndUserRelationship = await AssetAndReactionAndUserRelationship.create({
      asset: assetId,
      reaction: reaction._id,
      user: userId,
    });

    const library = await Library.findById(libraryId);
    library.emotions.push(reaction.content);
    library.save();

    response.status(200).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
