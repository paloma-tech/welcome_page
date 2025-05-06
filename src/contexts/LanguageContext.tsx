"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const enTranslations = {
  // Common
  'language.french': 'French',
  'language.english': 'English',

  // Header
  'header.home': 'Home',
  'header.contactus': 'Contact us',

  // Contact Page
  'contact.title': 'Contact us',
  'contact.subtitle': 'Get in touch and let us know how we can help.',
  'contact.form.title': 'Send us a message',
  'contact.form.description': 'Our team is here to help you optimize your business operations and enhance your point of sale experience.',
  'contact.form.name': 'Your Name',
  'contact.form.name.placeholder': 'Enter your name',
  'contact.form.company': 'Company',
  'contact.form.company.placeholder': 'Enter your company name',
  'contact.form.email': 'Your Email',
  'contact.form.email.placeholder': 'Enter your email',
  'contact.form.message': 'Message',
  'contact.form.message.placeholder': 'Enter your Message',
  'contact.form.submit': 'Send Message',
  'contact.form.submitting': 'Sending...',
  'contact.info.title': 'Get in touch',
  'contact.info.description': 'Have a question about our ERP Point of Sale system? We\'re here to provide you with the best support possible.',
  'contact.info.email.title': 'Email Us',
  'contact.info.call.title': 'Call Us',

  // WelcomeHero
  'hero.badge': 'Cloud-Optional ERP & POS Solution',
  'hero.title': 'Empower Your Business Operations',
  'hero.description': 'Effortlessly manage sales, inventory, and operations with our cutting-edge cloud-optional ERP system that works online and offline.',
  'hero.feature1': 'Inventory Management',
  'hero.feature2': 'Sales Tracking',
  'hero.feature3': 'Customer Management',
  'hero.feature4': 'Financial Reporting',
  'hero.cta.trial': 'Start Free Trial',
  'hero.cta.learn': 'Learn More',
  'hero.dashboard.label': 'Dashboard View',
  'hero.dashboard.caption': 'Powerful and intuitive business management interface',

  // WelcomeFeatures
  'features.pos.title': 'Point of Sale',
  'features.pos.description': 'Streamline checkout processes with our intuitive POS system',
  'features.erp.title': 'ERP System',
  'features.erp.description': 'Manage your entire business operations with our comprehensive ERP solution',
  'features.cloud.title': 'Cloud Optional',
  'features.cloud.description': 'Work online or offline with our flexible cloud-optional architecture',

  // AboutSection
  'about.badge': 'Who we are',
  'about.title': 'Our POS simplifies sales, tracks inventory, and streamlines operations',
  'about.description': "With Paloma's integrated ERP solution, you can monitor your business operations from anywhere, streamline your processes, and make data-driven decisions that drive growth and efficiency.",

  // WelcomeERPSolutions
  'erp.badge': 'What we offer',
  'erp.title': 'Our complete ERP solutions',
  'erp.solution1.title': 'Multi-Store Management',
  'erp.solution1.description': 'Monitor multiple store locations with a single dashboard',
  'erp.solution2.title': 'Inventory Management',
  'erp.solution2.description': 'Track stock levels, automate restocking, and reduce wastage with our smart inventory tools',
  'erp.solution3.title': 'Employee Management',
  'erp.solution3.description': 'Effectively manage employee roles, shifts, payroll, and performance tracking within a single platform',
  'erp.solution4.title': 'AI-Powered Process Automation',
  'erp.solution4.description': 'Simplify operations with AI-driven document scanning and automated form filling',
  'erp.solution5.title': 'Mobile Accessibility',
  'erp.solution5.description': 'Manage your business on-the-go with our mobile-friendly platform',
  'erp.solution6.title': 'Offline Mode for POS',
  'erp.solution6.description': 'Continue processing transactions even without an internet connection, syncing automatically when reconnected',

  // ScreenshotsSection
  'screenshots.badge': 'Product Screenshots',
  'screenshots.title': 'See Our Solution in Action',
  'screenshots.description': 'Explore the intuitive interfaces and powerful features that make our ERP and POS solution stand out',
  'screenshots.pos.title': 'POS Interface',
  'screenshots.pos.description': 'Intuitive point-of-sale system for quick transactions',
  'screenshots.dashboard.title': 'Dashboard Overview',
  'screenshots.dashboard.description': 'Complete business overview with key metrics and analytics',
  'screenshots.invoice.title': 'Invoice Management',
  'screenshots.invoice.description': 'Create, customize and manage professional invoices with automatic calculations and tax handling',
  'screenshots.employee.title': 'Employee Management',
  'screenshots.employee.description': 'Customize user permissions with role-based access control for secure system management',
  'screenshots.printer.title': 'Printer Configuration',
  'screenshots.printer.description': 'Configure receipt printers with customizable templates and settings for different business needs',
  'screenshots.kitchen.title': 'Kitchen Display System',
  'screenshots.kitchen.description': 'Real-time kitchen screen with order management and integrated printer settings for efficient food preparation',

  // WhyChooseUs
  'why.title': 'Why Choose Paloma',
  'why.description': 'Discover the advantages that make our solution stand out from the competition',
  'why.feature1.title': 'Scalable cloud-based technology',
  'why.feature1.description': 'Our ERP adapts to your business growth, ensuring smooth operations at any scale',
  'why.feature2.title': 'User-Friendly and Intuitive Interface',
  'why.feature2.description': 'Designed for ease of use, enabling quick adoption with minimal training',
  'why.feature3.title': 'Secure Data Storage and Backup',
  'why.feature3.description': 'Your business data is encrypted and backed up regularly for maximum security',
  'why.feature4.title': '24/7 Customer Support',
  'why.feature4.description': 'Get assistance anytime with our dedicated support team, ready to help you solve issues quickly',

  // CallToAction
  'cta.title': 'Ready to Transform Your Business?',
  'cta.description': 'Start your journey with our comprehensive ERP and POS solution today. Sign up for a free trial or contact our sales team for a personalized demo.',
  'cta.trial': 'Start Free Trial',
  'cta.demo': 'Request Demo',

  // Footer
  'footer.copyright': 'Copyright © {year} Paloma, All rights reserved.',
};

// French translations
const frTranslations = {
  // Common
  'language.french': 'Français',
  'language.english': 'Anglais',

  // Header
  'header.home': 'Accueil',
  'header.contactus': 'Contactez-nous',

  // Contact Page
  'contact.title': 'Contactez-nous',
  'contact.subtitle': 'Prenez contact avec nous et dites-nous comment nous pouvons vous aider.',
  'contact.form.title': 'Envoyez-nous un message',
  'contact.form.description': 'Notre équipe est là pour vous aider à optimiser vos opérations commerciales et améliorer votre expérience de point de vente.',
  'contact.form.name': 'Votre nom',
  'contact.form.name.placeholder': 'Entrez votre nom',
  'contact.form.company': 'Entreprise',
  'contact.form.company.placeholder': 'Entrez le nom de votre entreprise',
  'contact.form.email': 'Votre email',
  'contact.form.email.placeholder': 'Entrez votre email',
  'contact.form.message': 'Message',
  'contact.form.message.placeholder': 'Entrez votre message',
  'contact.form.submit': 'Envoyer le message',
  'contact.form.submitting': 'Envoi en cours...',
  'contact.info.title': 'Prenez contact',
  'contact.info.description': 'Vous avez une question sur notre système ERP de point de vente ? Nous sommes là pour vous fournir le meilleur support possible.',
  'contact.info.email.title': 'Envoyez-nous un email',
  'contact.info.call.title': 'Appelez-nous',

  // WelcomeHero
  'hero.badge': 'Solution ERP & PDV Cloud-Optionnelle',
  'hero.title': 'Optimisez vos opérations commerciales',
  'hero.description': 'Gérez facilement les ventes, les stocks et les opérations grâce à notre système ERP de pointe qui fonctionne en ligne et hors ligne.',
  'hero.feature1': 'Gestion des stocks',
  'hero.feature2': 'Suivi des ventes',
  'hero.feature3': 'Gestion des clients',
  'hero.feature4': 'Rapports financiers',
  'hero.cta.trial': 'Commencer l\'essai gratuit',
  'hero.cta.learn': 'En savoir plus',
  'hero.dashboard.label': 'Vue du tableau de bord',
  'hero.dashboard.caption': 'Interface de gestion d\'entreprise puissante et intuitive',

  // WelcomeFeatures
  'features.pos.title': 'Point de Vente',
  'features.pos.description': 'Simplifiez les processus de paiement avec notre système PDV intuitif',
  'features.erp.title': 'Système ERP',
  'features.erp.description': 'Gérez l\'ensemble de vos opérations commerciales avec notre solution ERP complète',
  'features.cloud.title': 'Cloud Optionnel',
  'features.cloud.description': 'Travaillez en ligne ou hors ligne avec notre architecture flexible cloud-optionnelle',

  // AboutSection
  'about.badge': 'Qui sommes-nous',
  'about.title': 'Notre PDV simplifie les ventes, suit les stocks et rationalise les opérations',
  'about.description': "Avec la solution ERP intégrée de Paloma, vous pouvez surveiller vos opérations commerciales de n'importe où, rationaliser vos processus et prendre des décisions basées sur les données qui favorisent la croissance et l'efficacité.",

  // WelcomeERPSolutions
  'erp.badge': 'Ce que nous offrons',
  'erp.title': 'Nos solutions ERP complètes',
  'erp.solution1.title': 'Gestion multi-magasins',
  'erp.solution1.description': 'Surveillez plusieurs emplacements de magasins avec un seul tableau de bord',
  'erp.solution2.title': 'Gestion des stocks',
  'erp.solution2.description': 'Suivez les niveaux de stock, automatisez le réapprovisionnement et réduisez le gaspillage avec nos outils intelligents de gestion des stocks',
  'erp.solution3.title': 'Gestion des employés',
  'erp.solution3.description': 'Gérez efficacement les rôles, les horaires, la paie et le suivi des performances des employés au sein d\'une plateforme unique',
  'erp.solution4.title': 'Automatisation des processus par IA',
  'erp.solution4.description': 'Simplifiez les opérations grâce à la numérisation de documents pilotée par l\'IA et au remplissage automatisé de formulaires',
  'erp.solution5.title': 'Accessibilité mobile',
  'erp.solution5.description': 'Gérez votre entreprise en déplacement avec notre plateforme adaptée aux mobiles',
  'erp.solution6.title': 'Mode hors ligne pour PDV',
  'erp.solution6.description': 'Continuez à traiter les transactions même sans connexion Internet, avec synchronisation automatique lors de la reconnexion',

  // ScreenshotsSection
  'screenshots.badge': 'Captures d\'écran du produit',
  'screenshots.title': 'Découvrez notre solution en action',
  'screenshots.description': 'Explorez les interfaces intuitives et les fonctionnalités puissantes qui distinguent notre solution ERP et PDV',
  'screenshots.pos.title': 'Interface PDV',
  'screenshots.pos.description': 'Système de point de vente intuitif pour des transactions rapides',
  'screenshots.dashboard.title': 'Aperçu du tableau de bord',
  'screenshots.dashboard.description': 'Vue d\'ensemble complète de l\'entreprise avec indicateurs clés et analyses',
  'screenshots.invoice.title': 'Gestion des factures',
  'screenshots.invoice.description': 'Créez, personnalisez et gérez des factures professionnelles avec calculs automatiques et gestion des taxes',
  'screenshots.employee.title': 'Gestion des employés',
  'screenshots.employee.description': 'Personnalisez les permissions utilisateur avec un contrôle d\'accès basé sur les rôles pour une gestion sécurisée du système',
  'screenshots.printer.title': 'Configuration de l\'imprimante',
  'screenshots.printer.description': 'Configurez les imprimantes de reçus avec des modèles et des paramètres personnalisables pour différents besoins commerciaux',
  'screenshots.kitchen.title': 'Système d\'affichage cuisine',
  'screenshots.kitchen.description': 'Écran de cuisine en temps réel avec gestion des commandes et paramètres d\'imprimante intégrés pour une préparation efficace des aliments',

  // WhyChooseUs
  'why.title': 'Pourquoi choisir Paloma',
  'why.description': 'Découvrez les avantages qui distinguent notre solution de la concurrence',
  'why.feature1.title': 'Technologie cloud évolutive',
  'why.feature1.description': 'Notre ERP s\'adapte à la croissance de votre entreprise, assurant des opérations fluides à n\'importe quelle échelle',
  'why.feature2.title': 'Interface conviviale et intuitive',
  'why.feature2.description': 'Conçue pour être facile à utiliser, permettant une adoption rapide avec une formation minimale',
  'why.feature3.title': 'Stockage et sauvegarde sécurisés des données',
  'why.feature3.description': 'Vos données commerciales sont cryptées et sauvegardées régulièrement pour une sécurité maximale',
  'why.feature4.title': 'Support client 24/7',
  'why.feature4.description': 'Obtenez de l\'aide à tout moment avec notre équipe de support dédiée, prête à vous aider à résoudre rapidement les problèmes',

  // CallToAction
  'cta.title': 'Prêt à transformer votre entreprise ?',
  'cta.description': 'Commencez votre parcours avec notre solution complète ERP et PDV dès aujourd\'hui. Inscrivez-vous pour un essai gratuit ou contactez notre équipe commerciale pour une démonstration personnalisée.',
  'cta.trial': 'Commencer l\'essai gratuit',
  'cta.demo': 'Demander une démo',

  // Footer
  'footer.copyright': 'Copyright © {year} Paloma, Tous droits réservés.',
};

const translations = {
  en: enTranslations,
  fr: frTranslations,
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fr'); // French as default

  // Function to translate text
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  // Load language preference from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'fr')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
