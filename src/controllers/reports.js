import ReportRelationshipBetweenMeetupAndUser from '../models/reportRelationshipBetweenMeetupAndUser.js';
import ReportMeetupMember from '../models/reportMeetupMember.js';
import ReportUser from '../models/reportUser';
import ReportAsset from '../models/reportAsset';
import ReportLibrary from '../models/reportLibrary.js';

export const reportMeetup = async (request, response) => {
  try {
    const { meetupId, userId, issue, description } = request.body;
    const reportRelationshipBetweenMeetupAndUser = await ReportRelationshipBetweenMeetupAndUser.create({
      meetup: meetupId,
      user: userId,
      issue,
      description,
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const reportMeetupMember = async (request, response) => {
  try {
    const { meetupId, userId, reportedUserId, issue, description } = request.body;
    const reportMeetupMember = await ReportMeetupMember.create({
      meetup: meetupId,
      user: userId,
      reportedUser: reportedUserId,
      issue,
      description,
    });
    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const reportUser = async (request, response) => {
  try {
    const { userId, reportedUserId, issue, description } = request.body;
    const reportUser = await ReportUser.create({
      user: userId,
      reportedUser: reportedUserId,
      issue,
      description,
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const reportAsset = async (request, response) => {
  try {
    const { assetId, userId, issue, description } = request.body;
    const reportAsset = await ReportAsset.create({
      asset: assetId,
      user: userId,
      issue,
      description,
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};

export const reportLibrary = async (request, response) => {
  try {
    const { libraryId, userId, issue, description } = request.body;
    const reportLibrary = await ReportLibrary.create({
      library: libraryId,
      user: userId,
      issue,
      description,
    });

    response.status(201).json({
      message: 'success',
    });
  } catch (error) {
    console.log(error);
  }
};
