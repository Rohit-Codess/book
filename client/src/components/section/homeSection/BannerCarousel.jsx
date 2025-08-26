import { useState, useEffect } from 'react'
// import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [nextSlide, setNextSlide] = useState(0)
  const navigate = useNavigate()

  const banners = [
    {
      id: 1,
      title: "Modern Politics",
      subtitle: "Explore the latest trends and insights",
      image: "/images/section/homeSection/BannerCarousel/bg1.jpg",
      textColor: "text-white"
    },
    {
      id: 2,
      title: "Stationery Essentials",
      subtitle: "Stationery items for every need",
      image: "/images/section/homeSection/BannerCarousel/bg2.jpg",
      textColor: "text-white"
    },
    {
      id: 3,
      title: "Children's Special",
      subtitle: "Educational and entertaining books for kids",
      image: "/images/section/homeSection/BannerCarousel/bg3.jpg",
      textColor: "text-white"
    },
    {
      id: 4,
      title: "Human Brain",
      subtitle: "Unlock the mysteries of the mind",
      image: "/images/section/homeSection/BannerCarousel/bg4.jpg",
      textColor: "text-white"
    }
  ]

  // Auto-slide functionality with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      const next = (currentSlide + 1) % banners.length
      setNextSlide(next)
      
      setTimeout(() => {
        setCurrentSlide(next)
        setIsTransitioning(false)
      }, 300)
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide, banners.length])

  const goToSlide = (index) => {
    if (index !== currentSlide && !isTransitioning) {
      setIsTransitioning(true)
      setNextSlide(index)
      
      setTimeout(() => {
        setCurrentSlide(index)
        setIsTransitioning(false)
      }, 300)
    }
  }

  // const goToPrevious = () => {
  //   setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
  // }

  // const goToNext = () => {
  //   setCurrentSlide((prev) => (prev + 1) % banners.length)
  // }

  return (
    <section className="relative w-full h-100 md:h-96 lg:h-[32rem] xl:h-[36rem] overflow-hidden bg-gray-900">
      {/* Banner Slides */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-10' 
                : 'opacity-0 scale-105 z-0'
            }`}
          >
            {/* Background Image with overlay */}
            <div className="relative w-full h-full">
              <img
                src={banner.image}
                onClick={() => navigate('/books')}
                alt={banner.title}
                className={`w-full h-full object-cover cursor-pointer transition-transform duration-700 ${
                  index === currentSlide ? 'scale-100' : 'scale-110'
                }`}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>
            </div>
            
            {/* Content with animations */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* <h2 className={`text-3xl sm:text-4xl lg:text-6xl font-bold ${banner.textColor} mb-4 drop-shadow-lg transition-all duration-500 ${
                  index === currentSlide ? 'animate-fadeInUp translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {banner.title}
                </h2>
                <p className={`text-lg sm:text-xl lg:text-2xl ${banner.textColor} mb-8 drop-shadow-md transition-all duration-700 delay-200 ${
                  index === currentSlide ? 'animate-fadeInUp translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  {banner.subtitle}
                </p> */}
                
                <button 
                  onClick={() => navigate('/books')}
                  className={`px-8 py-2 bg-white hover:bg-white text-black font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                    index === currentSlide ? 'animate-fadeInScale translate-y-0 opacity-100 delay-400' : 'translate-y-8 opacity-0'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows with enhanced styling */}
      {/* <button
        onClick={() => goToSlide((currentSlide - 1 + banners.length) % banners.length)}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-300 hover:scale-110 z-30 group"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors" />
      </button>

      <button
        onClick={() => goToSlide((currentSlide + 1) % banners.length)}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-3 transition-all duration-300 hover:scale-110 z-30 group"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:text-blue-200 transition-colors" />
      </button> */}

      {/* Enhanced Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`relative transition-all duration-300 disabled:cursor-not-allowed ${
              index === currentSlide
                ? 'w-8 h-3'
                : 'w-3 h-3 hover:scale-125'
            }`}
          >
            <div className={`w-full h-full rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg animate-pulseGlow'
                : 'bg-white/50 hover:bg-white/80'
            }`}>
            </div>
            {index === currentSlide && (
              <div className="absolute inset-0 rounded-full bg-white animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}

export default BannerCarousel
