/* globals io */

import styles from './assets/main';
import configureSockets from './lib/socketry';

configureSockets(io());
