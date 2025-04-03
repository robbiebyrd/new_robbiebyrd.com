import React from 'react'
import { components } from '@/api/strapi'
import { Skill } from '@/components/skills/Skill'

type skillSchema = components['schemas']['Skill']

interface SkillsProps {
    skills: skillSchema[]
    size: 'large' | 'medium' | 'small' | 'tiny'
}

export const Skills: React.FC<SkillsProps> = ({ skills, size }) => {
    const filteredSkills = skills.filter(item => item != null)

    if (!filteredSkills) {
        return
    }

    const sortedSkills = filteredSkills
        .sort((a, b) => (a.yearsOfExperience ?? 0) - (b.yearsOfExperience ?? 0))
        .sort((a, b) => (a.skill_level?.sort ?? 0) - (b.skill_level?.sort ?? 0))
        .sort((a, b) => (a.skill_type?.sort ?? 0) - (b.skill_type?.sort ?? 0))

    return (
        <div className={'flex flex-wrap flex-row gap-2'}>
            {sortedSkills.map((skill: skillSchema) => {
                return (
                    <Skill size={size} key={skill.id} skill={skill} />
                )
            })}
        </div>
    )
}
