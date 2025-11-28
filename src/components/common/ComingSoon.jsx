import { Sparkles } from "lucide-react";

const ComingSoon = ({ 
  icon: Icon, 
  title, 
  description,
  iconColor = "from-blue-500 to-purple-600",
  iconAnimation = ""
}) => {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="text-center animate-scaleIn">
        <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${iconColor} rounded-3xl mb-6 shadow-2xl shadow-${iconColor.split('-')[1]}-500/50 ${iconAnimation}`}>
          <Icon className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold font-display mb-3 text-gray-900">
          {title}
        </h1>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-purple-500" />
          <p className="text-lg text-gray-500 font-medium">Coming Soon</p>
          <Sparkles className="w-5 h-5 text-purple-500" />
        </div>
        <p className="text-gray-400 max-w-md mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;

