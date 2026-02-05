import { mockStories } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function StoriesSection() {
  return (
    <section className="py-20 bg-teal-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stories of Change</h2>
          <p className="text-teal-100 max-w-2xl mx-auto">
            Real stories from the women and girls whose lives have been transformed through LCEO's initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockStories.map((story) => (
            <Card key={story.id} className="bg-teal-700 border-none text-white">
              <CardContent className="p-8">
                <Quote className="w-10 h-10 text-sand-400 mb-6 opacity-50 text-[#eacfa2]" />
                <h3 className="text-xl font-bold mb-2">{story.title.en}</h3>
                <p className="text-teal-50 mb-6 italic">"{story.title.rw}"</p>
                <p className="text-teal-100 mb-8 leading-relaxed">
                  {story.content.en}
                </p>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-[#eacfa2]">
                    <AvatarImage src={story.media?.[0]?.thumbnail} />
                    <AvatarFallback className="bg-teal-900 text-[#eacfa2]">
                      {story.authorName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{story.authorName}</p>
                    <p className="text-sm text-teal-300 capitalize">{story.authorRole.replace('_', ' ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
