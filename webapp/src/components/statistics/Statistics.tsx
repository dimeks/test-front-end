import React from 'react'
import styled from 'styled-components'
import Card from '@ui/components/card/Card'
import { theme } from 'src/ui';
import { FaThumbsUp, FaEye, FaStar, FaComment } from 'react-icons/fa';

export type Props = {
    viewCount?: number;
    likeCount?: number;
    favoriteCount?: number;
    commentCount?: number;
}

const format = (value: number) => {
    if (value) {
        return Number(value).toLocaleString()
    }
    return ''
}

const Statistics: React.FC<Props> = (props) => {
    return (
        <Container radius="md" elevation='md' {...props}>
            <Action>
                <FaThumbsUp size={18} color={theme.colors.text} />
                <span>{format(props.likeCount || 0)}</span>
            </Action>
            <Action>
                <FaEye size={18} color={theme.colors.text} />
                <span>{format(props.viewCount || 0)}</span>
            </Action>
            <Action>
                <FaStar size={18} color={theme.colors.text} />
                <span>{format(props.favoriteCount || 0)}</span>
            </Action>
            <Action>
                <FaComment size={18} color={theme.colors.text} />
                <span>{props.commentCount || 0}</span>
            </Action>
        </Container>
    )
}


export default Statistics


const Container = styled(Card)`
    display: flex;
    width: initial;
    max-width: fit-content;
    align-items: center;
    justify-content: space-between;
    border-radius: 0 0 ${p => p.theme.radius.md} ${p => p.theme.radius.md};
    padding-top: 20px;
    
    @media (max-width: 499px) {
        flex-wrap: wrap; 
        justify-content: center;
    }

`

const Action = styled.button`
    display: flex;
    background: none;
    border: none;
    align-items: center;
    justify-content: center;
    font-family: ${p => p.theme.typography.fontFamily};
    font-size: ${p => p.theme.fontSize.md};        
    margin: 5px 15px;
    flex: 0 0 60px; 
     
    span {
        margin-left: 10px;
        font-weight: 500;
    }
    
 
`