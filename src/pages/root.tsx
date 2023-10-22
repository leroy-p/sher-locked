import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Layout from '../layout/public'
import Dialog from '../components/dialog'
import { RoutePath, generateRoutePath } from '../app/router-config'

function Root() {
  const [username, setUsername] = useState<string>('')
  const [error, setError] = useState<boolean>(false)
  const [submitCount, setSubmitCount] = useState<number>(0)
  const [showDialog, setShowDialog] = useState<boolean>(false)

  useEffect(() => {
    setShowDialog(submitCount === 3)
  }, [submitCount])

  function submit() {
    setError(username.toLowerCase() !== 'layton')
    setSubmitCount((value) => value + 1)

    if (username.toLowerCase() === 'layton') {
      window.location.href = generateRoutePath(RoutePath.PASSWORD, {})
    }
  }

  function closeDialog() {
    setShowDialog(false)
    setSubmitCount(0)
  }

  return (
    <Layout>
      <Container>
        <img src="/assets/image/raccoon.png" />
        <p>Nom d'utilisateur</p>
        <input onChange={(event) => setUsername(event.target.value.toUpperCase())} type="text" value={username} />
        <div>
          {error && <p>Accès refusé.</p>}
        </div>
        <button onClick={submit}>Valider</button>
        <Dialog
            action={{ label: 'Je participe', path: generateRoutePath(RoutePath.RYTHM, {})}}
            close={{ label: 'Plus tard', action: closeDialog }}
            title="Besoin d'un indice ?"
            texts={["Participe à une épreuve pour obtenir davantage d'informations !"]}
            visible={showDialog}
          />
      </Container>
    </Layout>
  )
}

export default Root

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  width: 100%;

  & > img {
    height: auto;
    margin-bottom: 96px;
    width: 70%;
  }

  & > p {
    width: 100%;
    margin-bottom: 8px;
    text-align: left;
  }

  & > input {
    border: solid 1px #343434;
    margin-bottom: 8px;
    width: 100%;
  }


  & > button {
    background-color: #343434;
    height: 40px;
    padding: 0 16px;
    text-transform: uppercase;
  }

  & > div {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 24px;
    margin-bottom: 16px;
    justify-content: center;
    width: 100%;

    & > p {
      color: #fa6666;
      width: 100%;
    }
  }
`