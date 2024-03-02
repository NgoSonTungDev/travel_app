import ClientBase from './base';

import mix from '../../utils/mix';
import ClientAuth, {ClientAuthMix} from './auth';
import ClientPost, {ClientPostMix} from './post';
import ClientPlace, {ClientPlaceMix} from './place';

interface Client
  extends ClientBase,
    ClientAuthMix,
    ClientPostMix,
    ClientPlaceMix {}

class Client extends mix(ClientBase).with(ClientAuth, ClientPost, ClientPlace) {
  constructor() {
    super();
  }
}

const client = new Client();

export default client;
