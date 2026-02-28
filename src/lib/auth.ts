import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "./prisma";

const secretKey = process.env.SESSION_SECRET || "default_super_secret_truemap_key_123456789";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    // 1. Create a session payload token (JWT)
    const sessionToken = await encrypt({ userId, expiresAt });

    // 2. Store session securely in Prisma Database
    await prisma.session.create({
        data: {
            userId,
            token: sessionToken,
            expiresAt,
        },
    });

    // 3. Set HttpOnly cookie for security
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function verifyUserSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) return null;

    try {
        const payload = await decrypt(sessionToken);

        if (!payload?.userId) {
            return null;
        }

        // Double check with Database for ultimate security (Allows Remote Logouts)
        const validSession = await prisma.session.findUnique({
            where: {
                token: sessionToken,
            },
            include: {
                user: {
                    select: { id: true, name: true, email: true, role: true }
                }
            }
        });

        if (!validSession || validSession.expiresAt < new Date()) {
            return null;
        }

        return validSession.user;
    } catch (error) {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (sessionToken) {
        await prisma.session.deleteMany({
            where: { token: sessionToken }
        }).catch(() => { }); // Catch if already deleted
    }

    cookieStore.delete("session");
}
