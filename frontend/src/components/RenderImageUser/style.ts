import styled from 'styled-components'

export const RenderImageCover = styled.picture<{
  width: number | string
  height: number | string
}>`
  width: ${props =>
    typeof props.width === 'string' ? props.width : `${props.width}px`};
  height: ${props =>
    typeof props.height === 'string' ? props.height : `${props.height}px`};

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
