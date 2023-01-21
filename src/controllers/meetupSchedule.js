import schedule from 'node-schedule';
import Meetup from '../models/meetup';

// start時とend時でそれぞれ挙動を変えないといけないんだわ。そう言えば。startとstopだけではいかん。
// meetupのid、そしてそれに対してstartdateを変えたか、durationを変えたか、どっちがあるかで挙動を変えるように実装するんだな。
export const setMeetupStart = async (request, response) => {
  try {
    const meetupId = request.params.id;
    schedule.scheduleJob(meetupId, { start: new Date(startDateAndTime), end: new Date(startDateAndTime) }, () => {
      console.log('set meetup!');
      // send push notification
      response.status(200).json({
        message: 'successfully set!',
      });
    });
  } catch (error) {
    console.log();
  }
};

export const editMeetupSchedule = async (request, response) => {
  try {
    const meetupId = request.params.id;
    var editingJob = schedule.scheduledJobs[meetupId];
    editingJob.cancel();
    // bodyできたdataandtime, durationをここで再度設定する。
    schedule.scheduleJob(meetupId, { start: new Date(startDateAndTime), end: new Date(startDateAndTime) }, async () => {
      const meetup = await Meetup.findById(meetupId);
      meetup.startDateAndTime = '';
      meetup.duration = '';
      meetup.save();
      response.status(200).json({
        meetup,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
