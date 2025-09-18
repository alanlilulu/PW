import React from 'react';
import { Container } from '../../ui/Container';
import { ContactForm } from './ContactForm';
import { SocialLinks } from './SocialLinks';
import { useLanguage } from '../../../contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-black py-20">
      <Container>
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-serif text-white mb-8">
              {t('footer.title')}
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
              {t('footer.description')}
            </p>
            <SocialLinks />
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Alan Li. {t('footer.rights')}
          </p>
        </div>
      </Container>
    </footer>
  );
}