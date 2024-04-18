import React from 'react'

const SuggestionCard = () => {

    const handleSuggestions=()=>{
        console.log('handle sugge');
    }

    
  return (
    <div className='bg-green-200 p-3 rounded-lg ' onClick={handleSuggestions}>
        <h2 className='font-semibold mb-1'>Topic</h2>
        <p>Section tells browsers and screen readers that the content inside it should be </p>
    </div>
  )
}

export default SuggestionCard