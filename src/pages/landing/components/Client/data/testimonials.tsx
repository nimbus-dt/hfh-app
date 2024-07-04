import { TestimonialsProps } from '../types';

const testimonials: TestimonialsProps = [
  {
    id: 1,
    text: `Working with the Habitat App team has been a tremendous experience. With them, we have quickly worked on a revolutionizing  our use of technology in our operations.`,
    organization: {
      name: 'Alachua',
      logo: 'https://hfh-app-storage-bucket134315-formio.s3.amazonaws.com/public/test/landing/Alachua.png',
    },
    author: {
      name: 'Susan Meadows',
      title: 'Family Services Coordinator',
    },
  },
  {
    id: 2,
    text: `Habitat App has saved our affiliate countless hours by streamlining the Homeowner Selection committee's application review process. The platform centralizes applicant records, ensuring organization and consistency. It also offers automated metrics like Area Median Income (AMI) and Debt to Income (DTI) ratio, enabling quick decision-making. The Habitat App development team and customer service have been exceptional.`,
    organization: {
      name: 'Kenosha',
      logo: 'https://hfh-app-storage-bucket134315-formio.s3.amazonaws.com/public/test/landing/Kenosha_Hz_White.png',
    },
    author: {
      name: 'Angela Elliott',
      title: 'Executive Director',
    },
  },
];

export default testimonials;
