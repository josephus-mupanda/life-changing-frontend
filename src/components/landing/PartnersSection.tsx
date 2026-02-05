import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';

export function PartnersSection() {
  const partners = [
    {
      name: 'FAWE RWANDA',
      description: 'Forum for African Women Educationalists',
      logo: '🎓',
      website: 'https://fawe.org',
    },
    {
      name: 'ECORYS',
      description: 'International Development Consultancy',
      logo: '🌍',
      website: 'https://www.ecorys.com',
    },
    {
      name: 'MOR ASSAYAG',
      description: 'Strategic Partnership & Development',
      logo: '🤝',
      website: '#',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-[#4c9789]/10 text-[#4c9789] border-[#4c9789]/20">
            Our Partners
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Working Together for Greater Impact
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We collaborate with leading organizations to amplify our mission and reach
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {partners.map((partner) => (
            <Card key={partner.name} className="hover:shadow-xl transition-shadow text-center group">
              <CardContent className="pt-8 pb-8">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                  {partner.logo}
                </div>
                <h3 className="font-bold text-xl mb-2 text-[#4c9789]">{partner.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{partner.description}</p>
                {partner.website !== '#' && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#4c9789] hover:underline"
                  >
                    Visit Website →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Interested in partnering with LCEO?</p>
          <a href="/contact" className="text-[#4c9789] hover:underline font-semibold">
            Get in touch →
          </a>
        </div>
      </div>
    </section>
  );
}
