import styled from 'styled-components'

export const RenderImageCover = styled.picture<{
  width: number
  height: number
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
