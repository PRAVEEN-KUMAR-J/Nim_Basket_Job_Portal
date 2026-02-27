import { useState, FormEvent } from 'react';
import { X, Upload, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ApplicationFormProps {
  onClose: () => void;
  preselectedRole?: string;
}

export default function ApplicationForm({ onClose, preselectedRole }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    whatsappNumber: '',
    email: '',
    currentLocation: '',
    roles: preselectedRole ? [preselectedRole] : [] as string[],
    experience: '',
    noticePeriod: '',
    portfolioLink: '',
    githubLink: '',
    expectedSalary: '',
    whyJoin: '',
    declaration: false,
  });

  const roleOptions = [
    'UI/UX Designer',
    'Mobile App Frontend Developer',
    'Backend Developer',
  ];

  const experienceOptions = [
    'Fresher',
    '0-1 years',
    '1-2 years',
    '2-3 years',
    '3-5 years',
    '5+ years',
  ];

  const handleRoleToggle = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role],
    }));
  };

  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.declaration) {
      alert('Please accept the declaration to proceed');
      return;
    }

    if (formData.roles.length === 0) {
      alert('Please select at least one role');
      return;
    }

    // Guard: warn if file is too large (>5MB)
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      alert('Resume file is too large. Please upload a file under 5MB.');
      return;
    }

    setLoading(true);

    try {
      // ── Step 1: Upload resume first (so URL is ready for the insert) ──
      let resumeUrl: string | null = null;

      if (resumeFile) {
        setSubmitStatus('Uploading resume…');
        const applicationId = crypto.randomUUID();
        const fileExt = resumeFile.name.split('.').pop();
        const filePath = `resumes/${applicationId}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('applications')
          .upload(filePath, resumeFile);

        if (uploadError) {
          console.error('Resume upload error:', uploadError);
          // Continue without resume rather than blocking the whole submission
        } else {
          resumeUrl = supabase.storage
            .from('applications')
            .getPublicUrl(filePath).data.publicUrl;
        }
      }

      // ── Step 2: Insert the full record with resume_url already included ──
      setSubmitStatus('Saving your application…');

      const { error } = await supabase
        .from('job_applications')
        .insert([
          {
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            whatsapp_number: formData.whatsappNumber,
            email: formData.email,
            current_location: formData.currentLocation,
            roles: formData.roles,
            experience: formData.experience,
            notice_period: formData.noticePeriod,
            resume_url: resumeUrl,          // ✅ included directly — no UPDATE needed
            portfolio_link: formData.portfolioLink || null,
            github_link: formData.githubLink || null,
            expected_salary: formData.expectedSalary,
            why_join: formData.whyJoin,
          },
        ]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => { onClose(); }, 2000);

    } catch (err: unknown) {
      const msg = err instanceof Error
        ? err.message
        : (err as { message?: string })?.message ?? JSON.stringify(err);
      console.error('Submission error full details:', err);
      alert(`Submission failed:\n${msg}\n\nCheck browser console (F12) for details.`);
    } finally {
      setLoading(false);
      setSubmitStatus('');
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
            <Check size={48} className="text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h3>
          <p className="text-gray-600">
            Thank you for applying. We'll review your application and get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
      <div className="flex min-h-full items-start justify-center px-4 py-8">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl">
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Job Application</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Location *
              </label>
              <input
                type="text"
                required
                value={formData.currentLocation}
                onChange={(e) => setFormData({ ...formData, currentLocation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Role(s) Applying For * (Select all that apply)
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {roleOptions.map((role) => (
                  <label
                    key={role}
                    className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-colors ${formData.roles.includes(role)
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-300 hover:border-orange-300'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.roles.includes(role)}
                      onChange={() => handleRoleToggle(role)}
                      className="w-4 h-4 text-orange-600"
                    />
                    <span className="text-sm font-medium text-gray-900">{role}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Experience *
                </label>
                <select
                  required
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select experience</option>
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Notice Period *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Immediate, 15 days, 1 month"
                  value={formData.noticePeriod}
                  onChange={(e) => setFormData({ ...formData, noticePeriod: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Resume Upload
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-orange-500 transition-colors">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {resumeFile ? resumeFile.name : 'Click to upload resume (PDF, DOC, DOCX)'}
                  </p>
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Portfolio Link
                </label>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  placeholder="https://"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expected Salary (per annum) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., 3-5 LPA"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Why do you want to join Nim Basket? *
              </label>
              <textarea
                required
                rows={4}
                value={formData.whyJoin}
                onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.declaration}
                  onChange={(e) => setFormData({ ...formData, declaration: e.target.checked })}
                  className="mt-1 w-4 h-4 text-orange-600"
                />
                <span className="text-sm text-gray-700">
                  I hereby declare that all the information provided above is true and accurate to the
                  best of my knowledge. I understand that any false information may result in
                  disqualification from the application process. *
                </span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (submitStatus || 'Submitting…') : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
