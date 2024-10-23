import React from 'react'
import { Navbar } from '../../ui'
import { Navigate, Route, Routes } from 'react-router-dom'
import { DCPage, HeroPages, MaverlPage, SearchPage } from '../pages'

export const HeroesRutas = () => {
  return (
    <>
      <Navbar />
      <div className='container'>

        <Routes>
          <Route path="marvel" element={<MaverlPage />} />
          <Route path="dc" element={<DCPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="hero/:id" element={<HeroPages />} />


          <Route path="/*" element={<Navigate to="/marvel" />} />
          {/* <Route path="*" element={<Navigate to="/marvel" />} /> Ruta catch-all */}

        </Routes>
      </div>
    </>
  )
}
