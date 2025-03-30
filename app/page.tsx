'use client'

import 'axios'
import { useEffect, useState } from 'react'
import axios from 'axios'

import { components } from '@/api/strapi'
import { Experience } from '@/components/Experience'

const token = 'cddf5353967b3658fe9e170ab9dc391916bbc6ab1152f139b04459ad5f6a90f2dcd0e12f0d377aef3af3e193a7df9bf832cce1bdc8384412c89bd9d22e852853ba78ee75fc1914ec2d2d2137cb418dbbca63d7bf29dcab43ed28049aeca43290c185dd05ba42d7b09af45aab79e9b154e51c9410fad3bdf8359c3f4e25dfa358'
const queryUrl = 'https://api.robbiebyrd.com/api/experiences?populate[skills][populate][0]=skill_level&populate[skills][populate][1]=skill_type&sort=skills.skill_type.name&sort=start:asc'

type experienceSchema = components['schemas']['Experience']

export default function Home() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const fetchData = async () => {
        try {
            const { data } = await axios.get(queryUrl, { headers: { Authorization: `Bearer ${token}` } })
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
