import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import CollectionCard from './CollectionCard'
import FormCollection from './FormCollection'

import * as s from './style'

const Collections: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <s.CollectionWrapper>
      <h1>Collections</h1>

      <CollectionCard setShowForm={setShowForm} />

      <s.ButtonAddCollection onClick={() => setShowForm(true)}>
        <FaPlus size={25} />
      </s.ButtonAddCollection>

      {showForm && <FormCollection setShowForm={setShowForm} />}
    </s.CollectionWrapper>
  )
}

export default Collections
