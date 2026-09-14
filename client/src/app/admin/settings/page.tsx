"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import type { CmsSiteSettings } from "@/lib/cms/types";

const inputClass =
  "w-full rounded-xl border border-mist px-3 py-2.5 text-sm outline-none focus:border-indigo-400";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      {children}
      {hint ? <span className="mt-1 block text-xs text-slate-400">{hint}</span> : null}
    </label>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-mist/60 bg-white p-6 shadow-sm">
      <div className="mb-5 border-b border-mist/60 pb-4">
        <h2 className="font-display text-base font-semibold text-ink">{title}</h2>
        <p className="mt-0.5 text-sm text-slate-400">{description}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export default function SettingsPage() {
  const [form, setForm] = useState<CmsSiteSettings | null>(null);
  const [keywordsText, setKeywordsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/cms/settings");
    const data = (await res.json().catch(() => ({}))) as {
      settings?: CmsSiteSettings;
      error?: string;
    };
    setLoading(false);
    if (!res.ok) {
      setError(data.error || "Failed to load settings.");
      return;
    }
    if (data.settings) {
      setForm(data.settings);
      setKeywordsText(data.settings.keywords.join(", "));
    }
  }

  useEffect(() => {
    void load();
  }, []);

  function set<K extends keyof CmsSiteSettings>(key: K, value: CmsSiteSettings[K]) {
    setForm((f) => (f ? { ...f, [key]: value } : f));
    setSaved(false);
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    const payload: CmsSiteSettings = {
      ...form,
      keywords: keywordsText
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
    };
    const res = await fetch("/api/cms/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      settings?: CmsSiteSettings;
      error?: string;
    };
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Save failed.");
      return;
    }
    if (data.settings) {
      setForm(data.settings);
      setKeywordsText(data.settings.keywords.join(", "));
    }
    setSaved(true);
  }

  return (
    <>
      <PageHeader
        title="Site settings"
        description="Brand, contact, social links and SEO used across the public site."
        actions={
          <button
            type="button"
            disabled={!form || saving}
            onClick={() => void save()}
            className="inline-flex items-center rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        }
      />

      <div className="flex-1 space-y-5 p-6">
        {loading ? <p className="text-sm text-slate">Loading…</p> : null}
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        {saved ? <p className="text-sm text-green-700">Settings saved.</p> : null}

        {form ? (
          <>
            <Section
              title="Brand"
              description="Company identity shown in the footer, metadata and structured data."
            >
              <Field label="Brand name">
                <input
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                />
              </Field>
              <Field label="Legal name">
                <input
                  className={inputClass}
                  value={form.legalName}
                  onChange={(e) => set("legalName", e.target.value)}
                />
              </Field>
              <Field label="CIN">
                <input
                  className={inputClass}
                  value={form.cin}
                  onChange={(e) => set("cin", e.target.value)}
                />
              </Field>
              <Field label="NSE symbol">
                <input
                  className={inputClass}
                  value={form.nseSymbol}
                  onChange={(e) => set("nseSymbol", e.target.value)}
                />
              </Field>
              <Field label="Tagline">
                <input
                  className={inputClass}
                  value={form.tagline}
                  onChange={(e) => set("tagline", e.target.value)}
                />
              </Field>
              <Field label="Corporate tagline">
                <input
                  className={inputClass}
                  value={form.corporateTagline}
                  onChange={(e) => set("corporateTagline", e.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Campaign line" hint="Marketing line; footer headline stays designed copy for now.">
                  <input
                    className={inputClass}
                    value={form.campaignTagline}
                    onChange={(e) => set("campaignTagline", e.target.value)}
                  />
                </Field>
              </div>
            </Section>

            <Section
              title="Contact"
              description="Phone, emails and registered office on the contact page and footer."
            >
              <Field label="Brand email">
                <input
                  type="email"
                  className={inputClass}
                  value={form.brandEmail}
                  onChange={(e) => set("brandEmail", e.target.value)}
                />
              </Field>
              <Field label="Accounts email">
                <input
                  type="email"
                  className={inputClass}
                  value={form.accountsEmail}
                  onChange={(e) => set("accountsEmail", e.target.value)}
                />
              </Field>
              <Field label="Phone (display)">
                <input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </Field>
              <Field label="Phone (tel: link)" hint="Digits only, e.g. +917672007000">
                <input
                  className={inputClass}
                  value={form.phoneTel}
                  onChange={(e) => set("phoneTel", e.target.value)}
                />
              </Field>
              <Field label="Office label">
                <input
                  className={inputClass}
                  value={form.officeLabel}
                  onChange={(e) => set("officeLabel", e.target.value)}
                />
              </Field>
              <Field label="City">
                <input
                  className={inputClass}
                  value={form.officeCity}
                  onChange={(e) => set("officeCity", e.target.value)}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Office address">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={form.officeAddress}
                    onChange={(e) => set("officeAddress", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Hours">
                <input
                  className={inputClass}
                  value={form.officeHours}
                  onChange={(e) => set("officeHours", e.target.value)}
                />
              </Field>
              <Field label="Office note">
                <input
                  className={inputClass}
                  value={form.officeNote}
                  onChange={(e) => set("officeNote", e.target.value)}
                />
              </Field>
            </Section>

            <Section title="Social links" description="Footer and schema.org sameAs URLs.">
              <Field label="LinkedIn">
                <input
                  className={inputClass}
                  value={form.socialLinkedin}
                  onChange={(e) => set("socialLinkedin", e.target.value)}
                />
              </Field>
              <Field label="YouTube">
                <input
                  className={inputClass}
                  value={form.socialYoutube}
                  onChange={(e) => set("socialYoutube", e.target.value)}
                />
              </Field>
              <Field label="Instagram">
                <input
                  className={inputClass}
                  value={form.socialInstagram}
                  onChange={(e) => set("socialInstagram", e.target.value)}
                />
              </Field>
              <Field label="X">
                <input
                  className={inputClass}
                  value={form.socialX}
                  onChange={(e) => set("socialX", e.target.value)}
                />
              </Field>
            </Section>

            <Section title="SEO" description="Default meta description and keywords.">
              <div className="sm:col-span-2">
                <Field label="Site description">
                  <textarea
                    rows={4}
                    className={inputClass}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Keywords" hint="Comma-separated.">
                  <textarea
                    rows={3}
                    className={inputClass}
                    value={keywordsText}
                    onChange={(e) => {
                      setKeywordsText(e.target.value);
                      setSaved(false);
                    }}
                  />
                </Field>
              </div>
            </Section>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={saving}
                onClick={() => void save()}
                className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
