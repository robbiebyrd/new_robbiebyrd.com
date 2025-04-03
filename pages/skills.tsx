import 'axios'
import { useEffect, useState } from 'react'
import axios from 'axios'
import '@/app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'RobbieByrd.com',
    description: 'The home of Robbie Byrd.',
}

import { Skills } from '@/components/skills/Skills'
import { authHeaders, host } from '@/utils/strapi'


export default function SkillsPage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const queryUrl = `${host}/skills?populate=*`

    const fetchData = async () => {
        try {
            const { data } = await axios.get(queryUrl, authHeaders)
            setData(data.data)
            setError(false)
        } catch (e) {
            setError(true)
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <html lang="en">
        <body className="antialiased w-full h-full">
        <div className="flex flex-row">
            <Skills skills={data} size={'small'}/>
        </div>
        </body>
        </html>
    )
}
