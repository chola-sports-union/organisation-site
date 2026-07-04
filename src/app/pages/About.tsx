import { Trophy, Target, Heart, Award } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";
import { motion } from "motion/react";

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
      name: "Mohan Prasanth B",
      role: "Head Coach",
      credentials: "AIFF C License",
      image: "https://images.unsplash.com/photo-1574772135913-d519461c3996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNvYWNoJTIwdHJhaW5pbmclMjBmaWVsZHxlbnwxfHx8fDE3NzM4NjAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      name: "Karthikeyan",
      role: "Youth Development Coach",
      credentials: "AIFF D License",
      image: "https://images.unsplash.com/photo-1574772135913-d519461c3996?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMGNvYWNoJTIwdHJhaW5pbmclMjBmaWVsZHxlbnwxfHx8fDE3NzM4NjAyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <div className="min-h-screen md:pt-20">
      <SEO
        title="About Chola FC"
        description="Learn about Chola FC's vision, mission, coaches, values, and story."
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
          <div className="grid max-[1199px]:grid-cols-1 min-[1200px]:grid-cols-2 gap-12 items-center">
            <div className="relative w-full">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-2xl blur-2xl opacity-20" />
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9]">
                <ImageWithFallback
                  src="/story.png"
                  alt="Chola FC teams"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2015, Chola FC was established with a simple vision: to create an
                  environment where young footballers can develop their skills, build confidence,
                  and enjoy the game through quality coaching.
                </p>
                <p>
                  Over the years, the club has grown into a community of 100+ registered players,
                  offering structured training across multiple age groups under the guidance of
                  a dedicated coaching team. Every training session is focused on developing
                  technical ability, tactical understanding, physical fitness, and sportsmanship.
                </p>
                <p>
                  Inspired by the rich legacy of the Chola dynasty, our name represents excellence,
                  discipline, and continuous growth. These values shape everything we do, both on
                  and off the field.
                </p>
                <p>
                  Today, Chola FC operates across multiple training venues, providing a safe and
                  supportive environment where players of all skill levels can learn, improve, and
                  pursue their passion for football.
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
            <div className="bg-[#0A0E27] border border-white/10 p-12 rounded-2xl flex flex-col">
              <h2 className="text-4xl font-bold text-white mb-6">Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed flex-1">
                To contribute to the development of Indian football by nurturing disciplined,
                confident, and skilled players who embody excellence, teamwork, and sportsmanship.
              </p>
            </div>

            <div className="bg-[#0A0E27] border border-white/10 p-12 rounded-2xl flex flex-col">
              <h2 className="text-4xl font-bold text-white mb-6">Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed flex-1">
                To provide quality grassroots football coaching through structured training,
                qualified coaches, and a safe, inclusive environment that enables every player
                to learn, grow, and enjoy the game.
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
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
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
        </div>
      </section>

      {/* Letter from Chola FC */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#0A0E27] via-[#0D1130] to-[#0A0E27]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <img
            src="/logo.png"
            alt=""
            className="w-full max-w-[600px] opacity-[0.04] md:opacity-[0.06]"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
            <motion.div
              className="md:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-start gap-6">
                <div className="hidden md:block w-px h-32 bg-gradient-to-b from-[#FF6B35] to-transparent mt-2 shrink-0" />
                <div>
                  <span className="text-[#FF6B35] text-sm font-medium tracking-[0.2em] uppercase">
                    A Letter from Chola FC
                  </span>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-6 leading-tight">
                    Every Journey
                    <br />
                    Begins with
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
                      One Step.
                    </span>
                  </h2>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            >
              <div className="max-w-[600px] relative">
                <span className="absolute -top-8 -left-4 text-7xl md:text-8xl leading-none text-[#FF6B35]/20 font-serif select-none">
                  &ldquo;
                </span>
                <div className="text-gray-300 text-lg md:text-xl leading-[1.9] space-y-6 pl-2">
                  <p>Dear Future Player,</p>
                  <p>
                    Every great footballer starts the same way.
                    <br />
                    Not with trophies.
                    <br />
                    Not with fame.
                    <br />
                    But with the courage to take the first step.
                  </p>
                  <p>
                    At Chola FC, we believe talent grows through discipline, hard work, and the
                    love of the game.
                  </p>
                  <p>
                    Whether you're touching a football for the first time or dreaming of playing at
                    the highest level, you'll always have a place to learn, improve, and belong.
                  </p>
                  <p className="!mt-8">
                    <span className="text-2xl md:text-3xl font-bold text-[#FFB800]">
                      Welcome to Chola FC.
                    </span>
                    <br />
                    <span className="text-white text-xl md:text-2xl font-semibold">
                      Let's build your journey together.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}