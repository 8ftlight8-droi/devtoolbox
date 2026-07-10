import type { Metadata } from "next";
import { JwtDecoderTool } from "./JwtDecoderTool";
import { AdSlot } from "@/components/AdSlot";
import { ToolStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "JWT Decoder — Decode and Inspect JSON Web Tokens Online",
  description:
    "Free online JWT decoder. Decode and inspect JSON Web Tokens instantly. View header, payload, claims, and expiration status. No data leaves your browser.",
  keywords: [
    "jwt decoder",
    "jwt debugger",
    "decode jwt",
    "json web token",
    "jwt inspector",
    "jwt online",
    "jwt claims",
    "token decoder",
  ],
  alternates: { canonical: "/jwt-decoder" },
};

export default function JwtDecoderPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <ToolStructuredData
        name="JWT Decoder"
        description="Free online JWT decoder. Decode and inspect JSON Web Tokens. View header, payload, claims, and expiration."
        url="/jwt-decoder"
        category="DeveloperApplication"
      />
      <BreadcrumbStructuredData items={[{ name: "Home", url: "/" }, { name: "JWT Decoder", url: "/jwt-decoder" }]} />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">JWT Decoder</h1>
        <p className="mt-2 text-gray-400">
          Paste a JSON Web Token to decode and inspect its header, payload, and
          expiration status. All decoding happens in your browser.
        </p>
      </div>

      <AdSlot slot="jwt-top" className="mb-6" />

      <JwtDecoderTool />

      <AdSlot slot="jwt-bottom" className="mt-8" />

      <section className="mt-12 rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="text-lg font-semibold text-white">
          About JSON Web Tokens
        </h2>
        <div className="mt-3 space-y-2 text-sm text-gray-400">
          <p>
            A JSON Web Token (JWT) is a compact, URL-safe token format used for
            securely transmitting information between parties. JWTs consist of three
            parts: a header (algorithm and type), a payload (claims), and a signature.
          </p>
          <p>
            Common claims include <code className="text-gray-300">sub</code> (subject),{" "}
            <code className="text-gray-300">iat</code> (issued at),{" "}
            <code className="text-gray-300">exp</code> (expiration), and{" "}
            <code className="text-gray-300">iss</code> (issuer).
          </p>
          <p>
            <strong className="text-gray-300">Note:</strong> This tool decodes the token
            but does not verify the signature. Signature verification requires the
            secret or public key.
          </p>
        </div>
      </section>
    </div>
  );
}
