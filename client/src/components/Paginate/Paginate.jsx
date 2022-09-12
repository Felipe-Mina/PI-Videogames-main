import React from 'react'
import './paginate.css'

const Paginate = ({gamesByPage, games, paginate, setCurrentPage, currentPage}) => {

  const page = [];
  let numPage = Math.ceil(games/gamesByPage);
  for(let i = 1; i <= numPage; i++) {
    page.push(i)
  };

  return (
    <div>
      <ul>
        <button
          disabled={currentPage === 1}
          className='button-prev'
          onClick={()=>{
            console.log('x')
            setCurrentPage(currentPage === 1?
              currentPage:
              currentPage-1
            )
          }
          }
        >
          prev
        </button>
        {page && page.map((n) => (
            <button
              disabled={currentPage === n}
              className='page-button'
              key={n}
              onClick={()=> paginate(n)}
            >
              {n}
            </button>
        ))}
        <button
          disabled={currentPage === page.length}
          className='button-next'
          onClick={()=>
            setCurrentPage(currentPage === numPage?
              currentPage:
              currentPage + 1
              )
          }
        >
          next
        </button>
      </ul>
    </div>
  )
}

export default Paginate
