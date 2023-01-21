import LauncherAndPatronRelationship from '../models/launcherAndPatronRelationship';
import User from '../models/user';

export const createLauncherAndPatronRelationship = async (request, response) => {
  try {
    const { launcherId, patron } = request.body;
    const launcherAndPatronRelationship = await LauncherAndPatronRelationship.create({
      launcher: launcherId,
      patron: patron._id,
    });

    const user = await User.findById(launcherId);
    user.statsOverview.totalPatrons++;
    user.save();

    response.status(200).json({
      patron: patron,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPatronsByLauncherId = async (request, response) => {
  try {
    const { launcherId } = request.params;
    const launcherAndPatronRelationship = await LauncherAndPatronRelationship.find({
      launcher: launcherId,
    }).populate({
      path: 'patron',
      select: 'name photo',
    });

    const patrons = launcherAndPatronRelationship.map((relationship) => {
      return relationship.patron;
    });
    response.status(200).json({
      patrons,
    });
  } catch (error) {
    console.log(error);
  }
};
