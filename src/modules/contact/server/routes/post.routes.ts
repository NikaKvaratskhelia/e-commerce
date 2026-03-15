import { resend } from "@/src/library/resend";
import { ApiResponse } from "@/src/types/ApiReturnType";
import { Hono } from "hono";

export const PostRoutes = new Hono().post("", async (c) => {
  let response: ApiResponse<null>;
  const { name, email, message } = await c.req.json();

  if (!name || !email || !message) {
    response = {
      status: 400,
      success: false,
      message: "ყველა ველი სავალდებულოა.",
    };

    return c.json(response, response.status);
  }

  try {
    await resend.emails.send({
      from: "contact@kvara.uk",
      to: "nikakvaratskhelia13@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    response = {
      status: 200,
      success: true,
      message: "იმეილი გაიგზავნა.",
    };

    return c.json(response, response.status);
  } catch (error) {
    console.error("Failed to send email:", error);
    response = {
      status: 500,
      success: false,
      message: "სერვერის ხარვეზი, მოგვიანებით სცადეთ.",
    };

    return c.json(response, response.status);
  }
});
