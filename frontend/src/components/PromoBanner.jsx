import React from 'react'

const PromoBanner = () => {
  return (
    <div className="mx-4 mb-4">
    <h3 className="font-semibold text-blue-800 text-lg mb-2">Mega Deals</h3>

    <a href="https://www.disneyplus.com" target="_blank" rel="noopener noreferrer">
      <img
        src="https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fa993af66-5257-4eed-91df-14f244db37d8.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1"
        alt="Disney+ Deal"
        className="rounded-lg shadow-md hover:scale-[1.01] transition-transform duration-200"
      />
    </a>
  </div>
  )
}

export default PromoBanner
