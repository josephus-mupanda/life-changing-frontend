import { Card, CardContent } from "@/components/ui/card";
import { Users, Briefcase, Heart, Trophy } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Women Empowered",
    description: "Through our holistic programs"
  },
  {
    icon: Briefcase,
    value: "120",
    label: "Businesses Started",
    description: "Sustainable income generation"
  },
  {
    icon: Heart,
    value: "1,500+",
    label: "Health Screenings",
    description: "Improving community well-being"
  },
  {
    icon: Trophy,
    value: "95%",
    label: "Success Rate",
    description: "Graduates who stay employed"
  }
];

export function ImpactSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Our Impact in Numbers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We measure our success by the tangible improvements in the lives of the women and girls we serve in Rwanda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg bg-teal-50/50 hover:bg-teal-50 transition-colors duration-300">
              <CardContent className="pt-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-100 mb-6 text-teal-600">
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-4xl font-bold text-teal-900 mb-2">{stat.value}</h3>
                <h4 className="text-xl font-semibold text-teal-700 mb-2">{stat.label}</h4>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
