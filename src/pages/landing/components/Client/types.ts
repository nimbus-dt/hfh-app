export interface TestimonialProps {
  id: number;
  text: string;
  author: {
    name: string;
    title: string;
  };
  organization: {
    name: string;
    logo: string;
  };
}

export type TestimonialsProps = TestimonialProps[];
