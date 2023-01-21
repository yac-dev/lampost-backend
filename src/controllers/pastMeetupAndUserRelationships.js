import PastMeetupAndUserRelationship from '../models/pastMeetupAndUserRelationship';

export const getPastMeetupsByUserId = async (request, response) => {
  try {
    const pastMeetupAndUserRelationships = await PastMeetupAndUserRelationship.find({
      user: request.params.userId,
    }).populate({
      path: 'pastMeetup',
      select: 'assets attendees badges startDateAndTime launcher place title',
      populate: [
        {
          path: 'launcher',
          select: 'name photo _id',
        },
        {
          path: 'assets',
        },
        {
          path: 'badges',
          select: 'color icon name',
        },
      ],
    });
    const pastMeetups = pastMeetupAndUserRelationships.map((pastMeetupAndUserRelationship) => {
      return pastMeetupAndUserRelationship.pastMeetup;
    });

    response.status(200).json({
      pastMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLaunchedMeetupsByLauncherId = async (request, response) => {
  try {
    const pastMeetupAndUserRelationships = await PastMeetupAndUserRelationship.find({
      launcher: request.params.launcherId,
    }).populate({
      path: 'pastMeetup',
      select: 'assets attendees badges startDateAndTime launcher place title',
      populate: [
        {
          path: 'launcher',
          select: 'name photo _id',
        },
        {
          path: 'assets',
        },
        {
          path: 'badges',
          select: 'color icon name',
        },
      ],
    });

    console.log(pastMeetupAndUserRelationships);

    const launchedMeetups = pastMeetupAndUserRelationships.map((pastMeetupAndUserRelationship) => {
      return {
        relationship: pastMeetupAndUserRelationship._id,
        title: pastMeetupAndUserRelationship.pastMeetup.title,
        place: pastMeetupAndUserRelationship.pastMeetup.place,
        startDateAndTime: pastMeetupAndUserRelationship.pastMeetup.startDateAndTime,
        badges: pastMeetupAndUserRelationship.pastMeetup.badges,
        assets: pastMeetupAndUserRelationship.pastMeetup.assets,
        launcher: pastMeetupAndUserRelationship.pastMeetup.launcher,
        representation: pastMeetupAndUserRelationship.representation,
        totalAttendees: pastMeetupAndUserRelationship.pastMeetup.attendees.length,
        totalImpressions: pastMeetupAndUserRelationship.impressions.length,
      };
    });
    console.log(launchedMeetups);
    response.status(200).json({
      launchedMeetups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPastMeetupDetailByMeetupId = async (request, response) => {
  try {
    const pastMeetupAndUserRelationship = await PastMeetupAndUserRelationship.findById(request.params.id)
      .populate({
        path: 'pastMeetup',
        populate: { path: 'attendees', select: 'name photo' },
      })
      .populate({
        path: 'impressions',
        populate: { path: 'user', select: 'name photo' },
      });

    console.log('this is a object', pastMeetupAndUserRelationship);

    response.status(200).json({
      attendees: pastMeetupAndUserRelationship.pastMeetup.attendees,
      impressions: pastMeetupAndUserRelationship.impressions,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createImpression = async (request, response) => {
  try {
    const { text, user } = request.body;
    const pastMeetupAndUserRelationship = await PastMeetupAndUserRelationship.findById(request.params.id);
    const impressionObject = {
      text,
      user: user._id,
      createdAt: new Date(),
    };
    pastMeetupAndUserRelationship.impressions.push(impressionObject);
    pastMeetupAndUserRelationship.save();
    response.status(200).json({
      impression: { text, user: { name: user.name, photo: user.photo }, createdAt: impressionObject.createdAt },
    });
  } catch (error) {
    console.log(error);
  }
};
