"use server";
import { db } from "@/db";
import { emailVerificationCodeTable, userTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import {
  createSession,
  deleteSessionTokenCookie,
  invalidateSession,
  setSessionTokenCookie,
  validateRequest,
} from "@/auth/lucia";
import { TimeSpan, createDate } from "oslo";
import { generateRandomString, alphabet } from "oslo/crypto";
import { z } from "zod";
import { safeAction } from "@/lib/safe-action";
import { createErrorResponse, createSuccessResponse } from "@/lib/utils";

const sendEmail = async (email: string, verificationCode: string) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PASSWORD,
    },
  });

  const mailOptions: Mail.Options = {
    from: process.env.MY_EMAIL,
    to: email,
    subject: "Verification Code",
    text: verificationCode,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return true;
  } catch (err) {
    return false;
  }
};

async function generateEmailVerificationCode(email: string): Promise<string> {
  await db
    .delete(emailVerificationCodeTable)
    .where(eq(emailVerificationCodeTable.email, email.toLowerCase()));
  const code = generateRandomString(8, alphabet("0-9"));
  await db.insert(emailVerificationCodeTable).values({
    email: email.toLowerCase(),
    code: code,
    expiresAt: createDate(new TimeSpan(15, "m")),
  });
  return code;
}

const emailSchema = z.object({
  email: z.string().email().min(1),
});

export const sendEmailVerificationCode = safeAction
  .schema(emailSchema)
  .action(async ({ parsedInput: { email } }) => {
    try {
      const code = await generateEmailVerificationCode(email.toLowerCase());
      await sendEmail(email.toLowerCase(), code);
      return createSuccessResponse();
    } catch (error) {
      return createErrorResponse(
        "Something went wrong while sending verification code."
      );
    }
  });

const signinSchema = z.object({
  email: z.string().email().min(1),
  code: z
    .string()
    .min(8, "Verification code must be 8 digits")
    .max(8, "Verification code must be 8 digits"),
});

export const signin = safeAction
  .schema(signinSchema)
  .action(async ({ parsedInput: { email, code } }) => {
    try {
      const verificationCode = await db
        .select()
        .from(emailVerificationCodeTable)
        .where(
          and(
            eq(emailVerificationCodeTable.email, email),
            eq(emailVerificationCodeTable.code, code)
          )
        );

      if (verificationCode.length > 0) {
        const user = await db
          .select()
          .from(userTable)
          .where(eq(userTable.email, verificationCode[0].email!));

        if (user.length > 0) {
          const session = await createSession(user[0].id);

          setSessionTokenCookie(session.id);
          await db
            .delete(emailVerificationCodeTable)
            .where(eq(emailVerificationCodeTable.id, verificationCode[0].id));
          return createSuccessResponse();
        } else {
          const email = verificationCode[0].email!;
          const name = email.split("@")[0].split(".");
          const newUser = await db
            .insert(userTable)
            .values({
              email: email.toLowerCase(),
              firstName: name[0],
              lastName: name[1],
            })
            .returning({ id: userTable.id });

          if (newUser.length > 0) {
            const session = await createSession(newUser[0].id);

            setSessionTokenCookie(session.id);

            const response = await db
              .delete(emailVerificationCodeTable)
              .where(eq(emailVerificationCodeTable.id, verificationCode[0].id));

            return createSuccessResponse();
          } else {
            return createErrorResponse(
              "Something went wrong while signing in."
            );
          }
        }
      } else {
        return createErrorResponse("Something went wrong while signing in.");
      }
    } catch (error) {
      return createErrorResponse("Something went wrong while signing in.");
    }
  });

export async function signout(): Promise<boolean> {
  const { session } = await validateRequest();
  if (!session) {
    return false;
  }

  await invalidateSession(session.id);

  deleteSessionTokenCookie();
  return true;
}
