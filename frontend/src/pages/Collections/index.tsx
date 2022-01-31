import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import Button from '../../styles/Button'
import CollectionCard from './CollectionCard'
import FormCollection from './FormCollection'

import * as s from './style'

const Collections: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <s.CollectionWrapper>
      <h1>Collections</h1>

      <CollectionCard setShowForm={setShowForm} />

      <Button onClick={() => setShowForm(true)} className="add-collection">
        <FaPlus size={22} />
      </Button>

      {showForm && <FormCollection setShowForm={setShowForm} />}
    </s.CollectionWrapper>
  )
}

export default Collections
