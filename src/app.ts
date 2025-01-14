import * as dotenv from 'dotenv';
dotenv.config();
import {App} from '@slack/bolt';
import {redisInit} from './services/redis';
import {routing} from './router';
import {registerUsers} from './utils/registerUsers';
import {registerGroup} from './utils/registerGroup';

let app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

async function init() {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ samantha is running :)');
  await redisInit(); // connect to the app
  await registerUsers(app); // to register the current users of the app in our database
  // await registerGroup(app, 'lemon', [
  //   'shogo',
  //   'Simple Samosa',
  //   'SHOURYA GOEL 22114090',
  // ]);
  // use this if you want to register a new group. change lemon with group name and the array with the display names of the users.
  routing(app);
}

init();
