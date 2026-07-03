interface LeadData {
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

async function getAccessToken(): Promise<string> {
  const response = await fetch("https://accounts.zoho.in/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: process.env.ZOHO_REFRESH_TOKEN!,
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      grant_type: "refresh_token",
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${JSON.stringify(data)}`);
  }

  return data.access_token;
}

async function createLead(data: LeadData): Promise<{ id: string }> {
  const accessToken = await getAccessToken();

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

  const response = await fetch("https://www.zohoapis.in/crm/v8/Leads", {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          First_Name: data.firstName,
          Last_Name: data.lastName,
          Company: "CHOLA FC",
          Email: data.email,
          Phone: data.phone,
          Date_Time_1: data.dob ? `${data.dob}T00:00:00+05:30` : "",
          Gender: genderLabels[data.gender] || data.gender,
          Guardian_Name: data.parentName || "",
          Guardian_Phone: data.parentPhone || "",
          School_Name: data.school || "",
          Program: programLabels[data.program] || data.program,
          Football_Experience: experienceLabels[data.experience] || data.experience,
          Medical_conditions: data.medicalConditions || "",
          Motivation: data.statementOfPurpose || "",
          Street: data.address || "",
          Lead_Source: data.source || "Website",
        },
      ],
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Zoho CRM create failed: ${JSON.stringify(result)}`);
  }

  return { id: result.data[0]?.id };
}

async function checkDuplicateLead(email: string, phone: string): Promise<boolean> {
  const accessToken = await getAccessToken();

  const criteria = `((Email:equals:${email})or(Phone:equals:${phone}))`;
  const url = `https://www.zohoapis.in/crm/v8/Leads/search?criteria=${encodeURIComponent(criteria)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  });

  // 200 OK means records were found (duplicate exists)
  // 204 No Content means no records found (no duplicate)
  if (response.status === 200) {
    return true;
  }

  if (response.status === 204) {
    return false;
  }

  const errorBody = await response.text();
  throw new Error(`Zoho CRM duplicate check failed (${response.status}): ${errorBody}`);
}

export { getAccessToken, createLead, checkDuplicateLead };
export type { LeadData };
