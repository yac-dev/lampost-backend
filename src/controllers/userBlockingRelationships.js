import UserBlockingRelationship from '../models/userBlockingRelationship';

export const blockUser = async (request, response) => {
  try {
    const { userId, blockingUserId } = request.body;
    const userBlockingRelationship = await UserBlockingRelationship.create({
      user: userId,
      blocking: blockingUserId,
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const unblockUser = async (request, response) => {
  try {
    const { userId, blockingUserId } = request.body;
    const userBlockingRelationship = await UserBlockingRelationship.findOneAndRemove({
      user: userId,
      blocking: blockingUserId,
    });
    response.status(204).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
