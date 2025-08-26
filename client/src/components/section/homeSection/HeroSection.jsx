import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const books = [
    {
      src: "/images/section/homeSection/BannerCarousel/1.png",
      alt: "Fiction Books"
    },
    {
      src: "/images/section/homeSection/BannerCarousel/2.png",
      alt: "Educational Books"
    },
    {
      src: "/images/section/homeSection/BannerCarousel/3.png",
      alt: "Children Books"
    },
    {
      src: "/images/section/homeSection/BannerCarousel/4.png",
      alt: "Best Sellers"
    }
  ]

  // Auto-slide functionality with smoother timing
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % books.length)
      }, 5000) // Increased to 5 seconds for smoother experience

      return () => clearInterval(timer)
    }
  }, [isHovered, books.length])

  const getCardPosition = (index, currentIndex, totalCards) => {
    const diff = (index - currentIndex + totalCards) % totalCards
    
    if (diff === 0) return 'center'
    if (diff === 1 || diff === totalCards - 1) {
      return diff === 1 ? 'right' : 'left'
    }
    return 'hidden'
  }

  const goToSlide = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden bg-white bg-opacity-80 py-8">
      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 3D Carousel - One Center, Two Sides */}
        <div 
          className="relative flex justify-center items-center h-[450px] lg:h-[420px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Desktop Layout - 3D Perspective Carousel */}
          <div className="hidden lg:block w-full">
            <div className="carousel-3d-container">
              {books.map((book, index) => {
                const position = getCardPosition(index, currentImageIndex, books.length)
                return (
                  <div 
                    key={index}
                    className={`carousel-3d-item ${position}`}
                    onClick={() => {
                      goToSlide(index)
                      navigate('/books')
                    }}
                  >
                    <div className="w-[280px] h-[380px]">
                      <img
                        src={book.src}
                        alt={book.alt}
                        className="carousel-image w-full h-full object-cover rounded-lg shadow-lg"
                      />
                      <div className="mt-3 text-center">
                        <p className="text-gray-700 text-sm font-medium transition-all duration-500 ease-out">{book.alt}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Tablet Layout - Smaller 3D Carousel */}
          <div className="hidden md:block lg:hidden w-full">
            <div className="carousel-3d-container-tablet">
              {books.map((book, index) => {
                const position = getCardPosition(index, currentImageIndex, books.length)
                return (
                  <div 
                    key={index}
                    className={`carousel-3d-item-tablet ${position}`}
                    onClick={() => {
                      goToSlide(index)
                      navigate('/books')
                    }}
                  >
                    <div className="w-[220px] h-[300px]">
                      <img
                        src={book.src}
                        alt={book.alt}
                        className="carousel-image w-full h-full object-cover rounded-lg shadow-lg"
                      />
                      <div className="mt-2 text-center">
                        <p className="text-gray-700 text-xs font-medium transition-all duration-500 ease-out">{book.alt}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile Layout - Simple 3-card horizontal */}
          <div className="md:hidden w-full">
            <div className="carousel-mobile">
              {[-1, 0, 1].map((offset) => {
                const index = (currentImageIndex + offset + books.length) % books.length
                const book = books[index]
                const position = offset === 0 ? 'center' : 'side'
                
                return (
                  <div 
                    key={index}
                    className={`carousel-mobile-item ${position}`}
                    onClick={() => {
                      goToSlide(index)
                      navigate('/books')
                    }}
                  >
                    <div className={`${offset === 0 ? 'w-[160px] h-[220px]' : 'w-[120px] h-[160px]'}`}>
                      <img
                        src={book.src}
                        alt={book.alt}
                        className="carousel-image w-full h-full object-cover rounded-lg shadow-lg"
                      />
                      {offset === 0 && (
                        <div className="mt-2 text-center">
                          <p className="text-gray-700 text-xs font-medium transition-all duration-500 ease-out">{book.alt}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Navigation dots for mobile */}
            <div className="flex justify-center mt-6 space-x-2">
              {books.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 ease-out rounded-full ${
                    index === currentImageIndex 
                      ? 'w-8 h-2 bg-gray-700 scale-125 shadow-lg' 
                      : 'w-2 h-2 bg-gray-400 hover:bg-gray-600 hover:scale-110'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Navigation arrows for desktop and tablet */}
          <div className="hidden md:block">
            <button
              onClick={() => goToSlide((currentImageIndex - 1 + books.length) % books.length)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 bg-opacity-70 hover:bg-opacity-90 backdrop-blur-sm rounded-full p-3 transition-all duration-500 ease-out hover:scale-110 hover:shadow-lg z-10 group"
            >
              <svg className="w-6 h-6 text-gray-700 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button
              onClick={() => goToSlide((currentImageIndex + 1) % books.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 bg-opacity-70 hover:bg-opacity-90 backdrop-blur-sm rounded-full p-3 transition-all duration-500 ease-out hover:scale-110 hover:shadow-lg z-10 group"
            >
              <svg className="w-6 h-6 text-gray-700 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection