import ClientBase from './base';

import mix from '../../utils/mix';
import ClientAuth, {ClientAuthMix} from './auth';

interface Client extends ClientBase, ClientAuthMix {}

class Client extends mix(ClientBase).with(ClientAuth) {
  constructor() {
    super();
  }
}

const client = new Client();

export default client;
