'use client';
import { useState } from 'react';
import { Save, Globe, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const SECTIONS = {
  homepage: {
    label: 'Homepage',
    fields: [
      { key: 'hero_title',       label: 'Hero Title',          type: 'text',     value: 'Simply Crispy. Simply Tasty.' },
      { key: 'hero_subtitle',    label: 'Hero Subtitle',       type: 'text',     value: 'Premium quality traditional South Indian appalams, crafted with love.' },
      { key: 'hero_badge',       label: 'Hero Badge Text',     type: 'text',     value: '100% Natural Ingredients' },
      { key: 'cta_offer_text',   label: 'CTA Offer Code',      type: 'text',     value: 'NANMAI50' },
      { key: 'cta_offer_title',  label: 'CTA Offer Title',     type: 'text',     value: 'Get ₹50 OFF Your First Order' },
    ],
  },
  about: {
    label: 'About Page',
    fields: [
      { key: 'hero_headline',    label: 'Hero Headline',       type: 'text',     value: '15 Years of Pure Crunch' },
      { key: 'mission_title',    label: 'Mission Title',       type: 'text',     value: 'Bringing Authentic Taste to Every Table' },
      { key: 'mission_body',     label: 'Mission Description', type: 'textarea', value: 'At Nanmai Appalam, we believe that food is more than sustenance — it\'s memory, culture, and connection.' },
    ],
  },
  contact: {
    label: 'Contact Info',
    fields: [
      { key: 'phone',            label: 'Phone Number',        type: 'text',     value: '+91 98765 43210' },
      { key: 'email',            label: 'Email Address',       type: 'text',     value: 'hello@nanmaiappalam.com' },
      { key: 'address',          label: 'Address',             type: 'textarea', value: '123 Temple Street, Chennai, Tamil Nadu 600001' },
      { key: 'hours_weekday',    label: 'Weekday Hours',       type: 'text',     value: 'Mon–Fri: 9am–6pm' },
      { key: 'hours_saturday',   label: 'Saturday Hours',      type: 'text',     value: 'Sat: 9am–2pm' },
    ],
  },
  social: {
    label: 'Social Links',
    fields: [
      { key: 'instagram',        label: 'Instagram URL',       type: 'text',     value: 'https://instagram.com/nanmaiappalam' },
      { key: 'facebook',         label: 'Facebook URL',        type: 'text',     value: 'https://facebook.com/nanmaiappalam' },
      { key: 'youtube',          label: 'YouTube URL',         type: 'text',     value: 'https://youtube.com/nanmaiappalam' },
      { key: 'whatsapp',         label: 'WhatsApp Number',     type: 'text',     value: '919876543210' },
    ],
  },
  seo: {
    label: 'SEO & Meta',
    fields: [
      { key: 'site_title',       label: 'Site Title',          type: 'text',     value: 'Nanmai Appalam – Pure & Crispy Traditional Papads' },
      { key: 'meta_description', label: 'Meta Description',    type: 'textarea', value: 'Shop premium quality traditional South Indian papads online.' },
      { key: 'og_description',   label: 'OG Description',      type: 'textarea', value: 'Crispy, tasty, made with superior ingredients. Order online for home delivery.' },
    ],
  },
};

type SectionKey = keyof typeof SECTIONS;

export default function AdminCmsPage() {
  const [activeSection, setActiveSection] = useState<SectionKey>('homepage');
  const [values, setValues] = useState<Record<string, Record<string, string>>>(() => {
    const init: Record<string, Record<string, string>> = {};
    Object.entries(SECTIONS).forEach(([sec, { fields }]) => {
      init[sec] = {};
      fields.forEach(f => { init[sec][f.key] = f.value; });
    });
    return init;
  });
  const [saving, setSaving] = useState(false);

  const section = SECTIONS[activeSection];
  const sectionVals = values[activeSection];

  const upd = (key: string, val: string) => {
    setValues(prev => ({ ...prev, [activeSection]: { ...prev[activeSection], [key]: val } }));
  };

  const handleSave = async () => {
    setSaving(true);
    // In production: save to Supabase site_content table
    await new Promise(r => setTimeout(r, 800));
    toast.success('Content saved successfully!');
    setSaving(false);
  };

  return (
    <div className="space-y-4">
      {/* Info Banner */}
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-2xl px-5 py-3 flex items-center gap-3 text-sm text-brand-green">
        <Globe size={16} />
        <span>Changes saved here update the live website content automatically.</span>
        <Link href="/" target="_blank" className="ml-auto flex items-center gap-1 font-semibold hover:underline">
          <Eye size={14}/> Preview Site
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Section Sidebar */}
        <div className="bg-white rounded-2xl shadow-card p-3 h-fit">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-2">Page Sections</p>
          {(Object.entries(SECTIONS) as [SectionKey, typeof SECTIONS[SectionKey]][]).map(([key, { label }]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === key ? 'bg-brand-pink text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Fields Editor */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-card">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 className="font-bold text-base">{section.label}</h3>
            <button onClick={handleSave} disabled={saving} className="btn-primary text-sm py-2">
              {saving
                ? <><span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                : <><Save size={14}/> Save Changes</>
              }
            </button>
          </div>
          <div className="p-6 space-y-5">
            {section.fields.map(field => (
              <div key={field.key}>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  {field.label}
                  <span className="ml-2 text-xs font-mono text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">{field.key}</span>
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={sectionVals[field.key]}
                    onChange={e => upd(field.key, e.target.value)}
                    rows={3}
                    className="input-field resize-none"
                  />
                ) : (
                  <input
                    value={sectionVals[field.key]}
                    onChange={e => upd(field.key, e.target.value)}
                    className="input-field"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="px-6 pb-6 pt-2 border-t border-gray-50 flex justify-end">
            <button onClick={handleSave} disabled={saving} className="btn-primary">
              {saving
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...</>
                : <><Save size={16}/> Save All Changes</>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
