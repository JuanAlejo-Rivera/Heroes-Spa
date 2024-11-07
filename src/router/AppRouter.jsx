import { Route, Routes } from 'react-router-dom'


import { HeroesRutas, MaverlPage } from '../heroes'
import { LoginPage } from '../auth'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'
import React from 'react'


export const AppRouter = () => {
    return (
        <>
            <Routes>
                {/* Esta es otra forma-------- */}
                {/* <Route path="login/*" element={
                    <PublicRoute>
                        <Routes>
                            <Route path="/*" element={<LoginPage />} />
                        </Routes>
                    </PublicRoute>
                } /> */}


                <Route path="/login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                {/* <Route path="login" element={<LoginPage />} /> */}

                <Route path="/*" element={
                    <PrivateRoute>
                        <HeroesRutas />
                    </PrivateRoute>
                } />
                {/* <Route path="/*" element={<HeroesRutas />} /> */}



            </Routes>
        </>
    )
}


