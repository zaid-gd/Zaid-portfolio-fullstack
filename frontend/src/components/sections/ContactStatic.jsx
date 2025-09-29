import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Mail, Phone, MapPin, Send, CheckCircle, ExternalLink } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const EMAIL_ADDRESS = 'zaid.ansari5127@gmail.com';

const ContactStatic = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;
    
    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!subject.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a subject.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!message.trim() || message.trim().length < 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a message with at least 10 characters.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  // Use an anchor click to open mailto, which is more reliable than window.location.href
  const openMailClient = (mailtoLink) => {
    const a = document.createElement('a');
    a.href = mailtoLink;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const { name, email, subject, message } = formData;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:zaid.ansari5127@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    try {
      openMailClient(mailtoLink);

      toast({
        title: "Opening Email Client",
        description: "Your default email application will open with the message pre-filled.",
        variant: "default",
      });

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 1000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not open your email client. Please email directly.",
        variant: "destructive",
      });
    }
  };

  const handleDirectEmail = () => {
    // Use anchor click for reliability
    openMailClient(`mailto:zaid.ansari5127@gmail.com`);
  };

  return (
    <section id="contact" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Get In </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
                Touch
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto mb-6"></div>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Ready to collaborate or have a question? I'd love to hear from you. 
              Let's create something amazing together!
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-6">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg">
                        <Mail className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-white font-medium">zaid.ansari5127@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg">
                        <Phone className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Phone</p>
                        <p className="text-white font-medium">+91 9867251592</p>
                        <p className="text-white font-medium">+971 526243982</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg">
                        <MapPin className="w-5 h-5 text-black" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="text-white font-medium">Mumbai, Maharashtra, India</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Contact</h3>
                  <Button
                    onClick={handleDirectEmail}
                    className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:from-cyan-300 hover:to-green-300 font-semibold mb-3"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Direct Email
                  </Button>
                  <div className="flex items-center space-x-2 text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Usually responds within 24 hours</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <Card className="bg-slate-800/50 border-cyan-400/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-2">Send Message</h3>
                    <p className="text-gray-400 text-sm">
                      Fill out the form below and it will open your email client with the message pre-filled.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-white">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-white">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-white">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell me about your project or question..."
                        rows={6}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-cyan-400 to-green-400 text-black hover:from-cyan-300 hover:to-green-300 font-semibold py-3 text-lg"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Open in Email Client
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">
                        Having trouble with the form?
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleDirectEmail}
                        className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 text-sm"
                      >
                        <ExternalLink className="w-3 h-3 mr-2" />
                        Email me directly
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactStatic;