import { Link } from "wouter";

export default function About() {
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
              <Link href="/about" className="text-foreground font-medium">
                About
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
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
          <h1 className="text-4xl font-bold text-center mb-8">About Lucky Spinner</h1>
          
          <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">What is Lucky Spinner?</h2>
            <p className="mb-6">
              Lucky Spinner is a free, web-based spinning wheel application designed to help you make fair and random selections 
              from any group of participants. Whether you're organizing a raffle, selecting team members, choosing contest winners, 
              or making any kind of random decision, Lucky Spinner provides an engaging and transparent way to ensure fairness.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Multiple Input Methods:</strong> Upload Excel files or manually enter participant data</li>
              <li><strong>Weighted Selection:</strong> Give some participants better odds with occurrence multipliers</li>
              <li><strong>Interactive Wheel:</strong> Beautiful, animated spinning wheel with customizable colors</li>
              <li><strong>Winner Tracking:</strong> Keep track of all selected winners with timestamps</li>
              <li><strong>Data Export:</strong> Download your results as CSV files for record keeping</li>
              <li><strong>Reset Functionality:</strong> Start fresh anytime with the reset feature</li>
              <li><strong>Mobile Friendly:</strong> Works perfectly on desktop, tablet, and mobile devices</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-semibold mb-2">1. Add Participants</h3>
                <p className="text-sm">Upload an Excel file or manually enter participant names and their occurrence values.</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-semibold mb-2">2. Spin the Wheel</h3>
                <p className="text-sm">Click the spin button to randomly select a winner using our fair algorithm.</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-semibold mb-2">3. Track Winners</h3>
                <p className="text-sm">View all selected winners with their original occurrence values and selection times.</p>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="font-semibold mb-2">4. Export Results</h3>
                <p className="text-sm">Download your winner list as a CSV file for your records.</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Use Cases</h2>
            <div className="bg-muted rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">🎉 Events & Contests</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Prize raffles and giveaways</li>
                    <li>• Contest winner selection</li>
                    <li>• Door prize drawings</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🏢 Business & Teams</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Team member selection</li>
                    <li>• Task assignment</li>
                    <li>• Meeting facilitator choice</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎓 Education</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Student selection for activities</li>
                    <li>• Random group formation</li>
                    <li>• Presentation order determination</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">🎮 Gaming & Fun</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Game night decisions</li>
                    <li>• Random activity selection</li>
                    <li>• Party games and icebreakers</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Why Lucky Spinner?</h2>
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <i className="fas fa-shield-alt text-2xl text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Fair & Transparent</h4>
                  <p className="text-sm">True random selection with visible spinning process</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-rocket text-2xl text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Easy to Use</h4>
                  <p className="text-sm">Intuitive interface that anyone can use immediately</p>
                </div>
                <div className="text-center">
                  <i className="fas fa-mobile-alt text-2xl text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Works Everywhere</h4>
                  <p className="text-sm">No downloads needed, works on any device with a browser</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Privacy & Security</h2>
            <p className="mb-4">
              Lucky Spinner processes all data locally in your browser. We don't store your participant data on our servers, 
              ensuring your privacy and data security. The application works entirely client-side, meaning your sensitive 
              information never leaves your device.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
            <p className="mb-6">
              Ready to start making fair selections? Visit our <Link href="/" className="text-primary hover:underline">homepage</Link> 
              to begin using Lucky Spinner right away. No registration required!
            </p>

            <div className="text-center">
              <Link href="/">
                <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Start Using Lucky Spinner
                </button>
              </Link>
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