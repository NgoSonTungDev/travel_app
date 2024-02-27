import {
  ILogin,
  IRegister,
  IUpdatePassword,
  IUser,
  IVerifyEmailRegister,
} from '../../types/auth';
import {IResponse, IResponseMessage} from '../../types/request_status';
import ClientBase from './base';

export interface ClientAuthMix {
  login: (data: ILogin) => Promise<IResponse<IUser>>;
  register: (data: IRegister) => Promise<IResponse<IUser>>;
  updatePassword: (data: IUpdatePassword) => Promise<IResponseMessage>;
  verifyEmailForgotPassword: (email: string) => Promise<IResponse<string>>;
  verifyEmailRegister: (
    data: IVerifyEmailRegister,
  ) => Promise<IResponseMessage>;
}

const ClientAuth = <TBase extends Constructor<ClientBase>>(superclass: TBase) =>
  class extends superclass implements ClientAuthMix {
    login = async (data: ILogin) => {
      return this.doFetch<IResponse<IUser>>(
        `${this.getBaseRoute()}/user/login`,
        {
          method: 'post',
          data: data,
        },
      );
    };
    register = async (data: IRegister) => {
      return this.doFetch<IResponse<IUser>>(
        `${this.getBaseRoute()}/user/register`,
        {
          method: 'post',
          data: data,
        },
      );
    };
    updatePassword = async (data: IUpdatePassword) => {
      return this.doFetch<IResponseMessage>(
        `${this.getBaseRoute()}/user/update-password/${data.userId}`,
        {
          method: 'put',
          data: {codeOtp: data.codeOtp, password: data.password},
        },
      );
    };
    verifyEmailForgotPassword = async (email: string) => {
      return this.doFetch<IResponse<string>>(
        `${this.getBaseRoute()}/user/register`,
        {
          method: 'post',
          data: email,
        },
      );
    };
    verifyEmailRegister = async (data: IVerifyEmailRegister) => {
      return this.doFetch<IResponseMessage>(
        `${this.getBaseRoute()}/email/send-code-register`,
        {
          method: 'post',
          data: data,
        },
      );
    };
  };

export default ClientAuth;
