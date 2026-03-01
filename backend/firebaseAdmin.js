import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" with { type: "json" };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const match = header.match(/^Bearer (.+)$/);

    if (!match) {
      return res.status(401).json({ error: "Missing Authorization: Bearer <token>" });
    }

    const idToken = match[1];
    const decoded = await admin.auth().verifyIdToken(idToken);

    req.user = decoded; // attach decoded Firebase user claims
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export { admin };
