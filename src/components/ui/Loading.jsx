import { motion } from 'framer-motion'

const Loading = ({ type = 'dashboard' }) => {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    }
  }

  if (type === 'table') {
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <motion.div
              className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
              animate={shimmer.animate}
              transition={shimmer.transition}
            />
            <div className="flex-1 space-y-2">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-2/3"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-1/2"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
            </div>
            <motion.div
              className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%]"
              animate={shimmer.animate}
              transition={shimmer.transition}
            />
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="metric-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-3">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-1/2"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
              <motion.div
                className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-3/4"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-2/3"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="metric-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="space-y-3">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-1/2"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
              <motion.div
                className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-3/4"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-2/3"
                animate={shimmer.animate}
                transition={shimmer.transition}
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <motion.div
            className="gradient-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-1/3 mb-4"
              animate={shimmer.animate}
              transition={shimmer.transition}
            />
            <motion.div
              className="h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%]"
              animate={shimmer.animate}
              transition={shimmer.transition}
            />
          </motion.div>
        </div>
        <div>
          <motion.div
            className="gradient-card rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-1/2 mb-4"
              animate={shimmer.animate}
              transition={shimmer.transition}
            />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                    animate={shimmer.animate}
                    transition={shimmer.transition}
                  />
                  <div className="flex-1 space-y-1">
                    <motion.div
                      className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-3/4"
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                    <motion.div
                      className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%] w-1/2"
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Loading