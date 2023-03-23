import {differenceInCalendarDays} from 'date-fns';

export const getRealPeriod = (item: any): number => {
  const period = differenceInCalendarDays(
    new Date(item.doneAt || item.issueAt),
    new Date(item.startAt),
  );
  return period;
};
