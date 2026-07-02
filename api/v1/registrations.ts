import { createRecord, searchByPhoneOrEmail } from "../../services/zoho";

interface RegistrationBody {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  address: string;
  parentName?: string;
  parentPhone?: string;
  program: string;
  experience: string;
  school?: string;
  medicalConditions?: string;
  statementOfPurpose?: string;
  source?: string;
}

function validate(body: RegistrationBody): string | null {
  const required = ["firstName", "lastName", "dob", "gender", "email", "phone", "address", "program", "experience"];
  for (const field of required) {
    if (!(body as any)[field] || typeof (body as any)[field] !== "string" || !(body as any)[field].trim()) {
      return `${field} is required.`;
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email.trim())) {
    return "Invalid email address.";
  }

  const phoneDigits = body.phone.replace(/\D/g, "");
  if (phoneDigits.length !== 10) {
    return "Phone number must be exactly 10 digits.";
  }

  if (body.dob) {
    const age = Math.floor((Date.now() - new Date(body.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    if (age < 18) {
      if (!body.parentName?.trim() || !body.parentPhone?.trim()) {
        return "Parent/Guardian fields are required for applicants under 18.";
      }
    }
  }

  return null;
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed." });
    return;
  }

  try {
    const body: RegistrationBody = req.body;

    body.email = body.email?.trim().toLowerCase() || "";
    body.phone = body.phone?.trim() || "";

    const validationError = validate(body);
    if (validationError) {
      res.status(400).json({ success: false, error: validationError });
      return;
    }

    const normalizedPhone = body.phone.startsWith("+91") ? body.phone : `+91${body.phone.replace(/\D/g, "")}`;

    const duplicate = await searchByPhoneOrEmail(normalizedPhone, body.email);
    if (duplicate) {
      res.status(409).json({
        success: false,
        error: "An applicant with this phone or email is already registered.",
      });
      return;
    }

    const result = await createRecord({
      ...body,
      phone: normalizedPhone,
    });

    res.status(201).json({
      success: true,
      applicationId: result.applicationId,
      crmRecordId: result.crmRecordId,
      message: "Registration submitted successfully.",
    });
  } catch (err: any) {
    console.error("Registration error:", err);
    res.status(500).json({
      success: false,
      error: "An unexpected error occurred. Please try again.",
    });
  }
}
