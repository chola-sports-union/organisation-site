import { Trophy, Target, Heart, Award } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";

export function About() {
  const values = [
    {
      icon: Trophy,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Building character through honest and ethical conduct",
    },
    {
      icon: Target,
      title: "Dedication",
      description: "Committed to the continuous development of every athlete",
    },
    {
      icon: Award,
      title: "Community",
      description: "Creating a supportive environment where everyone thrives",
    },
  ];

  const coaches = [
    {
      name: "Rajesh Venkatesh",
      role: "Head Coach",
      credentials: "AFC Pro License, Former National Player",
      image: "https://images.unsplash.com/photo-1574772135913-d519461c3996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNvYWNoJTIwdHJhaW5pbmclMjBmaWVsZHxlbnwxfHx8fDE3NzM4NjAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Priya Krishnan",
      role: "Youth Development Coach",
      credentials: "UEFA B License, Sports Psychology Specialist",
      image: "https://images.unsplash.com/photo-1574772135913-d519461c3996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNvYWNoJTIwdHJhaW5pbmclMjBmaWVsZHxlbnwxfHx8fDE3NzM4NjAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Arjun Menon",
      role: "Technical Director",
      credentials: "FA Level 3, 15+ Years Coaching Experience",
      image: "https://images.unsplash.com/photo-1574772135913-d519461c3996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNvYWNoJTIwdHJhaW5pbmclMjBmaWVsZHxlbnwxfHx8fDE3NzM4NjAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Deepa Sharma",
      role: "Fitness & Conditioning Coach",
      credentials: "Certified Strength Coach, Former Athlete",
      image: "https://images.unsplash.com/photo-1574772135913-d519461c3996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNvYWNoJTIwdHJhaW5pbmclMjBmaWVsZHxlbnwxfHx8fDE3NzM4NjAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen md:pt-20">
      <SEO
        title="About Chola FC"
        description="Learn about Chola FC's vision, mission, coaches, values, and achievements."
        canonicalUrl="https://www.cholafc.com/about"
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A0E27] to-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
                Chola FC
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Empowering the next generation of athletes through excellence, dedication, and
              world-class training
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-2xl blur-2xl opacity-20" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551390415-0de411440ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjB0ZWFtJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzczODYwMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Soccer team celebration"
                className="relative rounded-2xl w-full h-[500px] object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2015, Chola FC emerged from a simple yet powerful vision:
                  to create a platform where young Indian athletes could receive world-class
                  training without having to leave their homeland.
                </p>
                <p>
                  What started as a small football academy in Chennai has grown into one of
                  India's most respected football clubs, nurturing over 500 athletes across
                  multiple age groups and skill levels.
                </p>
                <p>
                  Our name pays homage to the great Chola dynasty, known for their excellence,
                  innovation, and lasting impact. We carry forward this legacy by building
                  champions who embody these same principles in the world of sports.
                </p>
                <p>
                  Today, Chola FC is proud to partner with over 50 schools and clubs across Tamil Nadu,
                  producing state champions and creating pathways for young athletes to pursue
                  their dreams at the highest levels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] p-12 rounded-2xl">
              <h2 className="text-4xl font-bold text-white mb-6">Our Vision</h2>
              <p className="text-white/90 text-lg leading-relaxed">
                To be India's leading sports organization, recognized globally for developing
                world-class athletes who embody excellence, integrity, and sportsmanship. We
                envision a future where every young athlete has access to the training, mentorship,
                and opportunities needed to reach their full potential.
              </p>
            </div>

            <div className="bg-[#0A0E27] border border-white/10 p-12 rounded-2xl">
              <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To provide comprehensive, scientifically-backed sports training programs that
                develop not just athletic ability, but also character, discipline, and life skills.
                We are committed to creating an inclusive environment where every athlete,
                regardless of background, can pursue their sporting dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-300 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center hover:border-[#FF6B35] transition-all"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Coaches</h2>
            <p className="text-gray-300 text-lg">
              Expert professionals dedicated to your athletic development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coaches.map((coach, index) => (
              <div
                key={index}
                className="bg-[#0A0E27] border border-white/10 rounded-2xl overflow-hidden hover:border-[#FF6B35] transition-all group"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{coach.name}</h3>
                  <div className="text-[#FF6B35] mb-3">{coach.role}</div>
                  <p className="text-gray-400 text-sm">{coach.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Achievements</h2>
            <p className="text-gray-300 text-lg">A legacy of excellence and success</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-white mb-3">12 State Championships</h3>
              <p className="text-gray-300">
                Our teams have dominated state-level competitions across multiple age groups
              </p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-white mb-3">25+ Professional Athletes</h3>
              <p className="text-gray-300">
                Chola FC alumni playing at professional and semi-professional levels
              </p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold text-white mb-3">100% Academic Support</h3>
              <p className="text-gray-300">
                All our athletes maintain excellent academic performance alongside sports
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}