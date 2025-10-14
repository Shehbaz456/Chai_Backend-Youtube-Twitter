import React from 'react'
import { Link } from 'react-router-dom'
import { Search, Home, PlayCircle, Video } from 'lucide-react'
import { Button } from '../../ui/button'

function EmptyVideoPage({ 
  title = "No videos available",
  description = "There are no videos here available. Please try searching for something else or explore our trending content.",
  showActions = true 
}) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-12">
      <div className="text-center max-w-lg">
        {/* Animated Icon Group */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            {/* Background Circle */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/10 to-blue-500/10 flex items-center justify-center border border-zinc-800">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-blue-500/20 flex items-center justify-center">
                <Video className="w-12 h-12 text-purple-500" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <PlayCircle className="w-5 h-5 text-gray-400" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg mb-10 leading-relaxed px-4">
          {description}
        </p>

        {/* Actions */}
        {showActions && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white min-w-[180px]"
            >
              <Link to="/">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-zinc-700 text-white hover:bg-zinc-800 min-w-[180px]"
            >
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" />
                Try Search
              </Link>
            </Button>
          </div>
        )}

        {/* Optional: Help Text */}
        <div className="mt-10 pt-8 border-t border-zinc-800">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <Link to="/support" className="text-purple-500 hover:text-purple-400 underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmptyVideoPage
