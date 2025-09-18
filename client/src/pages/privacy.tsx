import { Link } from "wouter";

export default function Privacy() {
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
              <Link href="/privacy" className="text-foreground font-medium">
                Privacy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Effective Date:</strong> September 18, 2024<br />
              <strong>Last Updated:</strong> September 18, 2024
            </p>

            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-6">
              Lucky Spinner ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains 
              how we collect, use, disclose, and safeguard your information when you visit our website and use our 
              spinning wheel application.
            </p>

            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-semibold mb-3">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Participant names and data you enter or upload to create spinning wheels</li>
              <li>Contact information if you reach out to us through our contact form</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Usage data and analytics (via Google Analytics)</li>
              <li>Browser type, operating system, and device information</li>
              <li>IP address and general location information</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring and exit pages</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>To provide and maintain our spinning wheel service</li>
              <li>To process your participant data locally in your browser</li>
              <li>To improve our website and user experience</li>
              <li>To analyze usage patterns and optimize performance</li>
              <li>To respond to your inquiries and provide customer support</li>
              <li>To display relevant advertisements through Google AdSense</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">4. Data Storage and Processing</h2>
            <div className="bg-primary/10 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-3">Important: Local Processing</h3>
              <p>
                <strong>Your participant data (names, occurrence values, etc.) is processed entirely in your browser 
                and is NOT sent to or stored on our servers.</strong> This data remains on your device and is only used 
                to create and operate the spinning wheel functionality.
              </p>
            </div>

            <h2 className="text-2xl font-semibold mb-4">5. Third-Party Services</h2>
            
            <h3 className="text-lg font-semibold mb-3">5.1 Google Analytics</h3>
            <p className="mb-4">
              We use Google Analytics to understand how visitors interact with our website. Google Analytics collects 
              information such as how often users visit the site, what pages they visit, and what other sites they used 
              prior to coming to this site.
            </p>

            <h3 className="text-lg font-semibold mb-3">5.2 Google AdSense</h3>
            <p className="mb-4">
              We use Google AdSense to display advertisements. Google may use cookies and web beacons to serve ads based on 
              your prior visits to our website or other websites. You can opt out of personalized advertising by visiting 
              Google's Ads Settings.
            </p>

            <h3 className="text-lg font-semibold mb-3">5.3 Cookies and Tracking Technologies</h3>
            <p className="mb-6">
              We and our third-party partners use cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>Remember your preferences</li>
              <li>Analyze website traffic and usage</li>
              <li>Serve personalized advertisements</li>
              <li>Improve our services</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">6. Information Sharing</h2>
            <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties, except:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>With service providers who assist us in operating our website (Google Analytics, Google AdSense)</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a merger, acquisition, or asset sale (with prior notice)</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">7. Data Security</h2>
            <p className="mb-6">
              We implement appropriate security measures to protect your information. However, no method of transmission 
              over the internet or electronic storage is 100% secure. Since your participant data is processed locally 
              in your browser, it is not transmitted to our servers and remains under your control.
            </p>

            <h2 className="text-2xl font-semibold mb-4">8. Your Rights and Choices</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Cookie Control:</strong> You can control cookies through your browser settings</li>
              <li><strong>Ad Personalization:</strong> You can opt out of personalized ads through Google's Ads Settings</li>
              <li><strong>Analytics:</strong> You can opt out of Google Analytics through Google's opt-out browser add-on</li>
              <li><strong>Data Deletion:</strong> Since participant data is stored locally, you can delete it by clearing your browser data</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">9. Children's Privacy</h2>
            <p className="mb-6">
              Our service is not directed to children under 13. We do not knowingly collect personal information from 
              children under 13. If we become aware that we have collected personal information from a child under 13, 
              we will take steps to delete such information.
            </p>

            <h2 className="text-2xl font-semibold mb-4">10. International Users</h2>
            <p className="mb-6">
              Our website is hosted in the United States. If you are accessing our website from outside the United States, 
              please be aware that your information may be transferred to, stored, and processed in the United States.
            </p>

            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy 
              Policy periodically.
            </p>

            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="bg-secondary rounded-lg p-4 mb-6">
              <p className="mb-2"><strong>Email:</strong> privacy@luckyspinner.com</p>
              <p className="mb-2"><strong>Contact Form:</strong> <Link href="/contact" className="text-primary hover:underline">Visit our contact page</Link></p>
            </div>

            <div className="bg-muted rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Quick Privacy Summary</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-green-600 mb-2">✓ What We DON'T Do:</h4>
                  <ul className="space-y-1">
                    <li>• Store your participant data on our servers</li>
                    <li>• Sell your personal information</li>
                    <li>• Track you across other websites</li>
                    <li>• Require registration or accounts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-600 mb-2">ℹ What We DO:</h4>
                  <ul className="space-y-1">
                    <li>• Process your data locally in your browser</li>
                    <li>• Use analytics to improve our service</li>
                    <li>• Display relevant advertisements</li>
                    <li>• Protect your privacy and security</li>
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