import React from 'react'
import { components } from '../api/strapi'
import { Skill } from '@/components/skills/Skill'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Skills } from '@/components/skills/Skills'

interface ExperienceProps {
    experience: components['schemas']['Experience'];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {

    const dateFormat: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' }
    const startDate = new Date(Date.parse(experience.start || '0')).toLocaleDateString('en-us', dateFormat)
    const endDate = experience.end ? new Date(Date.parse(experience.end || '0')).toLocaleDateString('en-us', dateFormat) : undefined

    return (
        <div>
            <h1>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.name}</ReactMarkdown>
            </h1>
            <h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.subtitle}</ReactMarkdown>
            </h2>
            <p>{startDate} - {endDate || 'Current'}</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.summary}</ReactMarkdown>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.description}</ReactMarkdown>
            {experience.skills && (
                <div className={'w-full flex flex-wrap'}>
                    <Skills skills={experience.skills} size={'medium'} />
                </div>
            )}
        </div>
    )
}
