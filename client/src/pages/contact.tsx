import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission (replace with actual implementation)
    try {
      // For now, just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-foreground font-medium">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="prose prose-lg mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
              <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feature">Feature Request</option>
                    <option value="bug">Bug Report</option>
                    <option value="privacy">Privacy Concerns</option>
                    <option value="business">Business Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner animate-spin mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <i className="fas fa-info-circle mr-2" />
                  We typically respond to messages within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <i className="fas fa-envelope text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">
                        For general inquiries and support:
                      </p>
                      <p className="font-medium">contact@luckyspinner.com</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Response time: 24-48 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                      <i className="fas fa-shield-alt text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Privacy & Legal</h3>
                      <p className="text-muted-foreground mb-2">
                        For privacy and legal matters:
                      </p>
                      <p className="font-medium">legal@luckyspinner.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <i className="fas fa-bug text-secondary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Bug Reports</h3>
                      <p className="text-muted-foreground mb-2">
                        Found a bug? Help us improve:
                      </p>
                      <p className="font-medium">bugs@luckyspinner.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                <h2 className="text-2xl font-semibold mb-6">FAQ</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Is my data secure?</h3>
                    <p className="text-sm text-muted-foreground">
                      Yes! All participant data is processed locally in your browser and never sent to our servers.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Is Lucky Spinner free to use?</h3>
                    <p className="text-sm text-muted-foreground">
                      Absolutely! Lucky Spinner is completely free to use for personal and commercial purposes.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Can I suggest new features?</h3>
                    <p className="text-sm text-muted-foreground">
                      We'd love to hear your ideas! Use the contact form above with "Feature Request" as the subject.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Do you offer API access?</h3>
                    <p className="text-sm text-muted-foreground">
                      Currently, Lucky Spinner is a web-only application. Contact us for business inquiries about API access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6">
                <h3 className="font-semibold mb-3">Stay Connected</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Follow us for updates and new features:
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors">
                    <i className="fab fa-facebook" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors">
                    <i className="fab fa-linkedin" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/80 transition-colors">
                    <i className="fab fa-github" />
                  </a>
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