import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { RoutePath } from './router-config'
import Root from '../pages/root'
import NotFound from '../pages/error/not-found'
import Loading from '../pages/loading'
import Second from '../pages/second'
import Third from '../pages/third'
import Rythm from '../pages/rythm'
import Motus from '../pages/motus'
import Puzzle from '../pages/puzzle'
import Reveal from '../pages/reveal'


interface IRouteParams {
  Component: JSX.Element
  path: RoutePath
}

const routes: IRouteParams[] = [
  {
    Component: <Root />,
    path: RoutePath.ROOT,
  },
  {
    Component: <Second />,
    path: RoutePath.SECOND,
  },
  {
    Component: <Third />,
    path: RoutePath.THIRD,
  },
  {
    Component: <Rythm />,
    path: RoutePath.RYTHM,
  },
  {
    Component: <Motus />,
    path: RoutePath.MOTUS,
  },
  {
    Component: <Puzzle />,
    path: RoutePath.PUZZLE,
  },
  {
    Component: <Reveal />,
    path: RoutePath.REVEAL,
  },
]

function Router() {
  return (
    <Suspense fallback={Loading()}>
    <BrowserRouter>
      <Routes>
        {routes.map(({ Component, path }) => (
          <Route key={path} path={path} element={Component} />
        ))}
        <Route element={<NotFound />} path="*" />
      </Routes>
    </BrowserRouter>
  </Suspense>
  )
}

export default Router
