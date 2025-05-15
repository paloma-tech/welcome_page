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
  'hero.cta.login': 'Login',
  'hero.cta.register': 'Register',
  'hero.cta.startnow': 'Start Now',
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

  // Dashboard
  'dashboard.tabs.overview': 'Overview',
  'dashboard.tabs.sales': 'Sales',
  'dashboard.tabs.inventory': 'Inventory',
  'dashboard.tabs.employees': 'Employees',

  // LastUpdated component
  'dashboard.lastUpdated.online': 'Online',
  'dashboard.lastUpdated.offline': 'Offline',
  'dashboard.lastUpdated.onlineTitle': 'Connected to the internet',
  'dashboard.lastUpdated.offlineTitle': 'Working in offline mode',
  'dashboard.lastUpdated.syncLabel': 'Sync',
  'dashboard.lastUpdated.syncAutoTitle': 'Data is automatically synchronized',
  'dashboard.lastUpdated.syncManualTitle': 'Manual synchronization is required',
  'dashboard.lastUpdated.unknown': 'Unknown',
  'dashboard.lastUpdated.lastUpdatedLabel': 'Last updated',
  'dashboard.lastUpdated.lastUpdatedTitle': 'Last data update',
  'dashboard.lastUpdated.refreshTitle': 'Refresh data',

  // Dashboard Error
  'dashboard.error.title': 'Dashboard Data Not Found',
  'dashboard.error.subtitle': 'We couldn\'t find your dashboard data file in our system',
  'dashboard.error.whatHappened.title': 'What happened?',
  'dashboard.error.whatHappened.description': 'Your dashboard data file with license key',
  'dashboard.error.whatHappened.suffix': 'could not be found in our storage system.',
  'dashboard.error.refresh.refreshing': 'Refreshing...',
  'dashboard.error.refresh.button': 'Refresh Dashboard',
  'dashboard.error.contact.emailButton': 'Email Support',
  'dashboard.error.contact.emailSubject': 'Dashboard Data Not Found',
  'dashboard.error.contact.emailBody': 'My dashboard data file could not be found.\n\nMy license key is: {licenseKey}\n\nPlease help me resolve this issue.',
  'dashboard.error.support.title': 'For immediate assistance, please contact our support team:',

  // Dashboard Stats Cards
  'dashboard.stats.totalSales.title': 'Total Sales',
  'dashboard.stats.totalSales.description': 'Total sales amount',
  'dashboard.stats.todaySales.title': 'Today\'s Sales',
  'dashboard.stats.todaySales.description': 'Sales made today',
  'dashboard.stats.weeklySales.title': 'Weekly Sales',
  'dashboard.stats.weeklySales.description': 'Sales made this week',
  'dashboard.stats.monthlySales.title': 'Monthly Sales',
  'dashboard.stats.monthlySales.description': 'Sales made this month',
  'dashboard.stats.salesGrowth.title': 'Sales Growth',
  'dashboard.stats.salesGrowth.description': 'Growth compared to previous period',
  'dashboard.stats.salesGrowth.positive': 'from last month',
  'dashboard.stats.salesGrowth.negative': 'from last month',
  'dashboard.stats.totalOrders.title': 'Total Orders',
  'dashboard.stats.totalOrders.description': 'Total number of orders',
  'dashboard.stats.pendingOrders.title': 'Pending Orders',
  'dashboard.stats.pendingOrders.description': 'Orders awaiting processing',
  'dashboard.stats.completedOrders.title': 'Completed Orders',
  'dashboard.stats.completedOrders.description': 'Successfully fulfilled orders',
  'dashboard.stats.cancelledOrders.title': 'Cancelled Orders',
  'dashboard.stats.cancelledOrders.description': 'Orders that were cancelled',
  'dashboard.stats.activeEmployees.title': 'Active Employees',
  'dashboard.stats.activeEmployees.description': 'Currently active staff members',
  'dashboard.stats.inactiveEmployees.title': 'Inactive Employees',
  'dashboard.stats.inactiveEmployees.description': 'Staff members not currently active',
  'dashboard.stats.totalEmployees.title': 'Total Employees',
  'dashboard.stats.totalEmployees.description': 'Total number of staff members',
  'dashboard.stats.totalRoles.title': 'Total Roles',
  'dashboard.stats.totalRoles.description': 'Number of different job roles',
  'dashboard.stats.totalProducts.title': 'In Stock Items',
  'dashboard.stats.totalProducts.description': 'Total number of products',
  'dashboard.stats.totalValue.title': 'Inventory Value',
  'dashboard.stats.totalValue.description': 'Total value of current inventory',
  'dashboard.stats.lowStock.title': 'Low Stock Items',
  'dashboard.stats.lowStock.description': 'Products with low quantity',
  'dashboard.stats.outOfStock.title': 'Out of Stock Items',
  'dashboard.stats.outOfStock.description': 'Products with zero quantity',

  // Dashboard Charts
  'dashboard.charts.sales.title': 'Sales Overview',
  'dashboard.charts.sales.subtitle': 'Sales performance over time',
  'dashboard.charts.sales.daily': 'Daily',
  'dashboard.charts.sales.weekly': 'Weekly',
  'dashboard.charts.sales.monthly': 'Monthly',
  'dashboard.charts.sales.xAxis': 'Time Period',
  'dashboard.charts.sales.yAxis': 'Sales Amount',
  'dashboard.charts.inventory.title': 'Inventory Overview',
  'dashboard.charts.inventory.subtitle': 'Inventory distribution',
  'dashboard.charts.inventory.byCategory': 'Categories',
  'dashboard.charts.inventory.topProducts': 'Top Products',
  'dashboard.charts.inventory.stockStatus': 'Stock Status',
  'dashboard.charts.inventory.xAxis': 'Category',
  'dashboard.charts.inventory.yAxis': 'Stock Level',

  // Dashboard Buttons
  'dashboard.title': 'Dashboard',
  'dashboard.welcome': 'Welcome back, {name}!',
  'dashboard.loading': 'Loading...',
  'dashboard.button.editProfile': 'Edit Profile',
  'dashboard.button.signOut': 'Sign Out',
  'dashboard.button.homePage': 'Home Page',
  'dashboard.error.session': 'Session expired. Please sign in again.',
  'dashboard.error.loading': 'An error occurred while loading user data',
  'dashboard.needSignIn': 'You need to sign in to access the dashboard.',
  'dashboard.button.signIn': 'Sign In',

  // Sign In Page
  'signin.title': 'Sign in to your account',
  'signin.subtitle': 'Login to your account for a faster checkout.',
  'signin.email.label': 'Your Email',
  'signin.email.placeholder': 'Enter your email',
  'signin.password.label': 'Your Password',
  'signin.password.placeholder': 'Enter your password',
  'signin.rememberMe': 'Remember me',
  'signin.forgotPassword': 'Forgot Password?',
  'signin.button.signin': 'Sign in',
  'signin.button.signingin': 'Signing in...',
  'signin.noAccount': 'Don\'t have an account?',
  'signin.signup': 'Sign up',
  'signin.error.auth': 'Authentication error. Please try again.',
  'signin.error.login': 'Login failed',
  'signin.error.general': 'An error occurred. Please try again.',

  // Sign Up Page
  'signup.title': 'Create your account',
  'signup.subtitle': 'Start your ERP journey with a free trial',

  // Email Verification Pages
  'email.verified.title': 'Email Verified Successfully!',
  'email.verified.subtitle': 'Your email has been verified. You are now logged in.',
  'email.verified.licenseInfo': 'Next, you\'ll need to enter your pre-activated license key to access your account.',
  'email.verified.redirecting': 'Redirecting to license activation...',
  'email.verified.activateButton': 'Activate License',

  'email.failed.title': 'Verification Failed',
  'email.failed.subtitle': 'The verification link is invalid or has expired. Please try again or contact support.',
  'email.failed.registerButton': 'Register Again',
  'email.failed.supportButton': 'Contact Support',

  // License Activation Page
  'license.title': 'Enter Your License Key',
  'license.subtitle': 'Please enter your pre-activated license key to access your account.',
  'license.note': 'Note: The license key must be already activated and not assigned to any user.',
  'license.label': 'License Key',
  'license.placeholder': 'Enter your license key',
  'license.button.submit': 'Submit License Key',
  'license.button.verifying': 'Verifying...',
  'license.noKey': 'Don\'t have a license key?',
  'license.contactSupport': 'Contact Support',
  'license.loading': 'Checking license status...',
  'license.success': 'License key assigned successfully',
  'license.redirecting': 'Redirecting to dashboard...',
  'license.error.empty': 'Please enter a license key',
  'license.error.auth': 'Authentication error. Please sign in again.',
  'license.error.failed': 'Failed to assign license key',
  'license.error.general': 'An error occurred. Please try again.',

  // Forgot Password Page
  'forgotPassword.title': 'Forgot Password',
  'forgotPassword.subtitle': 'Enter your email address and we\'ll send you a link to reset your password.',
  'forgotPassword.email.label': 'Your Email',
  'forgotPassword.email.placeholder': 'Enter your email',
  'forgotPassword.button.send': 'Send Reset Link',
  'forgotPassword.button.sending': 'Sending...',
  'forgotPassword.rememberPassword': 'Remember your password?',
  'forgotPassword.signin': 'Sign in',
  'forgotPassword.success.checkEmail': 'Please check your email inbox and spam folder for the password reset link.',
  'forgotPassword.error.required': 'Email is required',
  'forgotPassword.error.invalid': 'Please enter a valid email address',
  'forgotPassword.error.failed': 'Failed to send password reset email',
  'forgotPassword.error.general': 'An error occurred. Please try again.',
  'signup.fullName.label': 'Full Name',
  'signup.fullName.placeholder': 'Enter your full name',
  'signup.fullName.error.required': 'Full name is required',
  'signup.fullName.error.length': 'Full name must be at least 2 characters',
  'signup.email.label': 'Work Email',
  'signup.email.placeholder': 'Enter your email',
  'signup.email.error.required': 'Email is required',
  'signup.email.error.invalid': 'Please enter a valid email address',
  'signup.password.label': 'Password',
  'signup.password.placeholder': 'Choose a strong password',
  'signup.password.error.required': 'Password is required',
  'signup.password.error.length': 'Password must be at least 8 characters',
  'signup.company.label': 'Company Name',
  'signup.company.placeholder': 'Enter your company name',
  'signup.address.label': 'Address',
  'signup.address.placeholder': 'Enter your address',
  'signup.address.error.length': 'Address must be at least 5 characters',
  'signup.phone.label': 'Phone Number',
  'signup.phone.placeholder': 'Enter your phone number',
  'signup.phone.error.invalid': 'Please enter a valid phone number',
  'signup.terms.agree': 'By creating account, you agree to our',
  'signup.terms.termsConditions': 'Terms & Conditions',
  'signup.terms.and': 'and',
  'signup.terms.privacyPolicy': 'Privacy Policy',
  'signup.terms.error': 'Please agree to the Terms & Conditions',
  'signup.button.create': 'Create Account',
  'signup.button.creating': 'Creating Account...',
  'signup.haveAccount': 'Already have an account?',
  'signup.signin': 'Sign in',
  'signup.error.registration': 'Registration failed',
  'signup.error.general': 'An error occurred. Please try again.',

  // Profile Page
  'profile.title': 'Your Profile',
  'profile.subtitle': 'Update your personal information',
  'profile.email.label': 'Email (cannot be changed)',
  'profile.fullName.label': 'Full Name',
  'profile.fullName.placeholder': 'Enter your full name',
  'profile.fullName.error.required': 'Full name is required',
  'profile.fullName.error.length': 'Full name must be at least 2 characters',
  'profile.company.label': 'Company Name',
  'profile.company.placeholder': 'Enter your company name',
  'profile.address.label': 'Address',
  'profile.address.placeholder': 'Enter your address',
  'profile.address.error.length': 'Address must be at least 5 characters',
  'profile.phone.label': 'Phone Number',
  'profile.phone.placeholder': 'Enter your phone number',
  'profile.phone.error.invalid': 'Please enter a valid phone number',
  'profile.button.update': 'Update Profile',
  'profile.button.updating': 'Updating...',
  'profile.button.back': 'Back to Dashboard',
  'profile.button.signout': 'Sign Out',
  'profile.loading': 'Loading profile...',
  'profile.success': 'Profile updated successfully',
  'profile.error.general': 'An error occurred. Please try again.',
  'profile.error.loading': 'An error occurred while loading your profile',
  'profile.error.session': 'Session expired. Please sign in again.',
  'profile.error.auth': 'Authentication error. Please sign in again.',
  'profile.error.update': 'Failed to update profile',
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
  'hero.cta.login': 'Connexion',
  'hero.cta.register': 'Inscription',
  'hero.cta.startnow': 'Commencer Maintenant',
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

  // Dashboard
  'dashboard.tabs.overview': 'Aperçu',
  'dashboard.tabs.sales': 'Ventes',
  'dashboard.tabs.inventory': 'Inventaire',
  'dashboard.tabs.employees': 'Employés',

  // LastUpdated component
  'dashboard.lastUpdated.online': 'En ligne',
  'dashboard.lastUpdated.offline': 'Hors ligne',
  'dashboard.lastUpdated.onlineTitle': 'Connecté à Internet',
  'dashboard.lastUpdated.offlineTitle': 'Travail en mode hors ligne',
  'dashboard.lastUpdated.syncLabel': 'Sync',
  'dashboard.lastUpdated.syncAutoTitle': 'Les données sont synchronisées automatiquement',
  'dashboard.lastUpdated.syncManualTitle': 'Synchronisation manuelle requise',
  'dashboard.lastUpdated.unknown': 'Inconnu',
  'dashboard.lastUpdated.lastUpdatedLabel': 'Dernière mise à jour',
  'dashboard.lastUpdated.lastUpdatedTitle': 'Dernière mise à jour des données',
  'dashboard.lastUpdated.refreshTitle': 'Actualiser les données',

  // Dashboard Error
  'dashboard.error.title': 'Données du Tableau de Bord Non Trouvées',
  'dashboard.error.subtitle': 'Nous n\'avons pas pu trouver votre fichier de données de tableau de bord dans notre système',
  'dashboard.error.whatHappened.title': 'Que s\'est-il passé ?',
  'dashboard.error.whatHappened.description': 'Votre fichier de données de tableau de bord avec la clé de licence',
  'dashboard.error.whatHappened.suffix': 'n\'a pas pu être trouvé dans notre système de stockage.',
  'dashboard.error.refresh.refreshing': 'Rafraîchissement...',
  'dashboard.error.refresh.button': 'Rafraîchir le Tableau de Bord',
  'dashboard.error.contact.emailButton': 'Contacter par Email',
  'dashboard.error.contact.emailSubject': 'Données du Tableau de Bord Non Trouvées',
  'dashboard.error.contact.emailBody': 'Mon fichier de données de tableau de bord n\'a pas pu être trouvé.\n\nMa clé de licence est : {licenseKey}\n\nVeuillez m\'aider à résoudre ce problème.',
  'dashboard.error.support.title': 'Pour une assistance immédiate, veuillez contacter notre équipe de support :',

  // Dashboard Stats Cards
  'dashboard.stats.totalSales.title': 'Ventes Totales',
  'dashboard.stats.totalSales.description': 'Montant total des ventes',
  'dashboard.stats.todaySales.title': 'Ventes du Jour',
  'dashboard.stats.todaySales.description': 'Ventes réalisées aujourd\'hui',
  'dashboard.stats.weeklySales.title': 'Ventes Hebdomadaires',
  'dashboard.stats.weeklySales.description': 'Ventes réalisées cette semaine',
  'dashboard.stats.monthlySales.title': 'Ventes Mensuelles',
  'dashboard.stats.monthlySales.description': 'Ventes réalisées ce mois',
  'dashboard.stats.salesGrowth.title': 'Croissance des Ventes',
  'dashboard.stats.salesGrowth.description': 'Croissance par rapport à la période précédente',
  'dashboard.stats.salesGrowth.positive': 'par rapport au mois dernier',
  'dashboard.stats.salesGrowth.negative': 'par rapport au mois dernier',
  'dashboard.stats.totalOrders.title': 'Commandes Totales',
  'dashboard.stats.totalOrders.description': 'Nombre total de commandes',
  'dashboard.stats.pendingOrders.title': 'Commandes en Attente',
  'dashboard.stats.pendingOrders.description': 'Commandes en attente de traitement',
  'dashboard.stats.completedOrders.title': 'Commandes Terminées',
  'dashboard.stats.completedOrders.description': 'Commandes traitées avec succès',
  'dashboard.stats.cancelledOrders.title': 'Commandes Annulées',
  'dashboard.stats.cancelledOrders.description': 'Commandes qui ont été annulées',
  'dashboard.stats.activeEmployees.title': 'Employés Actifs',
  'dashboard.stats.activeEmployees.description': 'Membres du personnel actuellement actifs',
  'dashboard.stats.inactiveEmployees.title': 'Employés Inactifs',
  'dashboard.stats.inactiveEmployees.description': 'Membres du personnel actuellement inactifs',
  'dashboard.stats.totalEmployees.title': 'Employés Totaux',
  'dashboard.stats.totalEmployees.description': 'Nombre total de membres du personnel',
  'dashboard.stats.totalRoles.title': 'Rôles Totaux',
  'dashboard.stats.totalRoles.description': 'Nombre de différents postes',
  'dashboard.stats.totalProducts.title': 'Articles en Stock',
  'dashboard.stats.totalProducts.description': 'Nombre total de produits',
  'dashboard.stats.totalValue.title': 'Valeur de l\'Inventaire',
  'dashboard.stats.totalValue.description': 'Valeur totale de l\'inventaire actuel',
  'dashboard.stats.lowStock.title': 'Articles en Stock Faible',
  'dashboard.stats.lowStock.description': 'Produits avec une quantité faible',
  'dashboard.stats.outOfStock.title': 'Articles en Rupture de Stock',
  'dashboard.stats.outOfStock.description': 'Produits avec une quantité nulle',

  // Dashboard Charts
  'dashboard.charts.sales.title': 'Aperçu des Ventes',
  'dashboard.charts.sales.subtitle': 'Performance des ventes dans le temps',
  'dashboard.charts.sales.daily': 'Quotidien',
  'dashboard.charts.sales.weekly': 'Hebdomadaire',
  'dashboard.charts.sales.monthly': 'Mensuel',
  'dashboard.charts.sales.xAxis': 'Période',
  'dashboard.charts.sales.yAxis': 'Montant des Ventes',
  'dashboard.charts.inventory.title': 'Aperçu de l\'Inventaire',
  'dashboard.charts.inventory.subtitle': 'Distribution de l\'inventaire',
  'dashboard.charts.inventory.byCategory': 'Catégories',
  'dashboard.charts.inventory.topProducts': 'Produits Principaux',
  'dashboard.charts.inventory.stockStatus': 'État du Stock',
  'dashboard.charts.inventory.xAxis': 'Catégorie',
  'dashboard.charts.inventory.yAxis': 'Niveau de Stock',

  // Dashboard Buttons
  'dashboard.title': 'Tableau de Bord',
  'dashboard.welcome': 'Bienvenue, {name} !',
  'dashboard.loading': 'Chargement...',
  'dashboard.button.editProfile': 'Modifier le Profil',
  'dashboard.button.signOut': 'Se Déconnecter',
  'dashboard.button.homePage': 'Page d\'Accueil',
  'dashboard.error.session': 'Session expirée. Veuillez vous reconnecter.',
  'dashboard.error.loading': 'Une erreur s\'est produite lors du chargement des données utilisateur',
  'dashboard.needSignIn': 'Vous devez vous connecter pour accéder au tableau de bord.',
  'dashboard.button.signIn': 'Se Connecter',

  // Sign In Page
  'signin.title': 'Connectez-vous à votre compte',
  'signin.subtitle': 'Connectez-vous à votre compte pour un paiement plus rapide.',
  'signin.email.label': 'Votre Email',
  'signin.email.placeholder': 'Entrez votre email',
  'signin.password.label': 'Votre Mot de Passe',
  'signin.password.placeholder': 'Entrez votre mot de passe',
  'signin.rememberMe': 'Se souvenir de moi',
  'signin.forgotPassword': 'Mot de passe oublié ?',
  'signin.button.signin': 'Se connecter',
  'signin.button.signingin': 'Connexion en cours...',
  'signin.noAccount': 'Vous n\'avez pas de compte ?',
  'signin.signup': 'S\'inscrire',
  'signin.error.auth': 'Erreur d\'authentification. Veuillez réessayer.',
  'signin.error.login': 'Échec de la connexion',
  'signin.error.general': 'Une erreur s\'est produite. Veuillez réessayer.',

  // Sign Up Page
  'signup.title': 'Créez votre compte',
  'signup.subtitle': 'Commencez votre expérience ERP avec un essai gratuit',

  // Email Verification Pages
  'email.verified.title': 'Email Vérifié avec Succès !',
  'email.verified.subtitle': 'Votre email a été vérifié. Vous êtes maintenant connecté.',
  'email.verified.licenseInfo': 'Ensuite, vous devrez entrer votre clé de licence pré-activée pour accéder à votre compte.',
  'email.verified.redirecting': 'Redirection vers l\'activation de la licence...',
  'email.verified.activateButton': 'Activer la Licence',

  'email.failed.title': 'Échec de la Vérification',
  'email.failed.subtitle': 'Le lien de vérification est invalide ou a expiré. Veuillez réessayer ou contacter le support.',
  'email.failed.registerButton': 'S\'inscrire à Nouveau',
  'email.failed.supportButton': 'Contacter le Support',

  // License Activation Page
  'license.title': 'Entrez Votre Clé de Licence',
  'license.subtitle': 'Veuillez entrer votre clé de licence pré-activée pour accéder à votre compte.',
  'license.note': 'Remarque : La clé de licence doit être déjà activée et non attribuée à un utilisateur.',
  'license.label': 'Clé de Licence',
  'license.placeholder': 'Entrez votre clé de licence',
  'license.button.submit': 'Soumettre la Clé de Licence',
  'license.button.verifying': 'Vérification...',
  'license.noKey': 'Vous n\'avez pas de clé de licence ?',
  'license.contactSupport': 'Contacter le Support',
  'license.loading': 'Vérification du statut de la licence...',
  'license.success': 'Clé de licence attribuée avec succès',
  'license.redirecting': 'Redirection vers le tableau de bord...',
  'license.error.empty': 'Veuillez entrer une clé de licence',
  'license.error.auth': 'Erreur d\'authentification. Veuillez vous reconnecter.',
  'license.error.failed': 'Échec de l\'attribution de la clé de licence',
  'license.error.general': 'Une erreur s\'est produite. Veuillez réessayer.',

  // Forgot Password Page
  'forgotPassword.title': 'Mot de Passe Oublié',
  'forgotPassword.subtitle': 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
  'forgotPassword.email.label': 'Votre Email',
  'forgotPassword.email.placeholder': 'Entrez votre email',
  'forgotPassword.button.send': 'Envoyer le Lien de Réinitialisation',
  'forgotPassword.button.sending': 'Envoi en cours...',
  'forgotPassword.rememberPassword': 'Vous vous souvenez de votre mot de passe ?',
  'forgotPassword.signin': 'Se connecter',
  'forgotPassword.success.checkEmail': 'Veuillez vérifier votre boîte de réception et votre dossier spam pour le lien de réinitialisation du mot de passe.',
  'forgotPassword.error.required': 'L\'email est requis',
  'forgotPassword.error.invalid': 'Veuillez entrer une adresse email valide',
  'forgotPassword.error.failed': 'Échec de l\'envoi de l\'email de réinitialisation du mot de passe',
  'forgotPassword.error.general': 'Une erreur s\'est produite. Veuillez réessayer.',
  'signup.fullName.label': 'Nom Complet',
  'signup.fullName.placeholder': 'Entrez votre nom complet',
  'signup.fullName.error.required': 'Le nom complet est requis',
  'signup.fullName.error.length': 'Le nom complet doit comporter au moins 2 caractères',
  'signup.email.label': 'Email Professionnel',
  'signup.email.placeholder': 'Entrez votre email',
  'signup.email.error.required': 'L\'email est requis',
  'signup.email.error.invalid': 'Veuillez entrer une adresse email valide',
  'signup.password.label': 'Mot de Passe',
  'signup.password.placeholder': 'Choisissez un mot de passe fort',
  'signup.password.error.required': 'Le mot de passe est requis',
  'signup.password.error.length': 'Le mot de passe doit comporter au moins 8 caractères',
  'signup.company.label': 'Nom de l\'Entreprise',
  'signup.company.placeholder': 'Entrez le nom de votre entreprise',
  'signup.address.label': 'Adresse',
  'signup.address.placeholder': 'Entrez votre adresse',
  'signup.address.error.length': 'L\'adresse doit comporter au moins 5 caractères',
  'signup.phone.label': 'Numéro de Téléphone',
  'signup.phone.placeholder': 'Entrez votre numéro de téléphone',
  'signup.phone.error.invalid': 'Veuillez entrer un numéro de téléphone valide',
  'signup.terms.agree': 'En créant un compte, vous acceptez nos',
  'signup.terms.termsConditions': 'Conditions Générales',
  'signup.terms.and': 'et',
  'signup.terms.privacyPolicy': 'Politique de Confidentialité',
  'signup.terms.error': 'Veuillez accepter les Conditions Générales',
  'signup.button.create': 'Créer un Compte',
  'signup.button.creating': 'Création du Compte...',
  'signup.haveAccount': 'Vous avez déjà un compte ?',
  'signup.signin': 'Se connecter',
  'signup.error.registration': 'Échec de l\'inscription',
  'signup.error.general': 'Une erreur s\'est produite. Veuillez réessayer.',

  // Profile Page
  'profile.title': 'Votre Profil',
  'profile.subtitle': 'Mettez à jour vos informations personnelles',
  'profile.email.label': 'Email (ne peut pas être modifié)',
  'profile.fullName.label': 'Nom Complet',
  'profile.fullName.placeholder': 'Entrez votre nom complet',
  'profile.fullName.error.required': 'Le nom complet est requis',
  'profile.fullName.error.length': 'Le nom complet doit comporter au moins 2 caractères',
  'profile.company.label': 'Nom de l\'Entreprise',
  'profile.company.placeholder': 'Entrez le nom de votre entreprise',
  'profile.address.label': 'Adresse',
  'profile.address.placeholder': 'Entrez votre adresse',
  'profile.address.error.length': 'L\'adresse doit comporter au moins 5 caractères',
  'profile.phone.label': 'Numéro de Téléphone',
  'profile.phone.placeholder': 'Entrez votre numéro de téléphone',
  'profile.phone.error.invalid': 'Veuillez entrer un numéro de téléphone valide',
  'profile.button.update': 'Mettre à jour',
  'profile.button.updating': 'Mise à jour...',
  'profile.button.back': 'Retour',
  'profile.button.signout': 'Se Déconnecter',
  'profile.loading': 'Chargement du profil...',
  'profile.success': 'Profil mis à jour avec succès',
  'profile.error.general': 'Une erreur s\'est produite. Veuillez réessayer.',
  'profile.error.loading': 'Une erreur s\'est produite lors du chargement de votre profil',
  'profile.error.session': 'Session expirée. Veuillez vous reconnecter.',
  'profile.error.auth': 'Erreur d\'authentification. Veuillez vous reconnecter.',
  'profile.error.update': 'Échec de la mise à jour du profil',
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
