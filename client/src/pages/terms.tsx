import { Link } from "wouter";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-dice text-primary-foreground text-lg" />
                </div>
                <h1 className="text-2xl font-bold text-primary">Lucky Spinner</h1>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-foreground font-medium">
                Terms
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> September 18, 2024<br />
              <strong>Last Updated:</strong> September 18, 2024
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using Lucky Spinner ("the Service," "we," "us," or "our"), you accept and agree to be bound 
              by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Lucky Spinner is a free web-based application that provides spinning wheel functionality for making random 
              selections from participant data. The service includes:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Interactive spinning wheel interface</li>
              <li>Manual data entry capabilities</li>
              <li>Excel file upload and processing</li>
              <li>Winner tracking and export functionality</li>
              <li>All processing performed locally in your browser</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">3. Use License</h2>
            <h3 className="text-lg font-semibold mb-3">3.1 Permitted Use</h3>
            <p className="mb-4">You are granted a limited license to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Access and use Lucky Spinner for personal, educational, or commercial purposes</li>
              <li>Create spinning wheels using your own participant data</li>
              <li>Export and save results from your spinning sessions</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">3.2 Prohibited Use</h3>
            <p className="mb-4">You may not:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to any part of the service</li>
              <li>Use automated systems to access the service excessively</li>
              <li>Reverse engineer, decompile, or disassemble the service</li>
              <li>Use the service to harass, abuse, or harm others</li>
              <li>Upload or process data that violates others' privacy or rights</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">4. User Content and Data</h2>
            <div className="bg-primary/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Important: Data Processing</h3>
              <p className="mb-3">
                <strong>Your participant data is processed entirely in your browser and is not transmitted to or stored on our servers.</strong>
              </p>
              <p>
                You retain full ownership and control of any data you input into Lucky Spinner. We do not access, store, 
                or have any rights to your participant data.
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-3">4.1 Your Responsibilities</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Ensure you have the right to use any participant data you input</li>
              <li>Comply with applicable privacy laws and regulations</li>
              <li>Respect the privacy and rights of individuals whose data you process</li>
              <li>Do not input sensitive personal information unnecessarily</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">5. Service Availability</h2>
            <p className="mb-4">
              We strive to maintain high service availability, but we do not guarantee that Lucky Spinner will be available 
              100% of the time. The service may be temporarily unavailable due to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Scheduled maintenance</li>
              <li>Technical issues or server problems</li>
              <li>Third-party service disruptions</li>
              <li>Circumstances beyond our reasonable control</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">6. Third-Party Services</h2>
            <p className="mb-4">Lucky Spinner integrates with third-party services:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Google Analytics:</strong> For website usage analytics</li>
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              <li><strong>Font Awesome:</strong> For icons and graphics</li>
            </ul>
            <p className="mb-6">
              Your use of these third-party services is subject to their respective terms of service and privacy policies.
            </p>

            <h2 className="text-2xl font-semibold mb-4">7. Intellectual Property</h2>
            <p className="mb-4">
              The Lucky Spinner service, including its original content, features, and functionality, is owned by us and is 
              protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p className="mb-6">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, 
              republish, download, store, or transmit any of the material on our service without prior written consent.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">8.1 "As Is" Service</h3>
              <p className="mb-3">
                Lucky Spinner is provided on an "AS IS" and "AS AVAILABLE" basis. We make no representations or warranties 
                of any kind, express or implied, regarding the service.
              </p>
              
              <h3 className="text-lg font-semibold mb-3">8.2 Randomness Disclaimer</h3>
              <p>
                While we strive to provide truly random selections, we cannot guarantee perfect randomness due to the nature 
                of computer-generated randomness. The service should not be used for high-stakes decisions where perfect 
                randomness is critical.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="mb-6">
              In no event shall Lucky Spinner, its directors, employees, partners, agents, suppliers, or affiliates be liable 
              for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of 
              profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="mb-6">
              You agree to defend, indemnify, and hold harmless Lucky Spinner and its licensee and licensors, and their 
              employees, contractors, agents, officers and directors, from and against any and all claims, damages, 
              obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
            </p>

            <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
            <p className="mb-6">
              We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
              including without limitation if you breach the Terms. Upon termination, your right to use the service will cease immediately.
            </p>

            <h2 className="text-2xl font-semibold mb-4">12. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be interpreted and governed by the laws of the United States, without regard to conflict of 
              law provisions. Any disputes arising from these terms will be resolved in the appropriate courts.
            </p>

            <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
              material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
            </p>

            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-secondary rounded-lg p-4 mb-6">
              <p className="mb-2"><strong>Email:</strong> legal@luckyspinner.com</p>
              <p className="mb-2"><strong>Contact Form:</strong> <Link href="/contact" className="text-primary hover:underline">Visit our contact page</Link></p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Quick Terms Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✓ You Can:</h4>
                  <ul className="space-y-1">
                    <li>• Use the service for any lawful purpose</li>
                    <li>• Process your own data</li>
                    <li>• Export and save your results</li>
                    <li>• Use for personal or commercial purposes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-2">✗ You Cannot:</h4>
                  <ul className="space-y-1">
                    <li>• Use for illegal purposes</li>
                    <li>• Access the service excessively</li>
                    <li>• Reverse engineer the service</li>
                    <li>• Violate others' privacy rights</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-dice text-primary-foreground text-sm" />
                </div>
                <span className="font-semibold">Lucky Spinner</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Fair and fun random selection tool for any occasion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>Interactive Wheel</li>
                <li>Manual Data Entry</li>
                <li>Excel File Upload</li>
                <li>Winner Tracking</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="flex space-x-3">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <i className="fab fa-facebook" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <i className="fab fa-linkedin" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-6 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Lucky Spinner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}