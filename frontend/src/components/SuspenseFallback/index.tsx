import React, { useState } from 'react'
import Title from '../../styles/Title'
import { SuspenseFallbackWrapper } from './style'

const SuspenseFallback: React.FC = () => {
  return (
    <SuspenseFallbackWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">
        <g fill="none" stroke="#11eedd" strokeWidth="2">
          <circle
            cx="77"
            cy="77"
            r="72"
            style={{
              strokeDasharray: '480px, 480px',
              strokeDashoffset: '960px'
            }}
          ></circle>
          <circle
            id="colored"
            fill="#11eedd"
            cx="77"
            cy="77"
            r="72"
            style={{
              strokeDasharray: '480px, 480px',
              strokeDashoffset: '960px'
            }}
          ></circle>
          <polyline
            className="todo-svg"
            stroke="#1a1a1a"
            strokeWidth="10"
            points="43.5,77.8 63.7,97.9 112.2,49.4 "
            style={{
              strokeDasharray: '100px, 100px',
              strokeDashoffset: '200px'
            }}
          />
        </g>
      </svg>
      <Title size="2.2rem" color="#ededed">
        Loading...
      </Title>
    </SuspenseFallbackWrapper>
  )
}

export default SuspenseFallback
