import { useInView } from 'react-intersection-observer';

export function useSectionInView(sectionId: string, threshold = 0.3) {
  const { ref, inView } = useInView({ 
    threshold,
    onChange: (inView) => {
      if (inView) {
        // Update URL hash without scrolling
        window.history.replaceState(null, '', `#${sectionId}`);
      }
    }
  });

  return { ref, inView };
}