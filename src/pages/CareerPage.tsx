import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { useLanguage } from '../contexts/LanguageContext';
import { SEO } from '../components/ui/SEO';
import { CareerCard } from '../components/sections/Career/CareerCard';
import { ArrowRight, Briefcase, Award, Users, Target } from 'lucide-react';

export function CareerPage() {
  const { t } = useLanguage();

  return (
    <>
      <SEO 
        title={t('career.pageTitle') || 'Career Journey'}
        description={t('career.pageDescription') || 'Explore my professional journey and achievements'}
      />
      
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-100" />
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-serif text-gray-900 mb-6">
                {t('career.pageTitle') || 'Career Journey'}
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {t('career.pageDescription') || 'A journey of growth, learning, and professional development across diverse fields and industries.'}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Career Overview */}
        <section className="py-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-16 items-center mb-20"
            >
              {/* Left side - Text */}
              <div>
                <h2 className="text-4xl font-serif mb-8 text-gray-900">
                  {t('career.overview.title') || 'Professional Overview'}
                </h2>
                <div className="space-y-6 text-gray-600 leading-relaxed">
                  <p className="text-lg">
                    {t('career.overview.description1') || 'My career has been defined by a passion for creativity, technology, and human connection. I believe in the power of interdisciplinary thinking and continuous learning.'}
                  </p>
                  <p className="text-lg">
                    {t('career.overview.description2') || 'From photography to technology, from theater to business, each experience has shaped my understanding of what it means to create meaningful impact.'}
                  </p>
                  <p className="text-lg">
                    {t('career.overview.description3') || 'I approach every role with curiosity, empathy, and a commitment to excellence, always seeking to bridge the gap between creative vision and practical implementation.'}
                  </p>
                </div>
              </div>

              {/* Right side - Visual */}
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <Briefcase className="w-16 h-16 mx-auto mb-4" />
                    <p className="text-lg opacity-80">
                      {t('career.overview.placeholder') || 'Professional Journey'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Career Roles */}
        <section className="py-20 bg-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                {t('career.roles.title') || 'Career Roles'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('career.roles.description') || 'Key positions and experiences that have shaped my professional journey'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <CareerCard
                  title={t('career.role1.title')}
                  description={t('career.role1.description')}
                  period={t('career.role1.period')}
                  skills={t('career.role1.skills').split(',')}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <CareerCard
                  title={t('career.role2.title')}
                  description={t('career.role2.description')}
                  period={t('career.role2.period')}
                  skills={t('career.role2.skills').split(',')}
                />
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Skills & Expertise */}
        <section className="py-20 bg-gray-50">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                {t('career.skills.title') || 'Skills & Expertise'}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('career.skills.description') || 'Core competencies developed through diverse professional experiences'}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Award, title: t('career.skills.category1.title') || 'Creative Arts', skills: ['Photography', 'Visual Design', 'Storytelling', 'Brand Development'] },
                { icon: Users, title: t('career.skills.category2.title') || 'Leadership', skills: ['Team Management', 'Project Coordination', 'Strategic Planning', 'Communication'] },
                { icon: Target, title: t('career.skills.category3.title') || 'Technology', skills: ['Web Development', 'Digital Marketing', 'Data Analysis', 'Innovation'] }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="text-center">
                    <category.icon className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                    <div className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl font-serif mb-8 text-gray-900">
                {t('career.philosophy.title') || 'Career Philosophy'}
              </h2>
              <blockquote className="text-2xl text-gray-600 italic leading-relaxed mb-8">
                "{t('career.philosophy.quote') || 'Success is not just about reaching the destination, but about the journey of growth, learning, and making a positive impact along the way.'}"
              </blockquote>
              <p className="text-lg text-gray-500">
                {t('career.philosophy.description') || 'I believe in continuous learning, authentic leadership, and the power of creative problem-solving to drive meaningful change.'}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-gray-100 to-gray-200">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-serif mb-6 text-gray-900">
                {t('career.cta.title') || 'Let\'s Connect'}
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                {t('career.cta.description') || 'Interested in collaborating or learning more about my professional journey?'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-8 py-4 rounded-full font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                onClick={() => window.location.href = '/'}
              >
                {t('career.cta.button') || 'Back to Home'}
              </motion.button>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  );
}
