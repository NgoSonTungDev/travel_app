import ClientBase from './base';

export interface ClientAuthMix {
  login: (data: any) => Promise<any>;
}

const ClientAuth = <TBase extends Constructor<ClientBase>>(superclass: TBase) =>
  class extends superclass implements ClientAuthMix {
    login = async (data: any) => {
      return this.doFetch<any>(`${this.getBaseRoute()}/Authenticate/login`, {
        method: 'post',
        data: data,
      });
    };
  };

export default ClientAuth;
