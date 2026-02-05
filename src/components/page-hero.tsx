import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  height?: 'sm' | 'md' | 'lg' | 'xl';
  overlay?: boolean;
}

const heightClasses = {
  sm: 'min-h-[300px]',
  md: 'min-h-[400px]',
  lg: 'min-h-[500px]',
  xl: 'min-h-[600px]',
};

export function PageHero({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundGradient = 'from-teal-600 to-teal-800',
  breadcrumbs,
  actions,
  height = 'md',
  overlay = true,
}: PageHeroProps) {
  return (
    <div className={`relative ${heightClasses[height]} flex items-center justify-center overflow-hidden`}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {backgroundImage ? (
          <>
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
            {overlay && <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient} opacity-90`} />}
          </>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${backgroundGradient}`}>
            {/* Decorative Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-6 text-sm"
            >
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-2">
                  {crumb.href ? (
                    <Link
                      to={crumb.href}
                      className="text-white/80 hover:text-white transition-colors hover:underline"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  )}
                </div>
              ))}
            </motion.nav>
          )}

          {/* Subtitle Badge */}
          {subtitle && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-4"
            >
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                <span className="text-sm font-medium uppercase tracking-wider">{subtitle}</span>
              </div>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* Actions */}
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              {actions}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/70 rounded-full mx-auto"
          />
        </div>
      </motion.div>
    </div>
  );
}
