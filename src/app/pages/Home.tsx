import { Link } from "react-router";
import { ArrowRight, Trophy, Users, Target, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Home() {
  const programs = [
    {
      title: "Junior Development",
      age: "10-14 years",
      description: "Foundation building with focus on basic skills and teamwork",
      icon: "⚽",
    },
    {
      title: "Youth Elite",
      age: "15-18 years",
      description: "Advanced training for competitive football at state level",
      icon: "🏆",
    },
    {
      title: "Professional Track",
      age: "19-25 years",
      description: "Elite program preparing athletes for professional careers",
      icon: "⭐",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Parent",
      content: "My son has grown tremendously both as a player and a person. The coaches are exceptional.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Student Athlete",
      content: "Best decision I ever made. The training quality and facilities are world-class.",
      rating: 5,
    },
    {
      name: "St. John's School",
      role: "Partner Institution",
      content: "Chola FC has been instrumental in developing our students' athletic potential.",
      rating: 5,
    },
  ];

  const stats = [
    { number: "500+", label: "Active Athletes" },
    { number: "15+", label: "Expert Coaches" },
    { number: "50+", label: "Partner Schools" },
    { number: "12", label: "State Champions" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E27] via-[#0A0E27]/95 to-transparent z-10" />
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1569196272637-2a7d9b21119e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHBsYXllciUyMGFjdGlvbiUyMGRhcmt8ZW58MXx8fHwxNzczODYwMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Football player in action"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left py-8">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-[#FF6B35]/20 border border-[#FF6B35] rounded-full mb-6">
              <span className="text-[#FFB800] text-sm sm:text-base tracking-wider">INDIA'S PREMIER SPORTS ORGANIZATION</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Building Champions,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
                One Game at a Time
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl">
              Join Chola FC and unlock your potential with world-class football training,
              expert coaches, and state-of-the-art facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/join"
                className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group"
              >
                Join Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/programs"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Where Passion Meets
                <span className="block text-[#FF6B35]">Excellence</span>
              </h2>
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                Chola FC was founded with a simple vision: to create champions who excel
                both on and off the field. We combine traditional Indian values with modern training
                methodologies to nurture the next generation of sports leaders.
              </p>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                Our comprehensive programs are designed to develop not just athletic prowess, but
                also character, discipline, and leadership skills that will serve our athletes
                throughout their lives.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#FFB800] transition-colors group"
              >
                Learn More About Us
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-2xl blur-2xl opacity-20" />
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1771257807779-a72e74deaa11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGZvb3RiYWxsJTIwdHJhaW5pbmd8ZW58MXx8fHwxNzczODYwMjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Youth football training"
                className="relative rounded-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Programs</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Tailored training programs for every age group and skill level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-[#0A0E27] border border-white/10 rounded-2xl p-8 hover:border-[#FF6B35] transition-all group"
              >
                <div className="text-5xl mb-4">{program.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {program.title}
                </h3>
                <div className="text-[#FFB800] mb-4">{program.age}</div>
                <p className="text-gray-300 mb-6">{program.description}</p>
                <Link
                  to="/programs"
                  className="inline-flex items-center gap-2 text-[#FF6B35] group-hover:gap-3 transition-all"
                >
                  View Details
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              View All Programs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Chola FC?</h2>
            <p className="text-gray-300 text-lg">Excellence in every aspect of football training</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Trophy className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Expert Coaching</h3>
              <p className="text-gray-300">
                Learn from certified coaches with national and international experience
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community Focus</h3>
              <p className="text-gray-300">
                Be part of a supportive community that celebrates every achievement
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Personalized Training</h3>
              <p className="text-gray-300">
                Customized programs designed to maximize each athlete's potential
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What People Say</h2>
            <p className="text-gray-300 text-lg">Trusted by students, parents, and institutions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[#0A0E27] border border-white/10 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-[#FFB800] fill-[#FFB800]" size={20} />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <div className="text-white font-bold">{testimonial.name}</div>
                  <div className="text-[#FF6B35] text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Join hundreds of athletes who are already on their path to greatness
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="px-8 py-4 bg-white text-[#FF6B35] rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Join Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}