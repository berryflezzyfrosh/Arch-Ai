import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Phone, Mail, User, MessageSquare, Building, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContactService } from '../services/contactService';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  company: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectType: z.string().min(1, 'Please select a project type'),
  budget: z.string().min(1, 'Please select a budget range'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      await ContactService.submitContact(data);
      toast.success('🚀 Mission Control Contacted! We\'ll call you within 2 hours to discuss your dream project.');
      reset();
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    { value: 'residential', label: 'Residential Dream Home' },
    { value: 'commercial', label: 'Commercial Building' },
    { value: 'futuristic', label: 'Futuristic Structure' },
    { value: 'renovation', label: 'Renovation Project' },
    { value: 'conceptual', label: 'Conceptual Design' },
    { value: 'other', label: 'Other' }
  ];

  const budgetRanges = [
    { value: 'under-100k', label: 'Under $100K' },
    { value: '100k-500k', label: '$100K - $500K' },
    { value: '500k-1m', label: '$500K - $1M' },
    { value: '1m-5m', label: '$1M - $5M' },
    { value: '5m-plus', label: '$5M+' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-slate-900 via-purple-900/50 to-indigo-900/50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
                Let's Build Your Dreams
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Ready to transform your architectural visions into reality? Our team of expert architects and AI specialists are here to help you create something extraordinary.
              </p>
            </div>

            <div className="space-y-6">
              {[
                '24/7 AI-Powered Dream Analysis',
                'Instant 3D Visualization & Blueprints',
                'Direct Line to Our Architecture Team',
                'Free Initial Consultation & Quote',
                'Quantum-Speed Project Processing'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div className="bg-slate-800/50 backdrop-blur-lg border-2 border-transparent rounded-3xl p-8 relative overflow-hidden">
              {/* Animated Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 rounded-3xl animate-pulse opacity-20"></div>
              <div className="absolute inset-0.5 bg-slate-900 rounded-3xl"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Contact Mission Control
                </h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Your Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email Address
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="Your phone for instant callbacks"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Company (Optional) */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Company (Optional)
                    </label>
                    <input
                      {...register('company')}
                      type="text"
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Subject
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                      placeholder="What's your project about?"
                    />
                    {errors.subject && (
                      <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Project Type
                    </label>
                    <select
                      {...register('projectType')}
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                    >
                      <option value="">Select your project type</option>
                      {projectTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="text-red-400 text-sm mt-1">{errors.projectType.message}</p>
                    )}
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      Budget Range
                    </label>
                    <select
                      {...register('budget')}
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((budget) => (
                        <option key={budget.value} value={budget.value}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="text-red-400 text-sm mt-1">{errors.budget.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-yellow-400 font-semibold mb-2">
                      <MessageSquare className="w-4 h-4 inline mr-2" />
                      Describe Your Dream
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className="w-full p-4 bg-slate-900/80 border border-orange-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20 transition-all duration-300 resize-none"
                      placeholder="Tell us about your architectural vision, special requirements, timeline, or any questions you have..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl font-bold text-lg text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>{isSubmitting ? 'Launching...' : 'Launch Your Dream Project'}</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;