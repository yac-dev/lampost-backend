import User from '../models/user';
import Meetup from '../models/meetup';
import jwt from 'jsonwebtoken';

export const authorization = async (request, response, next) => {
  try {
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer')) {
      let token = request.headers.authorization.split(' ')[1];
      if (!token) {
        console.log('Can not authorize because of no token');
      }
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY); // decoded {id: _id}っていう形。
      const user = await User.findById(decoded.id);
      // .populate({
      //   path: 'upcomingMeetups',
      //   populate: {
      //     path: 'meetup',
      //     model: Meetup,
      //   },
      // });
      if (!user) {
        throw new Error('Cant find that user');
      }
      request.user = user;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
