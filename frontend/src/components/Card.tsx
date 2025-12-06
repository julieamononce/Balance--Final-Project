import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  link: string;
  image: string;
  shadow: string;
}

export default function Card({ title, description, link, image, shadow }: CardProps) {
  return (
    <Link to={link} className="block">
      <div className={`bg-white rounded-md shadow-md p-10 w-100 hover:${shadow} hover:scale-105 transition-all cursor-pointer`}>
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
    </Link>

  );
}