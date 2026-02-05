import { mockPrograms } from "@/lib/mock-data";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function ProgramsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-teal-800 mb-4">Our Programs</h2>
            <p className="text-gray-600">
              Tailored interventions designed to address the specific needs of vulnerable young women and girls.
            </p>
          </div>
          <Button asChild variant="link" className="text-teal-600 font-semibold mt-4 md:mt-0">
            <Link to="/programs" className="flex items-center gap-2">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPrograms.map((program) => (
            <Card key={program.id} className="overflow-hidden border-none shadow-md flex flex-col h-full hover:shadow-xl transition-shadow duration-300">
              <div className="h-48 overflow-hidden relative">
                <img
                  src={program.coverImage || "https://images.unsplash.com/photo-1553777907-f5dbbbb44d7c?auto=format&fit=crop&q=80"}
                  alt={program.name.en}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <Badge className="absolute top-4 right-4 bg-teal-600 hover:bg-teal-700">
                  {program.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-teal-900">{program.name.en}</CardTitle>
                <h4 className="text-sm font-medium text-teal-600/80 italic">{program.name.rw}</h4>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 line-clamp-3">
                  {program.description.en}
                </p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button asChild variant="outline" className="w-full border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800">
                  <Link to={`/programs/${program.id}`}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
