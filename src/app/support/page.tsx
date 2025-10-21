import Support from '@/components/ui/Support/Support';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#E1E7EE] flex items-center justify-center p-5">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#1B1B1B] mb-4">Support Page</h1>
        <p className="text-lg text-[#4A4A4A] mb-8">
          Click the "Contact Us" button below to get help.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-[#464646] mb-4">How can we help?</h2>
          <p className="text-[#4A4A4A] mb-6">
            Our support team is here to assist you with any questions or issues you may have.
          </p>
          <ul className="text-left text-[#4A4A4A] space-y-2 mb-6">
            <li>• Technical support</li>
            <li>• Account assistance</li>
            <li>• Feature questions</li>
            <li>• Bug reports</li>
          </ul>
          <Support />
        </div>
      </div>
    </div>
  );
}
