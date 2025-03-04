import React, { useState } from 'react'
import DetailMenuNext from './DetailMenuNext';



function DetailMenu({itemCards, resInfo}) {

    // console.log(itemCards);

    

  return (
    <div className='m-5 '>
        {
            itemCards.map(({card: {info}}) => (
                <DetailMenuNext key={info.id} info={info} resInfo={resInfo}/>
            ))}
    </div>
  )
}

export default DetailMenu