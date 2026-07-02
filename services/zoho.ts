interface RegistrationData {
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

interface ZohoRecordResult {
  applicationId: string;
  crmRecordId: string;
}

const accountsUrl = () => process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zoho.in";
const apiUrl = () => process.env.ZOHO_API_URL || "https://www.zohoapis.in";

async function getAccessToken(): Promise<string> {
  const params = new URLSearchParams({
    client_id: process.env.ZOHO_CLIENT_ID!,
    client_secret: process.env.ZOHO_CLIENT_SECRET!,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
    grant_type: "refresh_token",
  });

  const response = await fetch(`${accountsUrl()}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

async function searchByPhoneOrEmail(phone: string, email: string): Promise<boolean> {
  const accessToken = await getAccessToken();
  const module = process.env.ZOHO_MODULE || "Academy_Registrations";

  const searchUrl = `${apiUrl()}/crm/v2/${module}/search?phone=${encodeURIComponent(phone)}&email=${encodeURIComponent(email)}`;

  const response = await fetch(searchUrl, {
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  });

  if (response.status === 204) {
    return false;
  }

  const data = await response.json();
  return data.data && data.data.length > 0;
}

function mapFields(data: RegistrationData): Record<string, any> {
  const programLabels: Record<string, string> = {
    junior: "Junior Development",
    youth: "Youth Elite",
    professional: "Professional Track",
    goalkeeper: "Goalkeeper Specialist",
  };

  const experienceLabels: Record<string, string> = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    expert: "Expert",
  };

  const genderLabels: Record<string, string> = {
    male: "Male",
    female: "Female",
    other: "Other",
  };

  return {
    First_Name: data.firstName,
    Last_Name: data.lastName,
    Date_of_Birth: data.dob,
    Gender: genderLabels[data.gender] || data.gender,
    Email: data.email,
    Phone: data.phone,
    Address: data.address,
    Guardian_Name: data.parentName || "",
    Guardian_Phone: data.parentPhone || "",
    Program: programLabels[data.program] || data.program,
    Football_Experience: experienceLabels[data.experience] || data.experience,
    School_Name: data.school || "",
    Medical_Conditions: data.medicalConditions || "",
    Motivation: data.statementOfPurpose || "",
    Status: "New",
    Source: data.source || "Website",
  };
}

async function createRecord(data: RegistrationData): Promise<ZohoRecordResult> {
  const accessToken = await getAccessToken();
  const module = process.env.ZOHO_MODULE || "Academy_Registrations";

  const fields = mapFields(data);

  const response = await fetch(`${apiUrl()}/crm/v2/${module}`, {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: [fields] }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Zoho CRM create failed: ${JSON.stringify(result)}`);
  }

  const record = result.data[0];
  return {
    applicationId: record?.Application_ID || "",
    crmRecordId: record?.id || "",
  };
}

export { getAccessToken, searchByPhoneOrEmail, createRecord };
export type { RegistrationData, ZohoRecordResult };
