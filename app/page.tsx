'use client'

import 'axios'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'dotenv/config'

import { components } from '@/api/strapi'
import { Experience } from '@/components/Experience'
import { authHeaders, host } from '@/utils/strapi'

type experienceSchema = components['schemas']['Experience']

export default function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const queryUrl = `${host}/experiences?populate[skills][populate][0]=skill_level&populate[skills][populate][1]=skill_type&sort=skills.skill_type.name&sort=start:asc`

    const fetchData = async () => {
        try {
            const { data } = await axios.get(queryUrl, authHeaders)
            setData(data.data)
            setError(false)
        } catch {
            setError(true)
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

    const experiencesSorted = data.sort((a: experienceSchema, b: experienceSchema) => {
        return Date.parse(a.start || '0') - Date.parse(b.start || '0')
    })

    return (
        <div className="">
            {experiencesSorted.map((item: experienceSchema, index) => (
                <Experience experience={item} key={index} />
            ))}
        </div>
    )
}
