import { useState } from 'react';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

interface EmailPreviewProps {
  emailData: any;
  onUnlock: (email: string) => Promise<void>;
  captureError?: string | null;
  onClearError?: () => void;
}

export function EmailPreview({ emailData, onUnlock, captureError, onClearError }: EmailPreviewProps) {
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const body = emailData?.body || '';
  const subject = emailData?.subject || '';

  const lines = body.split('\n').filter((l: string) => l.trim().length > 0);
  const visiblePart = lines.slice(0, 2).join('\n\n');
  // Use the actual email body as blurred content — visitor sees their own personalised text under the blur,
  // which is far more compelling than placeholder copy.
  const blurredPart = lines.slice(2).join('\n\n') ||
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userEmail) return;
    setIsSubmitting(true);
    if (onClearError) onClearError();
    await onUnlock(userEmail);
    setIsSubmitting(false);
  };

  return (
    <div className="relative">
      <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 md:p-8 font-serif text-lg leading-relaxed text-zinc-800">
        <div className="mb-6 pb-4 border-b border-zinc-200 font-sans text-sm text-zinc-500">
          <strong>Subject:</strong> {subject}
        </div>

        <div className="whitespace-pre-wrap">{visiblePart}</div>

        <div className="relative mt-4">
          <div className="whitespace-pre-wrap blur-sm select-none overflow-hidden h-40">
            {blurredPart}
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center -mt-8 z-10">
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl border border-zinc-200 shadow-xl max-w-sm w-full text-center">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Unlock the full email</h3>
              <p className="text-sm text-zinc-600 mb-6">Enter your email to reveal the rest of this personalized draft.</p>

              {captureError && (
                <div className="flex items-start gap-2 text-left bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700 font-sans">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{captureError}</span>
                </div>
              )}

              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <Mail className="h-4 w-4 text-zinc-400" />
                   </div>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-sans"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!userEmail || isSubmitting}
                  className="w-full bg-zinc-900 text-white font-semibold py-3 rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-5 h-5 animate-spin mr-2" /> Unlocking...</>
                  ) : (
                    "Reveal Email"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
