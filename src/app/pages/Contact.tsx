import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { SEO } from "../components/SEO";

export function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["cholafootballclub@gmail.com"],
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 89255 18891", "+91 73588 44516"],
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Chola FC Sports Complex", "Anna Nagar, Chennai", "Tamil Nadu 600040, India"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Saturday: 6:00 AM - 8:00 PM", "Sunday: 7:00 AM - 6:00 PM"],
    },
  ];

  return (
    <div className="min-h-screen md:pt-20 bg-[#0A0E27]">
      <SEO
        title="Contact Chola FC | Football Academy in Erode"
        description="Get in touch with Chola FC for enquiries, registrations, and football coaching information."
        canonicalUrl="https://www.cholafc.com/contact"
      />
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#0A0E27] to-[#12172E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get in
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
              Touch
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Have questions? We're here to help. Reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div
                  key={index}
                  className="bg-[#12172E] border border-white/10 rounded-2xl p-6 hover:border-[#FF6B35] transition-all"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-300 text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-white">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      required
                      className="mt-2 bg-[#12172E] border-white/10 text-white"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="mt-2 bg-[#12172E] border-white/10 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="mt-2 bg-[#12172E] border-white/10 text-white"
                    placeholder="+91 89255 18891"
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-white">
                    Subject *
                  </Label>
                  <Input
                    id="subject"
                    required
                    className="mt-2 bg-[#12172E] border-white/10 text-white"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-white">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    className="mt-2 bg-[#12172E] border-white/10 text-white"
                    placeholder="Tell us how we can help you..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 text-white py-6 text-lg"
                  disabled={formSubmitted}
                >
                  {formSubmitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </Button>

                {formSubmitted && (
                  <p className="text-[#FFB800] text-center">
                    Thank you! We'll get back to you within 24 hours.
                  </p>
                )}
              </form>
            </div>

            {/* Map & Additional Info */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Visit Our Facility</h2>
              
              {/* Map Placeholder */}
              <div className="bg-[#12172E] border border-white/10 rounded-2xl overflow-hidden mb-6 h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="text-[#FF6B35] mx-auto mb-3" size={48} />
                  <p className="text-gray-300">Chola FC Sports Complex</p>
                  <p className="text-gray-400 text-sm">Anna Nagar, Chennai</p>
                </div>
              </div>

              {/* Facility Info */}
              <div className="bg-[#12172E] border border-white/10 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Facility Features</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Full-size FIFA standard football field</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Indoor training facility</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Modern gymnasium and fitness center</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Video analysis room</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Medical and physiotherapy rooms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Parent viewing area</span>
                  </li>
                </ul>
              </div>

              {/* Visitor Info */}
              <div className="bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Schedule a Visit</h3>
                <p className="text-white/90 mb-4">
                  Want to see our facilities in person? We welcome visitors! Call us to schedule a
                  tour of our campus and meet our coaching staff.
                </p>
                <a
                  href="tel:+918925518891"
                  className="inline-flex items-center gap-2 text-white hover:underline"
                >
                  <Phone size={18} />
                  +91 89255 18891
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#12172E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-[#0A0E27] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                What age groups do you accept?
              </h3>
              <p className="text-gray-300">
                We offer programs for athletes aged 10-25 years, divided into age-appropriate
                groups with specialized training for each level.
              </p>
            </div>

            <div className="bg-[#0A0E27] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Do I need prior football experience?
              </h3>
              <p className="text-gray-300">
                No! We welcome beginners. Our Junior Development Program is perfect for those just
                starting their football journey.
              </p>
            </div>

            <div className="bg-[#0A0E27] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Can I try a session before enrolling?
              </h3>
              <p className="text-gray-300">
                Yes! We offer a complimentary trial session for all new applicants. Contact us to
                schedule your free trial.
              </p>
            </div>

            <div className="bg-[#0A0E27] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                What equipment do I need to bring?
              </h3>
              <p className="text-gray-300">
                Just bring your enthusiasm! We provide all necessary equipment, including training
                kits, footballs, and protective gear.
              </p>
            </div>

            <div className="bg-[#0A0E27] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-2">
                Do you offer transportation services?
              </h3>
              <p className="text-gray-300">
                We partner with select schools for transportation. Please contact us to discuss
                transportation options for your location.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}