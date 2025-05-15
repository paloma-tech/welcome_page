'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { AlertTriangle, Mail, Phone, RefreshCw } from 'lucide-react';

interface DataNotFoundErrorProps {
  licenseKey: string;
  onRetry?: () => void;
  isRetrying?: boolean;
}

export function DataNotFoundError({ licenseKey, onRetry, isRetrying = false }: DataNotFoundErrorProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: `My dashboard data file could not be found. My license key is: ${licenseKey}. Please help me resolve this issue.`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send email to support
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success('Your message has been sent. Our support team will contact you shortly.');
        setFormData(prev => ({ ...prev, name: '', email: '' }));
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error sending support request:', error);
      toast.error('An error occurred. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoClick = () => {
    const subject = encodeURIComponent('Dashboard Data Not Found');
    const body = encodeURIComponent(`My dashboard data file could not be found.\n\nMy license key is: ${licenseKey}\n\nPlease help me resolve this issue.`);
    window.location.href = `mailto:contact@paloma.tn?subject=${subject}&body=${body}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="border-red-200 shadow-lg">
        <CardHeader className="bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-800/30">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <div>
              <CardTitle className="text-xl text-red-700 dark:text-red-400">Dashboard Data Not Found</CardTitle>
              <CardDescription className="text-red-600/80 dark:text-red-300/80">
                We couldn't find your dashboard data file in our system
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-100 dark:border-amber-800/30">
              <h3 className="font-medium text-amber-800 dark:text-amber-300 mb-2">What happened?</h3>
              <p className="text-amber-700 dark:text-amber-200 text-sm">
                Your dashboard data file with license key <span className="font-mono bg-amber-100 dark:bg-amber-800/50 px-1 py-0.5 rounded">{licenseKey}</span> could not be found in our storage system. This could be because:
              </p>
              <ul className="list-disc list-inside text-sm text-amber-700 dark:text-amber-200 mt-2 space-y-1">
                <li>Your account is new and the data file hasn't been created yet</li>
                <li>There was an error during the data file creation process</li>
                <li>The data file was accidentally deleted or corrupted</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">What can you do?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                    <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-700 dark:text-blue-300">Try refreshing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Sometimes this issue can be temporary. Try refreshing to see if your data becomes available.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30"
                      onClick={onRetry}
                      disabled={isRetrying}
                    >
                      {isRetrying ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Refreshing...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Refresh Dashboard
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-300">Contact Support</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      Our support team can help resolve this issue and create your data file.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/30"
                        onClick={handleMailtoClick}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Email Support
                      </Button>
                      <Link href="/contact" passHref>
                        <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-300 dark:hover:bg-green-900/30">
                          Contact Page
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
                    <Phone className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-700 dark:text-purple-300">Call Us Directly</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      For urgent assistance, you can call our support team directly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <a href="tel:+21692530875" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-purple-200 bg-transparent text-purple-700 shadow-sm hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30 h-9 px-4 py-2">
                        +216 92 530 875
                      </a>
                      <a href="tel:+21690656399" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-purple-200 bg-transparent text-purple-700 shadow-sm hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30 h-9 px-4 py-2">
                        +216 90 656 399
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col border-t pt-6">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-4 w-full">Send a Support Request</h3>
          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="resize-none"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Support Request'}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
