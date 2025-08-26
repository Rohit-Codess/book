import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const banners = [
    {
      id: 1,
      title: "Best Sellers",
      subtitle: "Up to 50% OFF",
      description: "Fiction, Non-fiction & Educational Books",
      image: "/images/section/homeSection/BannerCarousel/bg1.jpg",
      buttonText: "Shop Now",
      bgColor: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      title: "Stationery Sale",
      subtitle: "Starting ₹99",
      description: "Premium Quality Notebooks & Pens",
      image: "/images/section/homeSection/BannerCarousel/bg2.jpg",
      buttonText: "Explore",
      bgColor: "from-green-500 to-green-600"
    },
    {
      id: 3,
      title: "Kids Collection",
      subtitle: "Flat 40% OFF",
      description: "Educational & Story Books for Children",
      image: "/images/section/homeSection/BannerCarousel/bg3.jpg",
      buttonText: "Buy Now",
      bgColor: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      title: "Academic Books",
      subtitle: "Extra 30% OFF",
      description: "Textbooks & Reference Materials",
      image: "/images/section/homeSection/BannerCarousel/bg4.jpg",
      buttonText: "View All",
      bgColor: "from-orange-500 to-orange-600"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length)
    }, 4000)

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
    <section className="relative w-full h-[280px] md:h-[320px] lg:h-[360px] overflow-hidden bg-white">
      {/* Banner Container */}
      <div className="relative h-full max-w-7xl mx-auto">
        {/* Banner Slides */}
        <div className="relative h-full overflow-hidden rounded-lg">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 translate-x-0' 
                  : index < currentSlide
                    ? 'opacity-0 -translate-x-full'
                    : 'opacity-0 translate-x-full'
              }`}
            >
              {/* Flipkart-style Banner Layout */}
              <div className={`w-full h-full bg-gradient-to-r ${banner.bgColor} flex items-center relative overflow-hidden`}>
                {/* Content Section - Left Side */}
                <div className="flex-1 px-8 md:px-12 lg:px-16 z-10">
                  <div className="max-w-md">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-yellow-200 font-semibold mb-2">
                      {banner.subtitle}
                    </p>
                    <p className="text-sm md:text-base text-white/90 mb-6">
                      {banner.description}
                    </p>
                    <button 
                      onClick={() => navigate('/books')}
                      className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      {banner.buttonText}
                    </button>
                  </div>
                </div>

                {/* Image Section - Right Side */}
                <div className="flex-1 relative h-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full w-auto object-cover opacity-80"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Flipkart Style */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        {/* Dot Indicators - Flipkart Style */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-6'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BannerCarousel
