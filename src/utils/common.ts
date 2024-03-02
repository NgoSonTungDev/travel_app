import moment from 'moment';

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const momentLocale = (date: string | number) => {
  moment.updateLocale('vi', {});
  return moment(date).fromNow();
};

export const formatMoney = (money: number) => {
  return Number(money).toLocaleString('vi', {
    style: 'currency',
    currency: 'VND',
  });
};
