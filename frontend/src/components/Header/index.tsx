import React from 'react'
import * as s from './style'

interface Props {}

const Header = (props: Props) => {
  return (
    <s.HeaderWrapper>
      <s.HeaderStyle>
        <s.LogoDreamTodo>
          dream<span>Todo</span>
        </s.LogoDreamTodo>

        <s.ButtonAccount>Login</s.ButtonAccount>
      </s.HeaderStyle>
    </s.HeaderWrapper>
  )
}

export default Header
