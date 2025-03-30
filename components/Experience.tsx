import React from 'react';
import {components} from "../api/strapi"
import { Skill } from '@/components/Skill'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ExperienceProps {
    experience: components["schemas"]["Experience"];
}

export const Experience: React.FC<ExperienceProps> = ({ experience }) => {
    const skills = experience.skills?.sort((a, b) => (a.skill_type?.sort ?? 0) - (b.skill_type?.sort ?? 0));

    const startDate = new Date(Date.parse(experience.start || "0")).toLocaleDateString('en-us', { year:"numeric", month:"long"})
    const endDate = experience.end ? new Date(Date.parse(experience.end || "0")).toLocaleDateString('en-us', { year:"numeric", month:"long"}) : undefined

    return (
        <div>
            <h1>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.name}</ReactMarkdown>
            </h1>
            <h2>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.subtitle}</ReactMarkdown>
            </h2>
            <p>{startDate} - {endDate || "Current"}</p>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.summary}</ReactMarkdown>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{experience.description}</ReactMarkdown>
            <div className={"w-full flex flex-wrap"}>
                {skills?.map((skill, index) => (
                    <Skill key={index} skill={skill} size={'medium'} />
                ))}
            </div>
        </div>
    );
};
