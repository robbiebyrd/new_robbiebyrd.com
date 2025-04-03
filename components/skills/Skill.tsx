import React from 'react'
import { components } from '@/api/strapi'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBinary,
    faBottleBaby,
    faBrain,
    faBrainCircuit,
    faMicrochip,
    faSwatchbook,
    faThumbsUp,
    faWindowFrameOpen,
    faWrench,
    faLightbulb
} from '@awesome.me/kit-20210c7212/icons/classic/solid'
import ReactMarkdown from 'react-markdown'

type skillSchema = components['schemas']['Skill']

interface SkillProps {
    skill: skillSchema
    size: 'large' | 'medium' | 'small' | 'tiny'
}

export const Skill: React.FC<SkillProps> = ({ skill, size }) => {

    let skillTypeIcon

    if (skill.skill_type) {
        const skillType = skill.skill_type as components['schemas']['SkillType']
        skillTypeIcon = <FontAwesomeIcon icon={faLightbulb} title={skillType.name} />
        switch (skillType.name) {
            case 'Programming Language':
                skillTypeIcon = <FontAwesomeIcon icon={faBinary} title={'Programming Language'} />
                break
            case 'Technology':
                skillTypeIcon = <FontAwesomeIcon icon={faMicrochip} title={'Technology'} />
                break
            case 'Framework':
                skillTypeIcon = <FontAwesomeIcon icon={faWindowFrameOpen} title={'Framework'} />
                break
            case 'Tool':
                skillTypeIcon = <FontAwesomeIcon icon={faWrench} title={'Tool'} />
                break
            case 'Design':
                skillTypeIcon = <FontAwesomeIcon icon={faSwatchbook} title={'Design'} />
                break
        }
    }
    const skillLevel = skill.skill_level as components['schemas']['SkillLevel']
    let skillLevelItem = <FontAwesomeIcon icon={faThumbsUp} title={skillLevel.name} />
    switch (skillLevel.name) {
        case 'Beginner':
            skillLevelItem = <FontAwesomeIcon icon={faBottleBaby} title={'Beginner'} />
            break
        case 'Advanced':
            skillLevelItem = <FontAwesomeIcon icon={faBrain} title={'Advanced'} />
            break
        case 'Expert':
            skillLevelItem = <FontAwesomeIcon icon={faBrainCircuit} title={'Expert'} />
            break
    }

    switch (size) {
        case 'large':
            return (
                <div style={{
                    backgroundColor: skill.color,
                    borderColor: skill.borderColor,
                    color: skill.textColor,
                }}
                     aria-label={skillLevel.name}
                >
                    {skill.name}
                </div>
            )
        case 'medium':
            return (
                <div style={{ backgroundColor: skill.color, borderColor: skill.borderColor, color: skill.textColor }}
                     className={'flex gap-4 items-center m-1 px-2 border-2'}>
                    <h1 className={'text-lg'}>
                        <ReactMarkdown>{skill.name}</ReactMarkdown>
                    </h1>
                    {skillTypeIcon}
                    {skillLevelItem}
                </div>
            )
        case 'tiny':
            return (
                <div style={{ backgroundColor: skill.color, borderColor: skill.borderColor, color: skill.textColor }}
                     className={'m-1 px-2 border-2'}>
                    <p className={'text-xs'}>{skill.name}</p>
                </div>
            )
        case 'small':
        default:
            return (
                <div style={{ backgroundColor: skill.color, borderColor: skill.borderColor, color: skill.textColor }}
                     className={'text-xs m-1 px-2 border-2 flex flex-row items-center justify-center gap-2'}>
                    {skillTypeIcon}
                    <h1 className={'text-sm'}>{skill.name}</h1>
                </div>
            )
    }
}
