// src/pages/privacy/PrivacyPolicy.tsx
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy for RideForYouTransport</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
        <p className="text-base leading-relaxed">
          Welcome to RideForYouTransport! Your privacy is important to us. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our services. By using RideForYouTransport, you
          agree to the practices described in this policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>

        <h3 className="text-xl font-medium mt-4 mb-1">Personal Information</h3>
        <p className="text-base mb-2">When you use our services, we may collect the following personal information:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Contact Information: Name, email address, phone number.</li>
          <li>Profile Information: Username, password, profile picture.</li>
          <li>Payment Information: Credit card details, billing address.</li>
          <li>Location Information: Real-time location, trip details.</li>
          <li>Communication Information: Feedback, customer support messages.</li>
          <li>
            Our app uses Stripe payments which requires information about your phone number and apps installed on the
            device in order to ensure secure and successful payment.
          </li>
        </ul>

        <h3 className="text-xl font-medium mt-4 mb-1">Usage Information</h3>
        <p className="text-base mb-2">We may collect information about how you interact with our services, including:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Device Information: IP address, browser type, operating system.</li>
          <li>Usage Data: Pages viewed, features used, time spent on our app/website.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
        <p className="text-base mb-2">We use the information we collect for various purposes, including:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Providing Services: To process bookings, manage rides, and facilitate payments.</li>
          <li>Improving Services: To understand how our services are used and to enhance user experience.</li>
          <li>Communication: To send updates, promotional materials, and respond to inquiries.</li>
          <li>
            Safety and Security: To protect against fraud, monitor for suspicious activity, and ensure compliance with
            legal obligations.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Sharing Your Information</h2>
        <p className="text-base mb-2">We may share your information with third parties in the following circumstances:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Service Providers: With vendors and service providers who perform services on our behalf.</li>
          <li>Business Transfers: In connection with a merger, sale, or transfer of company assets.</li>
          <li>Legal Requirements: If required by law, or to protect our rights and safety.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
        <p className="text-base leading-relaxed">
          We implement appropriate technical and organizational measures to protect your personal information against
          unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
        <p className="text-base leading-relaxed">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy
          Policy, or as required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
        <p className="text-base mb-2">You have the right to:</p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Access: Request a copy of the personal information we hold about you.</li>
          <li>Rectify: Request correction of inaccurate or incomplete information.</li>
          <li>Delete: Request deletion of your personal information.</li>
          <li>Object: Object to the processing of your personal information.</li>
        </ul>
        <p className="text-base mt-2">
          To exercise these rights, please contact us at{' '}
          <a href="mailto:rideforyoutransport@gmail.com" className="text-blue-600 underline">
            rideforyoutransport@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
        <p className="text-base leading-relaxed">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
          Privacy Policy on our website. You are advised to review this Privacy Policy periodically for any changes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="text-base mb-2">
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <address className="not-italic mb-4">
          <div>RideForYouTransport</div>
          <div>
            Email:{' '}
            <a href="mailto:rideforyoutransport@gmail.com" className="text-blue-600 underline">
              rideforyoutransport@gmail.com
            </a>
          </div>
          <div>Phone: +1 343-598-0092</div>
          <div>Address: 63 Stewardship Rd, Brampton, ON, L7A 4W8</div>
        </address>

        <p className="text-sm text-gray-600">
          <strong>Effective Date:</strong> 03 June 2024
        </p>

        <p className="mt-4 font-medium">Thank you for choosing RideForYouTransport! Your privacy is our priority.</p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;