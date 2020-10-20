import styled, { css } from 'styled-components'
import { Skeleton, Switch, Card, Avatar } from 'antd';

const { Meta } = Card


export const BotList = styled.div.attrs({
  className: 'BotList'
})`
  display: grid;
  height: 90vh;
  width: 300px;
  grid-row-gap: 5px;
  overflow: auto;
  padding: 0 10px;
`

export const BotMeta = styled(Meta).attrs({
  className: 'BotMeta'
})<{ isBotPicked: boolean }>`
  
`

export const BotCard = styled(Card).attrs({
  className: 'BotCard'
})``

export const BotCardContainer = styled.div.attrs({
  className: 'BotCardContainer'
})<{ isBotPicked: boolean }>`
  ${props => props.isBotPicked && css`
    .BotCard {
      border: 1px solid var(--Blue);
      .ant-card-meta-avatar {
        span {
          color: var(--Blue) !important;
        }
      }
    }
  `}
`