import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { SEO } from "../components/SEO";

interface FormData {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  program: string;
  experience: string;
  school: string;
  medical: string;
  message: string;
}

interface SuccessResult {
  crmRecordId: string;
}

export function Join() {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    address: "",
    guardianName: "",
    guardianPhone: "",
    program: "",
    experience: "",
    school: "",
    medical: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<SuccessResult | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = (field: keyof FormData) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const rules: { field: keyof FormData; validate: (f: FormData) => string | null }[] = [
    { field: "firstName", validate: (f) => !f.firstName.trim() ? "First name is required." : null },
    { field: "lastName", validate: (f) => !f.lastName.trim() ? "Last name is required." : null },
    { field: "dob", validate: (f) => !f.dob ? "Date of birth is required." : null },
    { field: "gender", validate: (f) => !f.gender ? "Gender is required." : null },
    { field: "email", validate: (f) => !f.email.trim() ? "Email is required." : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()) ? "Invalid email address." : null },
    { field: "phone", validate: (f) => !f.phone.trim() ? "Phone is required." : f.phone.replace(/\D/g, "").length !== 10 ? "Phone must be exactly 10 digits." : null },
    { field: "address", validate: (f) => !f.address.trim() ? "Address is required." : null },
    { field: "program", validate: (f) => !f.program ? "Program is required." : null },
    { field: "experience", validate: (f) => !f.experience ? "Experience level is required." : null },
  ];

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    for (const { field, validate: fn } of rules) {
      const err = fn(form);
      if (err) errors[field] = err;
    }

    if (form.dob) {
      const age = Math.floor((Date.now() - new Date(form.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 18) {
        if (!form.guardianName.trim()) errors.guardianName = "Guardian name is required for minors.";
        if (!form.guardianPhone.trim()) errors.guardianPhone = "Guardian phone is required for minors.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api/v1/registrations";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          dob: form.dob,
          gender: form.gender,
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          parentName: form.guardianName.trim() || undefined,
          parentPhone: form.guardianPhone.trim() || undefined,
          program: form.program,
          experience: form.experience,
          school: form.school.trim() || undefined,
          medicalConditions: form.medical.trim() || undefined,
          statementOfPurpose: form.message.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess({ crmRecordId: data.crmRecordId });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      email: "",
      phone: "",
      address: "",
      guardianName: "",
      guardianPhone: "",
      program: "",
      experience: "",
      school: "",
      medical: "",
      message: "",
    });
    setFieldErrors({});
    setError("");
    setSuccess(null);
  };

  const FieldError = ({ field }: { field: keyof FormData }) =>
    fieldErrors[field] ? <p className="text-red-400 text-sm mt-1">{fieldErrors[field]}</p> : null;

  if (success) {
    return (
      <div className="min-h-screen md:pt-20 flex items-center justify-center bg-[#0A0E27]">
        <SEO
          title="Join Chola FC | Register for Football Training"
          description="Apply for Chola FC football programs and start your journey with professional coaching."
          canonicalUrl="https://www.cholafc.com/join"
        />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-[#12172E] border border-white/10 rounded-2xl p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FF6B35] to-[#FFB800] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-white" size={40} />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">Registration Submitted!</h2>
            {success.crmRecordId && (
              <p className="text-[#FFB800] text-lg font-mono mb-4">
                Registration ID: {success.crmRecordId}
              </p>
            )}
            <p className="text-gray-300 text-lg mb-8">
              Thank you for registering with Chola FC. Our team will contact you within 2 working days.
            </p>
            <Button
              onClick={resetForm}
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
      <SEO
        title="Join Chola FC | Register for Football Training"
        description="Apply for Chola FC football programs and start your journey with professional coaching."
        canonicalUrl="https://www.cholafc.com/join"
      />
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
                      value={form.firstName}
                      onChange={(e) => set("firstName")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter first name"
                    />
                    <FieldError field="firstName" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={form.lastName}
                      onChange={(e) => set("lastName")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter last name"
                    />
                    <FieldError field="lastName" />
                  </div>
                  <div>
                    <Label htmlFor="dob" className="text-white">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dob"
                      type="date"
                      value={form.dob}
                      onChange={(e) => set("dob")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                    />
                    <FieldError field="dob" />
                  </div>
                  <div>
                    <Label htmlFor="gender" className="text-white">
                      Gender *
                    </Label>
                    <Select value={form.gender} onValueChange={set("gender")} disabled={submitting}>
                      <SelectTrigger className="mt-2 bg-[#0A0E27] border-white/10 text-white">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError field="gender" />
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
                      value={form.email}
                      onChange={(e) => set("email")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="your.email@example.com"
                    />
                    <FieldError field="email" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-white">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="+91 89255 18891"
                    />
                    <FieldError field="phone" />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address" className="text-white">
                      Address *
                    </Label>
                    <Textarea
                      id="address"
                      value={form.address}
                      onChange={(e) => set("address")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter your full address"
                      rows={3}
                    />
                    <FieldError field="address" />
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
                      value={form.guardianName}
                      onChange={(e) => set("guardianName")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Enter name"
                    />
                    <FieldError field="guardianName" />
                  </div>
                  <div>
                    <Label htmlFor="guardianPhone" className="text-white">
                      Parent/Guardian Phone
                    </Label>
                    <Input
                      id="guardianPhone"
                      type="tel"
                      value={form.guardianPhone}
                      onChange={(e) => set("guardianPhone")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="+91 89255 18891"
                    />
                    <FieldError field="guardianPhone" />
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
                    <Select value={form.program} onValueChange={set("program")} disabled={submitting}>
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
                    <FieldError field="program" />
                  </div>
                  <div>
                    <Label htmlFor="experience" className="text-white">
                      Football Experience *
                    </Label>
                    <Select value={form.experience} onValueChange={set("experience")} disabled={submitting}>
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
                    <FieldError field="experience" />
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
                      value={form.school}
                      onChange={(e) => set("school")(e.target.value)}
                      disabled={submitting}
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
                      value={form.medical}
                      onChange={(e) => set("medical")(e.target.value)}
                      disabled={submitting}
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
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      disabled={submitting}
                      className="mt-2 bg-[#0A0E27] border-white/10 text-white"
                      placeholder="Tell us about your goals and aspirations"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] hover:opacity-90 text-white py-6 text-lg"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Submitting...
                    </span>
                  ) : (
                    "Submit Registration"
                  )}
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