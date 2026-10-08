import { Link } from "react-router";
import { Clock, Users, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { SEO } from "../components/SEO";

export function Programs() {
  const programs = [
    {
      title: "Grass Roots",
      subtitle: "Building Strong Foundations",
      age: "U4 - U12",
      level: "Beginner to Intermediate",
      duration: "1 hour/session",
      sessions: "3 sessions/week",
      image: "/programs/grassroots.jpeg",
      imageClass: "scale-[1.2] origin-center",
      description: "Foundation building with a focus on basic skills, coordination, and teamwork. Perfect for young athletes starting their football journey.",
      features: [
        "Basic ball control and dribbling",
        "Fun, game-based learning",
        "Age-appropriate fitness training",
        "Team building activities",
        "Character development",
      ],
      price: "₹1,840/month",
    },
    {
      title: "Youth",
      subtitle: "Competitive Excellence",
      age: "U13 - U18",
      level: "Intermediate to Advanced",
      duration: "1.5 hours/session",
      sessions: "4 sessions/week",
      image: "/programs/youth.png",
      imageClass: "scale-[1.2] origin-center",
      description: "Advanced training for competitive football at the district and state levels. Focuses on tactical awareness and physical conditioning.",
      features: [
        "Advanced technical skills",
        "Tactical and strategic training",
        "Position-specific coaching",
        "Mental conditioning",
        "Tournament participation",
      ],
      price: "₹2,140/month",
    },
    {
      title: "Elite",
      subtitle: "Path to Professional Football",
      age: "U19 - U21",
      level: "Advanced to Elite",
      duration: "2 hours/session",
      sessions: "5 sessions/week",
      image: "/programs/elite.png",
      imageClass: "scale-[1.2] origin-center",
      description: "Elite program preparing athletes for professional careers, featuring high-intensity training and professional pathways.",
      features: [
        "Professional-level training",
        "Individualized development plans",
        "Strength & conditioning program",
        "Video analysis sessions",
        "Agent and club connections",
      ],
      price: "₹2,520/quarter",
    },
    {
      title: "Senior",
      subtitle: "Senior Level Competition",
      age: "U22 - U24",
      level: "Elite",
      duration: "2 hours/session",
      sessions: "2 sessions/week",
      image: "/programs/senior.png",
      description: "Professional development and senior level competition. Focuses on maintaining peak physical condition and advanced match tactics.",
      features: [
        "Senior match simulation",
        "Advanced tactical mastery",
        "High-performance conditioning",
        "Nutrition and recovery support",
        "Professional league placement assistance",
      ],
      price: "₹1,920/quarter",
    },
    {
      title: "Super Senior",
      subtitle: "Experienced Player Development",
      age: "Above 24",
      level: "Advanced",
      duration: "3 hours/session",
      sessions: "2 sessions/week",
      image: "/programs/supersenior.png",
      description: "Advanced tactical play and leadership for experienced players. Great for those playing semi-pro or looking to maintain competitive fitness.",
      features: [
        "Veteran tactical play",
        "Leadership on the pitch",
        "Injury prevention & recovery",
        "Competitive small-sided games",
      ],
      priceLabel: "Compensation",
      price: "Performance-Based Salary",
    },
    {
      title: "Parents Program",
      subtitle: "Get Involved & Stay Fit",
      age: "All Ages",
      level: "All Levels",
      duration: "2 hours/session",
      sessions: "1 session/month",
      image: "/programs/parents.jpeg",
      description: "Fun activities, fitness training, and awareness programs designed specifically for parents to stay active while their kids train.",
      features: [
        "Recreational football",
        "Fitness and wellness sessions",
        "Sports nutrition awareness",
        "Community building events",
      ],
    },
  ];

  const additionalPrograms = [
    {
      title: "Holiday Camps",
      description: "Intensive training camps during school breaks",
      duration: "1-2 weeks",
    },
    {
      title: "Private Coaching",
      description: "One-on-one sessions for personalized development",
      duration: "Flexible",
    },
    {
      title: "School Partnership Program",
      description: "Customized programs for educational institutions",
      duration: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen md:pt-20">
      <SEO
        title="Football Training Programs | Chola FC"
        description="Explore junior, youth elite, and professional football training programs offered by Chola FC."
        canonicalUrl="https://www.cholafc.com/programs"
      />
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-[#0A0E27] to-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
                Training Programs
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Comprehensive football training programs designed for every age, skill level, and
              ambition
            </p>
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-flow-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "md:col-start-2" : ""}>
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] rounded-2xl blur-2xl opacity-20" />
                    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden">
                      <ImageWithFallback
                        src={program.image}
                        alt={program.title}
                        className={`w-full h-full object-cover ${program.imageClass || ''}`}
                      />
                    </div>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "md:col-start-1 md:row-start-1" : ""}>
                  <div className="inline-block px-4 py-1.5 bg-[#FF6B35]/20 border border-[#FF6B35] rounded-full mb-4">
                    <span className="text-[#FFB800] text-sm tracking-wider">
                      {program.subtitle.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-4">{program.title}</h2>
                  <p className="text-gray-300 text-lg mb-6">{program.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Users className="text-[#FF6B35]" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Age Group</div>
                        <div className="text-white">{program.age}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="text-[#FF6B35]" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Duration</div>
                        <div className="text-white">{program.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="text-[#FF6B35]" size={20} />
                      <div>
                        <div className="text-sm text-gray-400">Sessions</div>
                        <div className="text-white">{program.sessions}</div>
                      </div>
                    </div>
                    {program.price && (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded flex items-center justify-center">
                          <span className="text-white text-xs">₹</span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-400">{program.priceLabel || "Investment"}</div>
                          <div className="text-white">{program.price}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mb-8">
                    <h3 className="text-white mb-4">Program Highlights:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {program.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-[#FFB800] flex-shrink-0 mt-0.5" size={18} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/join"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FFB800] text-white rounded-lg hover:opacity-90 transition-opacity group"
                  >
                    Enroll Now
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Programs */}
      <section className="py-20 bg-[#12172E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Additional Offerings
            </h2>
            <p className="text-gray-300 text-lg">Flexible programs to suit your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {additionalPrograms.map((program, index) => (
              <div
                key={index}
                className="bg-[#0A0E27] border border-white/10 rounded-2xl p-8 hover:border-[#FF6B35] transition-all"
              >
                <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
                <p className="text-gray-300 mb-4">{program.description}</p>
                <div className="flex items-center gap-2 text-[#FFB800]">
                  <Clock size={18} />
                  <span>{program.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-[#0A0E27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What's Included in Every Program
            </h2>
            <p className="text-gray-300 text-lg">Comprehensive support for your development</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-4">Kit</div>
              <h3 className="text-xl font-bold text-white mb-3">Official Kit</h3>
              <p className="text-gray-300">Complete training kit including jersey and equipment</p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-4">Data</div>
              <h3 className="text-xl font-bold text-white mb-3">Performance Tracking</h3>
              <p className="text-gray-300">Regular assessments and progress reports</p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-4">Med</div>
              <h3 className="text-xl font-bold text-white mb-3">Injury Prevention</h3>
              <p className="text-gray-300">Access to sports physiotherapy and medical support</p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-4">Play</div>
              <h3 className="text-xl font-bold text-white mb-3">Tournament Access</h3>
              <p className="text-gray-300">Opportunities to compete at various levels</p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-4">Home</div>
              <h3 className="text-xl font-bold text-white mb-3">Parent Engagement</h3>
              <p className="text-gray-300">Regular updates and parent-coach meetings</p>
            </div>

            <div className="bg-[#12172E] border border-white/10 rounded-2xl p-8 text-center">
              <div className="text-3xl font-bold text-white mb-4">Life</div>
              <h3 className="text-xl font-bold text-white mb-3">Holistic Development</h3>
              <p className="text-gray-300">Life skills and academic support alongside sports</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-white/90 text-xl mb-8">
            Join a program today and take the first step towards athletic excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="px-8 py-4 bg-white text-[#FF6B35] rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
            >
              Enroll Now
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
