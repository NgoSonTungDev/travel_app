import ClientBase from './base';
import ClientAuth, {ClientAuthMix} from './auth';
import mix from '../../utils/mix';

interface Client extends ClientBase, ClientAuthMix {}

class Client extends mix(ClientBase).with(ClientAuth) {
  constructor() {
    super();
  }
}

const client = new Client();

export default client;
