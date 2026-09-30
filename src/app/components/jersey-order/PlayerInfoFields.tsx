import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface PlayerInfoFieldsProps {
  name: string;
  setName: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  birthYear: string;
  setBirthYear: (val: string) => void;
  phone: string;
  setPhone: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  errors: Record<string, string>;
  yearsList: string[];
}

export function PlayerInfoFields({
  name,
  setName,
  gender,
  setGender,
  birthYear,
  setBirthYear,
  phone,
  setPhone,
  email,
  setEmail,
  errors,
  yearsList,
}: PlayerInfoFieldsProps) {
  return (
    <div className="space-y-4">
      {/* Field 1: Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm font-medium text-gray-200">
          1. Full Name <span className="text-[#FF6B35]">*</span>
        </Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#0A0E27] border-white/15 text-white placeholder:text-gray-500 h-11 focus:border-[#FF6B35]"
        />
        {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
      </div>

      {/* Grid for Field 2 (Gender) & Field 3 (Year of Birth) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 2: Gender */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-200">
            2. Gender <span className="text-[#FF6B35]">*</span>
          </Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger className="bg-[#0A0E27] border-white/15 text-white h-11">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-[#121A42] border-white/20 text-white">
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-xs text-red-400">{errors.gender}</p>}
        </div>

        {/* Field 3: Year Of Birth */}
        <div className="space-y-1.5">
          <Label className="text-sm font-medium text-gray-200">
            3. Year of Birth <span className="text-[#FF6B35]">*</span>
          </Label>
          <Select value={birthYear} onValueChange={setBirthYear}>
            <SelectTrigger className="bg-[#0A0E27] border-white/15 text-white h-11">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#121A42] border-white/20 text-white max-h-60">
              {yearsList.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.birthYear && <p className="text-xs text-red-400">{errors.birthYear}</p>}
        </div>
      </div>

      {/* Grid for Field 4 (Phone) & Field 5 (Email) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Field 4: Phone Number */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium text-gray-200">
            4. Phone Number <span className="text-[#FF6B35]">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="10-digit mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-[#0A0E27] border-white/15 text-white placeholder:text-gray-500 h-11 focus:border-[#FF6B35]"
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
        </div>

        {/* Field 5: E-Mail Address */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-sm font-medium text-gray-200">
            5. E-Mail Address <span className="text-[#FF6B35]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="yourname@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#0A0E27] border-white/15 text-white placeholder:text-gray-500 h-11 focus:border-[#FF6B35]"
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
        </div>
      </div>
    </div>
  );
}
