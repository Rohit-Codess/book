import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const banners = [
    {
      id: 1,
      title: "Modern Politics",
      subtitle: "Explore the latest trends and insights",
      image: "/images/section/homeSection/BannerCarousel/1.png",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Stationery Essentials",
      subtitle: "Stationery items for every need",
      image: "/images/section/homeSection/BannerCarousel/2.png",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Children's Special",
      subtitle: "Educational and entertaining books for kids",
      image: "/images/section/homeSection/BannerCarousel/3.png",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Human Brain",
      subtitle: "Unlock the mysteries of the mind",
      image: "/images/section/homeSection/BannerCarousel/4.png",
      textColor: "text-white"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [banners.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length)
  }

  return (
    <section className="relative w-full h-100 md:h-96 lg:h-[32rem] xl:h-[36rem] overflow-hidden">
      {/* Banner Slides */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="min-w-full h-full relative flex items-center justify-center"
          >
            {/* Background Image */}
            <img
              src={banner.image}
              onClick={() => navigate('/books')}
              alt={banner.title}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              
            />
            
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-bold ${banner.textColor} mb-4 drop-shadow-lg`}>
                {/* {banner.title} */}
              </h2>
              <p className={`text-lg sm:text-xl lg:text-2xl ${banner.textColor} mb-8 drop-shadow-md`}>
                {/* {banner.subtitle} */}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white bg-opacity-50 hover:bg-opacity-80'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default BannerCarousel
