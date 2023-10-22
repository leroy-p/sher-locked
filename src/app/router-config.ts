import { generatePath } from 'react-router-dom'

export function generateRoutePath<T extends keyof IRoutePathParams>(path: T, params: IRoutePathParams[T]) {
  return generatePath(path, params)
}

export enum RoutePath {
  ROOT = '/',
  PASSWORD = '/password',
  CITY = '/city',
  RYTHM = '/rythm',
  MOTUS = '/motus',
  PUZZLE = '/puzzle',
  REVEAL = '/reveal',
}

export interface IRoutePathParams {
  [RoutePath.ROOT]: {}
  [RoutePath.PASSWORD]: {}
  [RoutePath.CITY]: {}
  [RoutePath.RYTHM]: {}
  [RoutePath.MOTUS]: {}
  [RoutePath.PUZZLE]: {}
  [RoutePath.REVEAL]: {}
}