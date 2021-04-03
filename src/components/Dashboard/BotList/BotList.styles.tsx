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
  grid-auto-rows: max-content;
  overflow: auto;
  padding: 0 10px;
`

export const BotCard = styled(Card).attrs({
  className: 'BotCard'
})``

export const BotCardContainer = styled.div.attrs({
  className: 'BotCardContainer'
})<{ isBotPicked: boolean }>`
  ${(props: { isBotPicked: boolean }) => props.isBotPicked && css`
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

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  
  &:hover {
    span {
      color: var(--Blue) !important;;
    }
  }
`

export const DeletePopoverContent = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 30px;
  grid-auto-columns: max-content;
`

export const PopoverDelete = styled.div`
  color: var(--Danger);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const PopoverNotDelete = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`