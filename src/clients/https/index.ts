import ClientBase from './base';

import mix from '../../utils/mix';
import ClientAuth, {ClientAuthMix} from './auth';
import ClientPost, {ClientPostMix} from './post';

interface Client extends ClientBase, ClientAuthMix, ClientPostMix {}

class Client extends mix(ClientBase).with(ClientAuth, ClientPost) {
  constructor() {
    super();
  }
}

const client = new Client();

export default client;
