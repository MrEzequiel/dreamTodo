import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Button from '../../styles/Button'
import Title from '../../styles/Title'
import CollectionList from './CollectionList'
import FormCollection from './FormCollection'

import * as s from './style'

const Collections: React.FC = () => {
  const [showForm, setShowForm] = useState(false)

  return (
    <s.CollectionWrapper>
      <Title size="3.2rem" separator>
        Collections
      </Title>

      <CollectionList setShowForm={setShowForm} />

      <Button onClick={() => setShowForm(true)} className="add-collection">
        <FaPlus size={22} />
      </Button>

      <FormCollection setShowForm={setShowForm} showForm={showForm} />
    </s.CollectionWrapper>
  )
}

export default Collections
