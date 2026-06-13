import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";

export function Join() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // In a real application, form data would be sent to a server
  };

  if (formSubmitted) {
    return (
      <div className="min-h-screen md:pt-20 flex items-center justify-center bg-[#0A0E27]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#12172E] border border-white/10 rounded-2xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-white" size={40} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Registration Submitted!</h2>
            <p className="text-gray-300 text-lg mb-8">
              Thank you for your interest in Chola FC. Our team will review your
              application and contact you within 2-3 business days to discuss the next steps.
            </p>
            <p className="text-gray-400 mb-8">
              In the meantime, feel free to explore our programs and facilities. We look forward to
              welcoming you to the Chola FC family!
            </p>
            <Button
              onClick={() => setFormSubmitted(false)}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90"
            >
              Submit Another Registration
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:pt-20 bg-[#0A0E27]">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-[#0A0E27] to-[#12172E]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Join
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB800]">
              Chola FC
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Start your journey to athletic excellence. Fill out the form below to register.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-12 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-[#12172E] border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-white">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob" className="text-white">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      required
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-white">
                      Gender *
                    </Label>
                    <Select required>
                      <SelectTrigger className="mt-2 bg-[#0A0E27] border-white/10 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email" className="text-white">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-white">
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      required
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter your full address"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information (for minors) */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Parent/Guardian Information
                  <span className="text-sm text-gray-400 ml-2">(if applicant is under 18)</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="guardianName" className="text-white">
                      Parent/Guardian Name
                    </Label>
                    <Input
                      id="guardianName"
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianPhone" className="text-white">
                      Parent/Guardian Phone
                    </Label>
                    <Input
                      id="guardianPhone"
                      type="tel"
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Program Selection */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Program Selection</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="program" className="text-white">
                      Select Program *
                    </Label>
                    <Select required>
                      <SelectTrigger className="mt-2 bg-[#0A0E27] border-white/10 text-white">
                        <SelectValue placeholder="Choose a program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="junior">Junior Development (10-14 years)</SelectItem>
                        <SelectItem value="youth">Youth Elite (15-18 years)</SelectItem>
                        <SelectItem value="professional">Professional Track (19-25 years)</SelectItem>
                        <SelectItem value="goalkeeper">Goalkeeper Specialist (12-25 years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-white">
                      Football Experience *
                    </Label>
                    <Select required>
                      <SelectTrigger className="mt-2 bg-[#0A0E27] border-white/10 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner (0-1 year)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                        <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                        <SelectItem value="expert">Expert (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Additional Information</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="school" className="text-white">
                      School/College Name
                    </Label>
                    <Input
                      id="school"
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter institution name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medical" className="text-white">
                      Medical Conditions or Allergies
                    </Label>
                    <Textarea
                      id="medical"
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Please list any medical conditions, allergies, or special requirements"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">
                      Why do you want to join Chola FC?
                    </Label>
                    <Textarea
                      id="message"
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Tell us about your goals and aspirations"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 text-white py-6 text-lg"
                >
                  Submit Registration
                </Button>
                <p className="text-gray-400 text-sm text-center mt-4">
                  By submitting this form, you agree to our terms and conditions and consent to
                  being contacted by our team.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16 bg-[#12172E]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Happens Next?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Application Review</h3>
              <p className="text-gray-300">
                Our team reviews your application within 2-3 business days
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Assessment Session</h3>
              <p className="text-gray-300">
                Schedule a free trial session to assess your current skill level
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Welcome to Chola FC</h3>
              <p className="text-gray-300">
                Complete enrollment and begin your journey with us
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}