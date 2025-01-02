import { type RequestHandler } from 'express';
import { OpenAI } from 'openai';
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const generateMessage: RequestHandler = async (req, res, next) => {
  try {
    const { client, additionalDetails, outreachType } = req.body;

    // Validate input
    if (!client || !outreachType || !outreachType.method || !outreachType.purpose) {
      return next({
        statusCode: 400,
        message: 'Missing required fields: client details or outreach type.',
      });
    }

    // Crafting the prompt for OpenAI
    const prompt = `
You are a professional content generator helping insurance agents craft personalized client messages. Use the following context to create a friendly, professional message:

Client Details:
- Name: ${client.name}
- Email: ${client.email}
- Address: ${additionalDetails.address || 'N/A'}
- Phone: ${additionalDetails.phone || 'N/A'}
- Policy Details: ${additionalDetails.policyDetails || 'N/A'}
- Family Info: ${additionalDetails.familyInfo || 'N/A'}
- Occupation: ${additionalDetails.occupation || 'N/A'}

Outreach Type:
- Method: ${outreachType.method}
- Purpose: ${outreachType.purpose}
- Other Details: ${outreachType.otherDetails || 'N/A'}

Miscellaneous Notes:
${additionalDetails.miscellaneousNotes || 'None'}

Generate a message that fits the outreach purpose. Keep it professional and friendly, and make it suitable for the selected method of contact.`;

    // Call OpenAI API
    const response = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const generatedMessage = response.choices[0];

    if (!generatedMessage) {
      return next({
        statusCode: 500,
        message: 'Failed to generate message.',
      });
    }

    // Respond with the generated message
    res.status(200).json({
      message: 'Message generated successfully.',
      data: generatedMessage,
    });
  } catch (error) {
    console.error('Error generating message:', error);
    next(error);
  }
};

export default generateMessage;
