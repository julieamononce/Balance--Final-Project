import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  link?: string;
  image: string;
  shadow: string;
  className?: string;
  width?: string;
}

export default function Card({ title, description, link, image, shadow, className = '', width = 'w-100' }: CardProps) {
  const bgClass = className.includes('bg-transparent') ? 'bg-white/80' : 'bg-white';
  const hoverEffects = className.includes('bg-transparent') ? '' : `hover:${shadow} hover:scale-105`;
  const cardContent = (
    <div className={`${bgClass} rounded-md shadow-md p-10 ${width} ${hoverEffects} transition-all ${link ? 'cursor-pointer' : ''} ${className}`}>
      <div className="flex items-start gap-3">
        <img src={image} alt={title} className="w-22 h-22" />
        <div className="flex-1">
          <h3 className="text-3xl font-semibold mb-2">{title}</h3>
          <p className="text-1xs text-gray-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );

  return link ? (
    <Link to={link} className="block">
      {cardContent}
    </Link>
  ) : (
    <div className="block">
      {cardContent}
    </div>
  );
}