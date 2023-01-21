import Comment from '../models/comment';
import Meetup from '../models/meetup';

export const createQuestion = async (request, response) => {
  try {
    const { meetupId, userId, content } = request.body;
    const question = await Comment.create({
      meetup: meetupId,
      user: userId,
      content,
      // type: 'question',
      createdAt: new Date(),
    });
    const meetup = await Meetup.findById(meetupId);
    meetup.totalComments++;
    meetup.comments.push(question);
    meetup.save();
    response.status(201).json({
      question,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createReply = async (request, response) => {
  try {
    const { meetupId, userId, content } = request.body;
    const reply = await Comment.create({
      meetup: meetupId,
      user: userId,
      content,
      type: 'reply',
      replyTo: request.params.id, // reply相手のcomment idがここに入ることになる。
      createdAt: new Date(),
    });
    const meetup = await Meetup.findById(meetupId);
    meetup.totalComments++;
    meetup.comments.push(reply);
    meetup.save();
    response.status(201).json({
      reply,
    });
  } catch (error) {
    console.log(error);
  }
};
