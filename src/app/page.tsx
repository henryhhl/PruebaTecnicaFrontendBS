'use client'
import React from 'react'
import ingresos from '../assets/images/ingresos.png'
import { CardComponent } from './components'
import './page.css'

export default function Home (): React.JSX.Element {
  return (
    <div className="content-page">
      <div className="title-description">
        <h1 className="title-welcome">Bienvenido, Pepito!</h1>
        <p>Registrar tus ingresos nunca fue tan fácil</p>
        <p>
          Ahora podrás tener el control de tus finanzas en línea desde la comodidad de tu celular
        </p>
      </div>
      <div className="row">
        <CardComponent
          title="Registro de ingresos"
          icon={ingresos}
          onCardClick={() => {
            console.log('here route of page')
          }}
          path={'/income'}
        />
        <CardComponent
          title="Registro de egresos"
          icon={ingresos}
          onCardClick={() => {
            console.log('here route of page')
          }}
          path={'/expenses'}
        />
        <CardComponent
          title="Registro de Historicos"
          icon={ingresos}
          onCardClick={() => {
            console.log('here route of page')
          }}
          path={'/history'}
        />
      </div>
    </div>
  )
}
