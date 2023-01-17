import { ONE_DAY_IN_MILLISECONDS } from 'constants'

export function hasPassedOneDay(day1) {
    return (new Date().getTime() - new Date(day1).getTime()) > ONE_DAY_IN_MILLISECONDS
}