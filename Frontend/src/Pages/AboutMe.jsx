import React from 'react'
import Info from '../components/Info'
import Certificate from '../components/Certificate'

const AboutMe = () => {
  return (
    <div className='container'>
        <Info />
          <hr style={{ border: '1.5px solid white' }} />
          <Certificate />
    </div>
  )
}

export default AboutMe