import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export function SDGSection() {
  const sdgGoals = [
    { number: 1, title: 'No Poverty', color: 'bg-[#e5243b]' },
    { number: 3, title: 'Good Health and Well-being', color: 'bg-[#4c9f38]' },
    { number: 4, title: 'Quality Education', color: 'bg-[#c5192d]' },
    { number: 5, title: 'Gender Equality', color: 'bg-[#ff3a21]' },
    { number: 8, title: 'Decent Work and Economic Growth', color: 'bg-[#a21942]' },
    { number: 10, title: 'Reduced Inequalities', color: 'bg-[#dd1367]' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#4c9789] text-white">
            Global Impact
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Aligned UN Sustainable Development Goals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our programs directly contribute to achieving the 2030 Agenda for Sustainable Development
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          {sdgGoals.map((goal) => (
            <Card key={goal.number} className="hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer">
              <div className={`${goal.color} text-white p-4 flex items-center justify-center font-bold text-3xl h-32 transition-transform group-hover:scale-110`}>
                {goal.number}
              </div>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="text-xs font-medium leading-tight">{goal.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Learn more about{' '}
            <a 
              href="https://sdgs.un.org/goals" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#4c9789] hover:underline font-medium"
            >
              UN Sustainable Development Goals
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
