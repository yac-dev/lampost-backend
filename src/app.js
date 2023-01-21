import express from 'express';
import cors from 'cors';
import './databases/mongoose';

// routers
import labRouter from './routers/labs';
import authRouter from './routers/auth';
import usersRouter from './routers/users';
import meetupsRouter from './routers/meetups';
import badgesRouter from './routers/badges';
import commentsRouter from './routers/comments';
import assetsRouter from './routers/assets';
import assetPostsRouter from './routers/assetPosts';
import librariesRouter from './routers/libraries';
import libraryAndUserRelationshipsRouter from './routers/libraryAndUserRelationships';
import pastMeetupAndUserRelationshipsRouter from './routers/pastMeetupAndUserRelationships';
import badgeAndUserRelationshipsRouter from './routers/badgeAndUserRelationships';
import badgeTagsRouter from './routers/badgeTags';
import badgeTagAndUserRelationshipsRouter from './routers/badgeTagAndUserRelationships';
import assetAndUserRelationshipsRouter from './routers/assetAndUserRelationships';
import libraryAndAssetRelationshipsRouter from './routers/libraryAndAssetRelationships';
import assetPostAndReactionAndUserRelationshipsRouter from './routers/assetPostAndReactionAndUserRelationships';
import loungeChatsRouter from './routers/loungeChats';
import launcherAndPatronRelationshisRouter from './routers/launcherAndPatronRelationshis';

// import postsRouter from './routers/posts';
// import usersRouter from './routers/users';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Hello guest');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/meetups', meetupsRouter);
app.use('/api/badges', badgesRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/assetposts', assetPostsRouter);
app.use('/api/libraries', librariesRouter);
app.use('/api/libraryanduserrelationships', libraryAndUserRelationshipsRouter);
app.use('/api/pastmeetupanduserrelationships', pastMeetupAndUserRelationshipsRouter);
app.use('/api/badgeanduserrelationships', badgeAndUserRelationshipsRouter);
app.use('/api/badgetags', badgeTagsRouter);
app.use('/api/badgetaganduserrelationships', badgeTagAndUserRelationshipsRouter);
app.use('/api/assetanduserrelationships', assetAndUserRelationshipsRouter);
app.use('/api/libraryandassetrelationships', libraryAndAssetRelationshipsRouter);
app.use('/api/assetpostandreactionanduserrelationships', assetPostAndReactionAndUserRelationshipsRouter);
app.use('/api/loungechats', loungeChatsRouter);
app.use('/api/launcherandpatronrelationships', launcherAndPatronRelationshisRouter);
app.use('/api/lab', labRouter);

export default app;
