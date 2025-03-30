import React from 'react'
import { components } from '../api/strapi'
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
} from '@awesome.me/kit-20210c7212/icons/classic/solid'
import ReactMarkdown from 'react-markdown'

type skillSchema = components['schemas']['Skill']

interface SkillProps {
    skill: skillSchema
    size: 'large' | 'medium' | 'small' | 'tiny'
}

export const Skill: React.FC<SkillProps> = ({ skill, size }) => {

    const skillType = skill.skill_type as components['schemas']['SkillType']
    let skillTypeIcon = <h3>{skillType.name}</h3>
    let skillColor = '#ffffff'
    let skillBorder = '#ffffff'
    let skillTextColor = '#000000'

    switch (skillType.name) {
        case 'Programming Language':
            skillTypeIcon = <FontAwesomeIcon icon={faBinary} title={'Programming Language'} />
            skillColor = 'red'
            skillBorder = '#440000'
            skillTextColor = 'white'
            break
        case 'Technology':
            skillTypeIcon = <FontAwesomeIcon icon={faMicrochip} title={'Technology'} />
            skillColor = 'green'
            skillBorder = '#003300'
            skillTextColor = 'white'
            break
        case 'Framework':
            skillTypeIcon = <FontAwesomeIcon icon={faWindowFrameOpen} title={'Framework'} />
            skillColor = 'purple'
            skillBorder = '#330033'
            skillTextColor = 'white'
            break
        case 'Tool':
            skillTypeIcon = <FontAwesomeIcon icon={faWrench} title={'Tool'} />
            skillColor = '#000088'
            skillBorder = '#000044'
            skillTextColor = 'white'
            break
        case 'Design':
            skillTypeIcon = <FontAwesomeIcon icon={faSwatchbook} title={'Design'} />
            skillColor = '#ffff00'
            skillBorder = '#333300'
            skillTextColor = '#000000'
            break
    }

    const skillLevel = skill.skill_level as components['schemas']['SkillLevel']
    let skillLevelItem = <h3>{skillLevel.name}</h3>
    switch (skillLevel.name) {
        case 'Beginner':
            skillLevelItem = <FontAwesomeIcon icon={faBottleBaby} title={'Beginner'} />
            break
        case 'Intermediate':
            skillLevelItem = <FontAwesomeIcon icon={faThumbsUp} title={'Intermediate'} />
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
                    backgroundColor: skillColor,
                    borderColor: skillBorder,
                    color: skillTextColor,
                }} aria-label={skillLevel.name}>
                    {skill.name}
                </div>
            )
        case 'medium':
            return (
                <div style={{ backgroundColor: skillColor, borderColor: skillBorder, color: skillTextColor }}
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
                <div style={{ backgroundColor: skillColor, borderColor: skillBorder, color: skillTextColor }}
                     className={'m-1 px-2 border-2'}>
                    <p className={'text-xs'}>{skill.name}</p>
                </div>
            )
        case 'small':
        default:
            return (
                <div style={{ backgroundColor: skillColor, borderColor: skillBorder, color: skillTextColor }}
                     className={'text-xs m-1 px-2 border-2 flex flex-row items-center justify-center gap-2'}>
                    {skillTypeIcon}
                    <h1 className={'text-sm'}>{skill.name}</h1>
                </div>
            )
    }
}
