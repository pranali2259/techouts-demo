import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  empId: number;
  empName: string;
  empMailId: string;
  topicsSelected: number[];
};

type SimplifiedData = {
  id: number;
  name: string;
  email: string;
  subTopics: number[];
};

type ApiResponse = SimplifiedData[] | { error: string };

type Comment = {
  id: number;
  name: string;
  email: string;
  subTopics: number[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const apiUrl = "http://localhost:3000/data";

  if (req.method === "GET") {
    try {
      const response = await fetch(apiUrl);
      const comments: Comment[] = await response.json();

      const simplifiedData = comments.map((item: Comment) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        subTopics: item.subTopics,
      }));

      return res.status(200).json(simplifiedData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: "An unknown error occurred." });
      }
    }
  } else if (req.method === "POST") {
    const { empId, empMailId, empName, topicsSelected }: Data = req.body;

    if (
      !empId ||
      !empName ||
      !empMailId ||
      !topicsSelected ||
      topicsSelected.length === 0
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    try {
      
      const newFormData: Data = {
        empId,
        empName,
        empMailId,
        topicsSelected,
      };

     
      const simplifiedFormData: SimplifiedData = {
        id: newFormData.empId,  
        name: newFormData.empName,
        email: newFormData.empMailId,
        subTopics: newFormData.topicsSelected,
      };

       
      return res.status(201).json([simplifiedFormData]); 
    } catch (error: unknown) {
      console.error("Error saving form data:", error);
      return res.status(500).json({ error: "There was an error saving the form data." });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
