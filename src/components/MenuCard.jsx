import React, { useState } from 'react'
import DetailMenu from './DetailMenu'

function MenuCard({card, resInfo}) {

    

    let flip = false;

    if(card["@type"]){
        flip = true;
    }

    const [isOpen, setIsOpen] = useState(flip);
 
    function toggleDropDown(){
        setIsOpen((prev) => !prev);
    }

    if(card.itemCards){
 
        const {title, itemCards} = card;

        return (
            <>
              <div>
                <div className='flex justify-between items-center mt-5'>
                    <h1 className={'cursor-pointer mb-3 font-bold text-' + (card["@type"] ? "lg" : "md")}>{title} ({itemCards.length})</h1>
                    <i className={"cursor-pointer text-2xl fi fi-rr-angle-small-" + (isOpen ? "up" : "down")} onClick={toggleDropDown}></i>
                </div>
        
                {
                    isOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo}/>    
                } 
              </div>

             
                <hr className={'mt-3 border-gray-300/30 border-' + (card["@type"] ? "8" : "1")}/>
        

              
            </>
          )
    } else{
 
        const {title, categories} = card;

        return (
            <div className='mt-5 flex flex-col justify-center '>
                <h1 className='text-lg font-bold'>{title}</h1>
        
                <div className=''>
                    {
                        categories.map((data, i) => (
                        <MenuCard key={i} card={data} resInfo={resInfo}/>
                    ))
                    }
                    
                </div>

                
                    
                

            </div>
            
        )
    }

  
}

export default MenuCard